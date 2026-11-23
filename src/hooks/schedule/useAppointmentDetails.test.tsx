import { describe, expect, it } from "vitest"
import { http, HttpResponse } from "msw"
import { act, waitFor } from "@testing-library/react"

import { queryKeys } from "@/api/queryKeys"
import { appointment, page } from "@/test/fixtures"
import { createTestQueryClient, renderWithClient } from "@/test/render"
import { API, countRequests, requestLog, server } from "@/test/server"

import { useAppointmentDetails } from "./useAppointmentDetails"

describe("useAppointmentDetails", () => {
  it("opens an appointment already listed in the agenda without a request", () => {
    const client = createTestQueryClient()
    client.setQueryData(queryKeys.provider.appointments.list("2026-11-22", "2026-11-28"), [appointment({ id: 7 })])

    const { result } = renderWithClient(() => useAppointmentDetails(7), client)

    expect(result.current.appointment?.id).toBe(7)
    expect(result.current.loading).toBe(false)
    expect(requestLog).toEqual([])
  })

  it("also finds it in the history and in the paginated feed", () => {
    const client = createTestQueryClient()
    client.setQueryData(queryKeys.provider.appointments.history(5), page([appointment({ id: 8 })], 0, 1))
    client.setQueryData(queryKeys.provider.appointments.feed("2026-08-23", 20), {
      pages: [page([appointment({ id: 9 })], 0, 1)],
      pageParams: [0],
    })

    const fromHistory = renderWithClient(() => useAppointmentDetails(8), client)
    const fromFeed = renderWithClient(() => useAppointmentDetails(9), client)

    expect(fromHistory.result.current.appointment?.id).toBe(8)
    expect(fromFeed.result.current.appointment?.id).toBe(9)
    expect(requestLog).toEqual([])
  })

  it("fetches when the appointment isn't in any cached list", async () => {
    server.use(http.get(`${API}/providers/me/appointments/3`, () => HttpResponse.json(appointment({ id: 3 }))))

    const { result } = renderWithClient(() => useAppointmentDetails(3))

    expect(result.current.loading).toBe(true)
    await waitFor(() => expect(result.current.appointment?.id).toBe(3))
    expect(result.current.notFound).toBe(false)
  })

  it("reports not found on an API error", async () => {
    server.use(http.get(`${API}/providers/me/appointments/4`, () => new HttpResponse(null, { status: 404 })))

    const { result } = renderWithClient(() => useAppointmentDetails(4))

    await waitFor(() => expect(result.current.notFound).toBe(true))
    expect(result.current.appointment).toBeNull()
  })

  it("reports not found for an invalid id without calling the API", () => {
    const { result } = renderWithClient(() => useAppointmentDetails(Number("abc")))

    expect(result.current.notFound).toBe(true)
    expect(result.current.loading).toBe(false)
    expect(requestLog).toEqual([])
  })

  it("on cancel, stores the response and refreshes lists but not the detail", async () => {
    const client = createTestQueryClient()
    const listKey = queryKeys.provider.appointments.list("2026-11-22", "2026-11-28")
    client.setQueryData(listKey, [appointment({ id: 5 })])
    server.use(
      http.patch(`${API}/providers/me/appointments/5/cancel`, () => HttpResponse.json(appointment({ id: 5, status: "CANCELED" }))),
      http.get(`${API}/providers/me/appointments/5`, () => HttpResponse.json(appointment({ id: 5 }))),
    )

    const { result } = renderWithClient(() => useAppointmentDetails(5), client)
    act(() => result.current.cancel())

    await waitFor(() => expect(result.current.appointment?.status).toBe("CANCELED"))
    expect(client.getQueryState(listKey)?.isInvalidated).toBe(true)
    expect(countRequests("GET /providers/me/appointments/5")).toBe(0)
  })

  it("keeps the appointment unchanged when canceling fails", async () => {
    const client = createTestQueryClient()
    client.setQueryData(queryKeys.provider.appointments.list("2026-11-22", "2026-11-28"), [appointment({ id: 6 })])
    server.use(http.patch(`${API}/providers/me/appointments/6/cancel`, () => new HttpResponse(null, { status: 409 })))

    const { result } = renderWithClient(() => useAppointmentDetails(6), client)
    act(() => result.current.cancel())

    await waitFor(() => expect(result.current.canceling).toBe(false))
    expect(result.current.appointment?.status).toBe("SCHEDULED")
  })
})
