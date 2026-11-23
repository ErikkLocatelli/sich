import { describe, expect, it } from "vitest"
import { http, HttpResponse } from "msw"
import { act, waitFor } from "@testing-library/react"

import { appointment, page } from "@/test/fixtures"
import { renderWithClient } from "@/test/render"
import { API, requestLog, server } from "@/test/server"

import { useHistoryFeed } from "./useHistoryFeed"

const SINCE = "2026-09-01"
const at = (id: number, day: string) => appointment({ id, startAt: `${day}T10:00` })

const mockPages = (pages: Record<number, ReturnType<typeof page> | "error">) => {
  server.use(http.get(`${API}/providers/me/appointments/history`, ({ request }) => {
    const pageNumber = Number(new URL(request.url).searchParams.get("page"))
    const response = pages[pageNumber]
    return response === "error" ? new HttpResponse(null, { status: 500 }) : HttpResponse.json(response)
  }))
}

describe("useHistoryFeed", () => {
  it("loads the next page on demand and stops at the last one", async () => {
    mockPages({
      0: page([at(1, "2026-11-20"), at(2, "2026-11-10")], 0, 2),
      1: page([at(3, "2026-10-05")], 1, 2),
    })

    const { result } = renderWithClient(() => useHistoryFeed(SINCE, 2))
    await waitFor(() => expect(result.current.loaded).toBe(true))
    expect(result.current.hasMore).toBe(true)

    act(() => result.current.loadMore())
    await waitFor(() => expect(result.current.appointments).toHaveLength(3))
    expect(result.current.hasMore).toBe(false)
  })

  it("drops appointments older than the cutoff and stops there", async () => {
    mockPages({
      0: page([at(1, "2026-09-02"), at(2, "2026-08-30")], 0, 5),
    })

    const { result } = renderWithClient(() => useHistoryFeed(SINCE, 2))

    await waitFor(() => expect(result.current.loaded).toBe(true))
    expect(result.current.appointments.map((item) => item.id)).toEqual([1])
    expect(result.current.hasMore).toBe(false)
  })

  it("ignores loadMore while a page is in flight or when there's nothing left", async () => {
    mockPages({
      0: page([at(1, "2026-11-20")], 0, 2),
      1: page([at(2, "2026-11-10")], 1, 2),
    })

    const { result } = renderWithClient(() => useHistoryFeed(SINCE, 1))
    await waitFor(() => expect(result.current.loaded).toBe(true))

    act(() => {
      result.current.loadMore()
      result.current.loadMore()
    })
    await waitFor(() => expect(result.current.hasMore).toBe(false))
    act(() => result.current.loadMore())

    expect(requestLog.filter((entry) => entry.includes("page=1"))).toHaveLength(1)
  })

  it("stops the feed when a page fails, keeping what was loaded", async () => {
    mockPages({
      0: page([at(1, "2026-11-20")], 0, 3),
      1: "error",
    })

    const { result } = renderWithClient(() => useHistoryFeed(SINCE, 1))
    await waitFor(() => expect(result.current.loaded).toBe(true))

    act(() => result.current.loadMore())

    await waitFor(() => expect(result.current.hasMore).toBe(false))
    expect(result.current.appointments.map((item) => item.id)).toEqual([1])
  })

  it("leaves the loading state with an empty list when the first page fails", async () => {
    mockPages({ 0: "error" })

    const { result } = renderWithClient(() => useHistoryFeed(SINCE, 1))

    await waitFor(() => expect(result.current.loaded).toBe(true))
    expect(result.current.appointments).toEqual([])
    expect(result.current.hasMore).toBe(false)
  })
})
