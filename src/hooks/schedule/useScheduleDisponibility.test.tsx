import type { SubmitEvent } from "react"
import { describe, expect, it } from "vitest"
import { http, HttpResponse } from "msw"
import { act, waitFor } from "@testing-library/react"

import { queryKeys } from "@/api/queryKeys"
import { createTestQueryClient, renderWithClient } from "@/test/render"
import { API, countRequests, server } from "@/test/server"

import { useScheduleDisponibility } from "./useScheduleDisponibility"

const saved = [{ weekday: 1, start: "08:00", end: "12:00" }]
const submitEvent = { preventDefault: () => {} } as SubmitEvent<HTMLFormElement>

describe("useScheduleDisponibility", () => {
  it("can't submit before the saved schedule arrives", async () => {
    server.use(http.get(`${API}/providers/me/working-hours`, () => HttpResponse.json(saved)))

    const { result } = renderWithClient(() => useScheduleDisponibility())

    expect(result.current.canSubmit).toBe(false)
    await waitFor(() => expect(result.current.canSubmit).toBe(true))
    expect(result.current.days.find((day) => day.weekday === 1)?.intervals).toEqual([{ start: "08:00", end: "12:00" }])
  })

  it("never submits when loading failed, so an empty week can't overwrite the saved one", async () => {
    server.use(
      http.get(`${API}/providers/me/working-hours`, () => new HttpResponse(null, { status: 500 })),
      http.put(`${API}/providers/me/working-hours`, () => HttpResponse.json(null)),
    )

    const { result } = renderWithClient(() => useScheduleDisponibility())
    await waitFor(() => expect(result.current.error).not.toBeNull())

    act(() => result.current.handleSubmit(submitEvent))

    expect(result.current.canSubmit).toBe(false)
    expect(countRequests("PUT /providers/me/working-hours")).toBe(0)
  })

  it("keeps local edits and writes the saved schedule to the cache without refetching", async () => {
    server.use(
      http.get(`${API}/providers/me/working-hours`, () => HttpResponse.json(saved)),
      http.put(`${API}/providers/me/working-hours`, () => new HttpResponse(null, { status: 204 })),
    )
    const client = createTestQueryClient()
    const summaryKey = queryKeys.provider.appointments.summary("2026-11-23", "2026-11-23")
    client.setQueryData(summaryKey, { workingMinutes: 240 })

    const { result } = renderWithClient(() => useScheduleDisponibility(), client)
    await waitFor(() => expect(result.current.canSubmit).toBe(true))

    act(() => result.current.dayProps(result.current.days[1]).onToggle(true))
    act(() => result.current.handleSubmit(submitEvent))

    await waitFor(() => expect(client.getQueryData(queryKeys.provider.workingHours)).toEqual([
      { weekday: 1, start: "08:00", end: "12:00" },
      { weekday: 2, start: "08:00", end: "12:00" },
      { weekday: 2, start: "13:00", end: "18:00" },
    ]))
    expect(result.current.days[1].enabled).toBe(true)
    expect(client.getQueryState(summaryKey)?.isInvalidated).toBe(true)
    expect(countRequests("GET /providers/me/working-hours")).toBe(1)
  })

  it("keeps the cache untouched when saving fails", async () => {
    server.use(
      http.get(`${API}/providers/me/working-hours`, () => HttpResponse.json(saved)),
      http.put(`${API}/providers/me/working-hours`, () => new HttpResponse(null, { status: 400 })),
    )
    const client = createTestQueryClient()

    const { result } = renderWithClient(() => useScheduleDisponibility(), client)
    await waitFor(() => expect(result.current.canSubmit).toBe(true))

    act(() => result.current.dayProps(result.current.days[1]).onToggle(true))
    act(() => result.current.handleSubmit(submitEvent))

    await waitFor(() => expect(countRequests("PUT /providers/me/working-hours")).toBe(1))
    await waitFor(() => expect(result.current.saving).toBe(false))
    expect(client.getQueryData(queryKeys.provider.workingHours)).toEqual(saved)
  })
})
