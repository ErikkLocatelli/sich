import { describe, expect, it } from "vitest"
import { http, HttpResponse } from "msw"
import { renderHook, waitFor } from "@testing-library/react"

import { createTestQueryClient, createWrapper } from "@/test/render"
import { API, countRequests, requestLog, server } from "@/test/server"

import { useProviderSearch } from "./useProviderSearch"

const provider = (id: number, name: string) => ({
  id, name, city: null, state: null, neighborhood: null, minPrice: null, categories: [],
})

const NO_IDS: number[] = []

describe("useProviderSearch", () => {
  it("shares the unfiltered search between screens", async () => {
    server.use(http.get(`${API}/providers`, () => HttpResponse.json([provider(1, "Ana")])))
    const client = createTestQueryClient()
    const wrapper = createWrapper(client)

    const home = renderHook(() => useProviderSearch("", NO_IDS), { wrapper })
    await waitFor(() => expect(home.result.current.loaded).toBe(true))

    // A new, equal array and surrounding spaces must not count as a different search
    const search = renderHook(() => useProviderSearch("  ", []), { wrapper })

    expect(search.result.current.loaded).toBe(true)
    expect(search.result.current.providers).toHaveLength(1)
    expect(countRequests("GET /providers")).toBe(1)
  })

  it("debounces typing into a single request and keeps old results meanwhile", async () => {
    server.use(http.get(`${API}/providers`, ({ request }) => {
      const term = new URL(request.url).searchParams.get("q") ?? ""
      return HttpResponse.json(term ? [provider(2, term)] : [provider(1, "Ana")])
    }))

    const { result, rerender } = renderHook(({ query }) => useProviderSearch(query, NO_IDS), {
      wrapper: createWrapper(createTestQueryClient()),
      initialProps: { query: "" },
    })
    await waitFor(() => expect(result.current.loaded).toBe(true))

    rerender({ query: "b" })
    rerender({ query: "bi" })
    rerender({ query: "bia" })

    expect(result.current.loaded).toBe(false)
    expect(result.current.providers[0].name).toBe("Ana")

    await waitFor(() => expect(result.current.loaded).toBe(true))
    expect(result.current.providers[0].name).toBe("bia")
    expect(requestLog).toEqual(["GET /providers", "GET /providers?q=bia"])
  })

  it("accepts any character in the search term", async () => {
    server.use(http.get(`${API}/providers`, ({ request }) =>
      HttpResponse.json([provider(3, new URL(request.url).searchParams.get("q") ?? "")])
    ))

    const { result } = renderHook(() => useProviderSearch("a|b", [1, 2]), { wrapper: createWrapper(createTestQueryClient()) })

    await waitFor(() => expect(result.current.loaded).toBe(true))
    expect(result.current.providers[0].name).toBe("a|b")
  })

  it("ends loading with no providers when the search fails", async () => {
    server.use(http.get(`${API}/providers`, () => new HttpResponse(null, { status: 500 })))
    const { result } = renderHook(() => useProviderSearch("", NO_IDS), { wrapper: createWrapper(createTestQueryClient()) })

    await waitFor(() => expect(result.current.loaded).toBe(true))
    expect(result.current.providers).toEqual([])
  })
})
