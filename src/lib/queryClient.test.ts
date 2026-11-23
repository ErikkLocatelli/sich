import { describe, expect, it, vi } from "vitest"

import { ApiError } from "@/api/client"
import { toast } from "@/components/ui/toast"

import { createQueryClient, shouldRetry } from "./queryClient"

describe("shouldRetry", () => {
  it("retries network failures and server errors once", () => {
    expect(shouldRetry(0, new ApiError("offline", 0))).toBe(true)
    expect(shouldRetry(0, new ApiError("down", 503))).toBe(true)
    expect(shouldRetry(1, new ApiError("down", 503))).toBe(false)
  })

  it("never retries client errors or unknown errors", () => {
    expect(shouldRetry(0, new ApiError("not found", 404))).toBe(false)
    expect(shouldRetry(0, new ApiError("unauthorized", 401))).toBe(false)
    expect(shouldRetry(0, new TypeError("bug"))).toBe(false)
  })
})

describe("error toasts", () => {
  it("shows the query's copy, or the backend message, once per failed fetch", async () => {
    const add = vi.spyOn(toast, "add")
    const client = createQueryClient()

    await client.fetchQuery({
      queryKey: ["a"],
      queryFn: () => Promise.reject(new ApiError("Erro: 500", 500)),
      retry: false,
      meta: { errorMessage: "Falhou A" },
    }).catch(() => undefined)

    await client.fetchQuery({
      queryKey: ["b"],
      queryFn: () => Promise.reject(new ApiError("x", 400, "Do servidor")),
      retry: false,
      meta: { errorMessage: "Falhou B" },
    }).catch(() => undefined)

    expect(add).toHaveBeenCalledTimes(2)
    expect(add).toHaveBeenNthCalledWith(1, { type: "error", description: "Falhou A" })
    expect(add).toHaveBeenNthCalledWith(2, { type: "error", description: "Do servidor" })
    add.mockRestore()
  })

  it("stays silent when the query has no copy", async () => {
    const add = vi.spyOn(toast, "add")
    const client = createQueryClient()

    await client.fetchQuery({ queryKey: ["c"], queryFn: () => Promise.reject(new Error("x")), retry: false }).catch(() => undefined)

    expect(add).not.toHaveBeenCalled()
    add.mockRestore()
  })
})
