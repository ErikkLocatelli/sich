import { describe, expect, it, vi } from "vitest"
import { http, HttpResponse } from "msw"
import { renderHook, waitFor } from "@testing-library/react"

import { toast } from "@/components/ui/toast"
import { createTestQueryClient, createWrapper, renderWithClient } from "@/test/render"
import { API, countRequests, server } from "@/test/server"

import { useCategories } from "./useCategories"

const categories = [{ id: 1, name: "Cabelo", description: null, createdAt: "", updatedAt: "" }]

describe("useCategories", () => {
  it("fetches once for every screen that uses it, including after a remount", async () => {
    server.use(http.get(`${API}/categories`, () => HttpResponse.json(categories)))
    const client = createTestQueryClient()
    const wrapper = createWrapper(client)

    const home = renderHook(() => useCategories(), { wrapper })
    const search = renderHook(() => useCategories(), { wrapper })
    await waitFor(() => expect(home.result.current.loaded).toBe(true))
    expect(search.result.current.categories).toEqual(categories)

    home.unmount()
    search.unmount()
    const productForm = renderHook(() => useCategories(), { wrapper })

    expect(productForm.result.current.categories).toEqual(categories)
    expect(countRequests("GET /categories")).toBe(1)
  })

  it("finishes loading with an empty list and a toast when the request fails", async () => {
    const add = vi.spyOn(toast, "add")
    server.use(http.get(`${API}/categories`, () => new HttpResponse(null, { status: 500 })))

    const { result } = renderWithClient(() => useCategories())

    await waitFor(() => expect(result.current.loaded).toBe(true))
    expect(result.current.categories).toEqual([])
    expect(result.current.error).toBe("Erro: 500")
    expect(add).toHaveBeenCalledWith({ type: "error", description: "Não foi possível carregar os serviços." })
    add.mockRestore()
  })

  it("doesn't call the API without a session", async () => {
    window.localStorage.removeItem("token")

    const { result } = renderWithClient(() => useCategories())

    await waitFor(() => expect(result.current.loaded).toBe(true))
    expect(result.current.categories).toEqual([])
    expect(countRequests("GET /categories")).toBe(0)
  })
})
