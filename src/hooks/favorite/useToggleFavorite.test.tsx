import { describe, expect, it, vi } from "vitest"
import { http, HttpResponse } from "msw"
import { act, waitFor } from "@testing-library/react"

import type { ProviderSummaryResponse } from "@/api/provider/provider"
import { queryKeys } from "@/api/queryKeys"
import { toast } from "@/components/ui/toast"
import { product } from "@/test/fixtures"
import { renderWithClient } from "@/test/render"
import { API, server } from "@/test/server"

import { useToggleFavorite, withFavorite } from "./useToggleFavorite"

const provider = (overrides: Partial<ProviderSummaryResponse> = {}): ProviderSummaryResponse => ({
  id: 7,
  name: "Ana",
  city: null,
  state: null,
  neighborhood: null,
  minPrice: 50,
  categories: [],
  photo: null,
  favorite: false,
  ...overrides,
})

const SEARCH_KEY = queryKeys.providers.search("", [])
const DETAIL_KEY = queryKeys.providers.detail(7)

describe("withFavorite", () => {
  it("flips only the matching provider card in lists and in the detail", () => {
    const list = [provider(), provider({ id: 8 })]

    expect(withFavorite(list, { providerId: 7, favorite: true })).toEqual([provider({ favorite: true }), provider({ id: 8 })])
    expect(withFavorite(provider(), { providerId: 7, favorite: true })).toEqual(provider({ favorite: true }))
  })

  it("leaves products and unrelated data untouched, even with the same id", () => {
    const products = [product({ id: 7 })]

    expect(withFavorite(products, { providerId: 7, favorite: true })).toBe(products)
    expect(withFavorite(undefined, { providerId: 7, favorite: true })).toBeUndefined()
    expect(withFavorite(provider({ id: 8 }), { providerId: 7, favorite: true })).toEqual(provider({ id: 8 }))
  })
})

describe("useToggleFavorite", () => {
  it("marks the provider everywhere at once and shows the toast after the API confirms", async () => {
    const add = vi.spyOn(toast, "add")
    // The API answers only when the test says so, after checking the optimistic state
    let respond = () => {}
    const answered = new Promise<void>((resolve) => { respond = resolve })
    server.use(
      http.put(`${API}/customers/me/favorites/7`, async () => {
        await answered
        return HttpResponse.json(provider({ favorite: true }))
      }),
      http.get(`${API}/customers/me/favorites`, () => HttpResponse.json([provider({ favorite: true })])),
    )
    const { result, client } = renderWithClient(() => useToggleFavorite())
    client.setQueryData(SEARCH_KEY, [provider()])
    client.setQueryData(DETAIL_KEY, provider())

    act(() => result.current.mutate({ providerId: 7, favorite: true }))

    await waitFor(() => expect(client.getQueryData<ProviderSummaryResponse[]>(SEARCH_KEY)?.[0].favorite).toBe(true))
    expect(client.getQueryData<ProviderSummaryResponse>(DETAIL_KEY)?.favorite).toBe(true)
    expect(add).not.toHaveBeenCalled()

    respond()
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(add).toHaveBeenCalledWith({ type: "success", description: "Profissional adicionado aos favoritos" })
    add.mockRestore()
  })

  it("removes the provider from the favorites list and confirms with a toast", async () => {
    const add = vi.spyOn(toast, "add")
    server.use(
      http.delete(`${API}/customers/me/favorites/7`, () => new HttpResponse(null, { status: 204 })),
      http.get(`${API}/customers/me/favorites`, () => HttpResponse.json([])),
    )
    const { result, client } = renderWithClient(() => useToggleFavorite())
    client.setQueryData(queryKeys.customer.favorites, [provider({ favorite: true }), provider({ id: 8, favorite: true })])

    act(() => result.current.mutate({ providerId: 7, favorite: false }))

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(add).toHaveBeenCalledWith({ type: "success", description: "Profissional removido dos favoritos" })
    add.mockRestore()
  })

  it("restores every screen and shows only the error toast when the request fails", async () => {
    const add = vi.spyOn(toast, "add")
    server.use(
      http.delete(`${API}/customers/me/favorites/7`, () => HttpResponse.json({ message: "Prestador não encontrado" }, { status: 404 })),
      http.get(`${API}/customers/me/favorites`, () => HttpResponse.json([provider({ favorite: true })])),
    )
    const { result, client } = renderWithClient(() => useToggleFavorite())
    const favorites = [provider({ favorite: true })]
    client.setQueryData(SEARCH_KEY, [provider({ favorite: true })])
    client.setQueryData(queryKeys.customer.favorites, favorites)

    act(() => result.current.mutate({ providerId: 7, favorite: false }))

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(client.getQueryData<ProviderSummaryResponse[]>(SEARCH_KEY)?.[0].favorite).toBe(true)
    expect(client.getQueryData<ProviderSummaryResponse[]>(queryKeys.customer.favorites)).toHaveLength(1)
    expect(add).toHaveBeenCalledWith({ type: "error", description: "Prestador não encontrado" })
    expect(add).not.toHaveBeenCalledWith(expect.objectContaining({ type: "success" }))
    add.mockRestore()
  })
})
