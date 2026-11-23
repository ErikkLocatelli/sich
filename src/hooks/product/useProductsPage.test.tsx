import { describe, expect, it } from "vitest"
import { delay, http, HttpResponse } from "msw"
import { act, waitFor } from "@testing-library/react"

import { queryKeys } from "@/api/queryKeys"
import { product } from "@/test/fixtures"
import { createTestQueryClient, renderWithClient } from "@/test/render"
import { API, countRequests, server } from "@/test/server"

import { useEditProductPage } from "./useEditProductPage"
import { useProductsPage } from "./useProductsPage"

const catalog = [product({ id: 1, name: "Corte" }), product({ id: 2, name: "Escova", active: false })]

const renderCatalog = async () => {
  server.use(http.get(`${API}/providers/me/products`, () => HttpResponse.json(catalog)))
  const hook = renderWithClient(() => useProductsPage())
  await waitFor(() => expect(hook.result.current.products).toHaveLength(2))
  return hook
}

describe("useProductsPage", () => {
  it("removes a product at once and keeps it removed after the API confirms", async () => {
    server.use(http.delete(`${API}/providers/me/products/1`, async () => {
      await delay(20)
      return new HttpResponse(null, { status: 204 })
    }))
    const { result } = await renderCatalog()

    act(() => result.current.handleDeleteProduct(1))

    await waitFor(() => expect(result.current.products.map((item) => item.id)).toEqual([2]))
    await waitFor(() => expect(countRequests("DELETE /providers/me/products/1")).toBe(1))
    expect(result.current.products.map((item) => item.id)).toEqual([2])
  })

  it("restores the product when deleting fails", async () => {
    server.use(http.delete(`${API}/providers/me/products/1`, async () => {
      await delay(20)
      return new HttpResponse(null, { status: 409 })
    }))
    const { result } = await renderCatalog()

    act(() => result.current.handleDeleteProduct(1))
    await waitFor(() => expect(result.current.products).toHaveLength(1))

    await waitFor(() => expect(result.current.products.map((item) => item.id)).toEqual([1, 2]))
  })

  it("flips the status optimistically and rolls it back on failure", async () => {
    server.use(http.patch(`${API}/providers/me/products/1/status`, async () => {
      await delay(20)
      return new HttpResponse(null, { status: 500 })
    }))
    const { result } = await renderCatalog()

    act(() => result.current.handleStatus(1, true))
    await waitFor(() => expect(result.current.products[0].active).toBe(false))

    await waitFor(() => expect(result.current.products[0].active).toBe(true))
  })

  it("keeps the flipped status after success, without refetching the catalog", async () => {
    server.use(http.patch(`${API}/providers/me/products/2/status`, () => HttpResponse.json(null)))
    const { result } = await renderCatalog()

    act(() => result.current.handleStatus(2, false))

    await waitFor(() => expect(countRequests("PATCH /providers/me/products/2/status")).toBe(1))
    await waitFor(() => expect(result.current.products[1].active).toBe(true))
    expect(countRequests("GET /providers/me/products")).toBe(1)
  })
})

describe("useEditProductPage", () => {
  it("opens a product from the cached catalog without a request", async () => {
    const client = createTestQueryClient()
    client.setQueryData(queryKeys.provider.products.list, catalog)
    client.setQueryData(queryKeys.categories, [])

    const { result } = renderWithClient(() => useEditProductPage("2"), client)

    await waitFor(() => expect(result.current.fields.name.value).toBe("Escova"))
    expect(result.current.loading).toBe(false)
    expect(countRequests("GET /providers/me/products/2")).toBe(0)
  })

  it("fetches the product when the catalog isn't cached", async () => {
    server.use(
      http.get(`${API}/providers/me/products/1`, () => HttpResponse.json(catalog[0])),
      http.get(`${API}/categories`, () => HttpResponse.json([])),
    )

    const { result } = renderWithClient(() => useEditProductPage("1"))

    expect(result.current.loading).toBe(true)
    await waitFor(() => expect(result.current.fields.name.value).toBe("Corte"))
    expect(result.current.loading).toBe(false)
  })

  it("doesn't call the API for a non-numeric id", () => {
    server.use(http.get(`${API}/categories`, () => HttpResponse.json([])))

    const { result } = renderWithClient(() => useEditProductPage("abc"))

    expect(result.current.loading).toBe(false)
    expect(countRequests("GET /providers/me/products/NaN")).toBe(0)
  })
})
