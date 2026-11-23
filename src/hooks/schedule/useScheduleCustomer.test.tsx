import { describe, expect, it } from "vitest"
import { http, HttpResponse } from "msw"
import { renderHook, waitFor } from "@testing-library/react"

import { addDays, toIsoDate, toLocalDateTime } from "@/services/schedule/agendaDates"
import { appointment } from "@/test/fixtures"
import { createTestQueryClient, createWrapper, renderWithClient } from "@/test/render"
import { API, countRequests, server } from "@/test/server"

import { useCustomerHome } from "../home/useCustomerHome"
import { useScheduleCustomer } from "./useScheduleCustomer"

const at = (date: Date) => toLocalDateTime(date).slice(0, 16)

const mockHomeApi = (appointments: ReturnType<typeof appointment>[]) => {
  server.use(
    http.get(`${API}/customers/me/appointments`, () => HttpResponse.json(appointments)),
    http.get(`${API}/customers/me/appointments/summary`, () => HttpResponse.json({ completedCount: 1, upcomingCount: 1, canceledCount: 0 })),
    http.get(`${API}/categories`, () => HttpResponse.json([])),
    http.get(`${API}/providers`, () => HttpResponse.json([])),
  )
}

describe("customer home → agenda", () => {
  it("opens the agenda from the listing the home already loaded", async () => {
    const now = new Date()
    const upcoming = appointment({ id: 1, startAt: at(addDays(now, 2)), endAt: at(addDays(now, 2)) })
    const past = appointment({ id: 2, startAt: at(addDays(now, -5)), endAt: at(addDays(now, -5)) })
    mockHomeApi([upcoming, past])
    const client = createTestQueryClient()
    const wrapper = createWrapper(client)

    const home = renderHook(() => useCustomerHome(), { wrapper })
    await waitFor(() => expect(home.result.current.upcomingLoaded).toBe(true))
    expect(home.result.current.upcoming.map((item) => item.id)).toEqual([1])
    home.unmount()

    const agenda = renderHook(() => useScheduleCustomer(), { wrapper })

    expect(agenda.result.current.loaded).toBe(true)
    expect(agenda.result.current.appointments.map((item) => item.id)).toEqual([1])
    expect(agenda.result.current.recentHistory.map((item) => item.id)).toEqual([2])
    expect(countRequests(`GET /customers/me/appointments?from=${toIsoDate(addDays(now, -31))}&to=${toIsoDate(addDays(now, 60))}`)).toBe(1)
  })

  it("leaves the loading state with no appointments when the listing fails", async () => {
    server.use(http.get(`${API}/customers/me/appointments`, () => new HttpResponse(null, { status: 500 })))

    const { result } = renderWithClient(() => useScheduleCustomer())

    await waitFor(() => expect(result.current.loaded).toBe(true))
    expect(result.current.appointments).toEqual([])
    expect(result.current.recentHistory).toEqual([])
  })

  it("doesn't call the API without a session", async () => {
    window.localStorage.removeItem("token")

    const { result } = renderWithClient(() => useScheduleCustomer())

    await waitFor(() => expect(result.current.loaded).toBe(true))
    expect(countRequests(`GET /customers/me/appointments`)).toBe(0)
  })
})
