import { describe, expect, it } from "vitest"
import { http, HttpResponse } from "msw"
import { renderHook, waitFor } from "@testing-library/react"

import { periodFor, toIsoDate } from "@/services/schedule/agendaDates"
import { createTestQueryClient, createWrapper } from "@/test/render"
import { API, requestLog, server } from "@/test/server"

import { useProviderHome } from "../home/useProviderHome"
import { useAgenda } from "./useAgenda"

const summary = { from: "", to: "", scheduledCount: 1, canceledCount: 0, workingMinutes: 480, bookedMinutes: 60, freeMinutes: 420, expectedRevenue: 100 }

const mockAgendaApi = () => {
  server.use(
    http.get(`${API}/providers/me/working-hours`, () => HttpResponse.json([{ weekday: 1, start: "08:00", end: "18:00" }])),
    http.get(`${API}/providers/me/appointments`, () => HttpResponse.json([])),
    http.get(`${API}/providers/me/appointments/summary`, () => HttpResponse.json(summary)),
  )
}

describe("provider home → agenda", () => {
  it("opens the agenda's day and week views without new requests", async () => {
    mockAgendaApi()
    const client = createTestQueryClient()
    const wrapper = createWrapper(client)
    const today = toIsoDate(new Date())
    const week = periodFor("week", new Date())

    const home = renderHook(() => useProviderHome(), { wrapper })
    await waitFor(() => expect(home.result.current.emptyDay).not.toBeNull())
    await waitFor(() => expect(home.result.current.weekSummary).not.toBeNull())
    await waitFor(() => expect(home.result.current.remainingCount).toBeDefined())
    const homeRequests = [...requestLog]
    home.unmount()

    const agenda = renderHook(() => useAgenda(today, "day"), { wrapper })
    expect(agenda.result.current.loaded).toBe(true)
    expect(agenda.result.current.summary).toEqual(summary)

    agenda.rerender()
    const weekView = renderHook(() => useAgenda(today, "week"), { wrapper })
    expect(weekView.result.current.summary).toEqual(summary)

    expect(homeRequests).toEqual(expect.arrayContaining([
      `GET /providers/me/appointments/summary?from=${today}&to=${today}`,
      `GET /providers/me/appointments/summary?from=${week.from}&to=${week.to}`,
      `GET /providers/me/appointments?from=${week.from}&to=${week.to}`,
      "GET /providers/me/working-hours",
    ]))
    // Home asks for the week once; it no longer has a separate "today" listing
    expect(homeRequests).toHaveLength(4)
    expect(requestLog).toEqual(homeRequests)
  })

  it("serves a week already visited from cache", async () => {
    mockAgendaApi()
    const client = createTestQueryClient()

    const { result, rerender } = renderHook(({ date }) => useAgenda(date, "week"), {
      wrapper: createWrapper(client),
      initialProps: { date: "2026-11-23" },
    })
    await waitFor(() => expect(result.current.loaded).toBe(true))

    rerender({ date: "2026-11-30" })
    expect(result.current.loaded).toBe(false)
    await waitFor(() => expect(result.current.loaded).toBe(true))

    rerender({ date: "2026-11-24" })
    expect(result.current.loaded).toBe(true)

    const listings = requestLog.filter((entry) => entry.startsWith("GET /providers/me/appointments?"))
    expect(listings).toHaveLength(2)
  })

  it("finishes loading when the week fails, so the screen leaves the skeleton", async () => {
    server.use(
      http.get(`${API}/providers/me/working-hours`, () => HttpResponse.json([])),
      http.get(`${API}/providers/me/appointments`, () => new HttpResponse(null, { status: 500 })),
      http.get(`${API}/providers/me/appointments/summary`, () => new HttpResponse(null, { status: 500 })),
    )

    const { result } = renderHook(() => useAgenda("2026-11-23", "day"), { wrapper: createWrapper(createTestQueryClient()) })

    await waitFor(() => expect(result.current.loaded).toBe(true))
    expect(result.current.summary).toBeNull()
    expect(result.current.blocks).toEqual([])
  })
})
