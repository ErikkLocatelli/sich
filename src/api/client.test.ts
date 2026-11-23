import { describe, expect, it } from "vitest"
import { http, HttpResponse } from "msw"

import { API, server } from "@/test/server"

import { ApiError, apiFetch, errorMessage, MISSING_TOKEN_MESSAGE, NETWORK_ERROR_MESSAGE, requireToken, withFallback } from "./client"

const get = (path: string) => apiFetch<unknown>({ url: API + path, options: { method: "GET" } })

const rejection = async (promise: Promise<unknown>) => {
  try {
    await promise
  } catch (error) {
    return error as ApiError
  }
  throw new Error("Expected the promise to reject")
}

describe("apiFetch", () => {
  it("returns the parsed body on success", async () => {
    server.use(http.get(`${API}/ok`, () => HttpResponse.json({ id: 1 })))
    await expect(get("/ok")).resolves.toEqual({ id: 1 })
  })

  it("returns null for 204 No Content", async () => {
    server.use(http.get(`${API}/empty`, () => new HttpResponse(null, { status: 204 })))
    await expect(get("/empty")).resolves.toBeNull()
  })

  it("returns null when a successful response isn't JSON", async () => {
    server.use(http.get(`${API}/text`, () => new HttpResponse("plain", { status: 200 })))
    await expect(get("/text")).resolves.toBeNull()
  })

  it("throws with the backend message on an HTTP error", async () => {
    server.use(http.get(`${API}/bad`, () => HttpResponse.json({ message: "Horário indisponível" }, { status: 409 })))

    const error = await rejection(get("/bad"))
    expect(error).toBeInstanceOf(ApiError)
    expect(error.status).toBe(409)
    expect(error.message).toBe("Horário indisponível")
    expect(error.serverMessage).toBe("Horário indisponível")
  })

  it("throws a status message when the error has no body", async () => {
    server.use(http.get(`${API}/down`, () => new HttpResponse(null, { status: 503 })))

    const error = await rejection(get("/down"))
    expect(error.status).toBe(503)
    expect(error.message).toBe("Erro: 503")
    expect(error.serverMessage).toBeNull()
  })

  it("throws a network error with status 0 when the request never reaches the server", async () => {
    server.use(http.get(`${API}/offline`, () => HttpResponse.error()))

    const error = await rejection(get("/offline"))
    expect(error.status).toBe(0)
    expect(error.message).toBe(NETWORK_ERROR_MESSAGE)
  })
})

describe("requireToken", () => {
  it("returns the stored token", () => {
    expect(requireToken()).toBe("test-token")
  })

  it("throws a 401 when there is no session", () => {
    window.localStorage.removeItem("token")
    expect(() => requireToken()).toThrow(MISSING_TOKEN_MESSAGE)
  })
})

describe("errorMessage", () => {
  it("prefers the backend message", () => {
    expect(errorMessage(new ApiError("x", 400, "Do servidor"), "Padrão")).toBe("Do servidor")
  })

  it("falls back when the backend sent no message or the error is unknown", () => {
    expect(errorMessage(new ApiError("Erro: 500", 500), "Padrão")).toBe("Padrão")
    expect(errorMessage(new TypeError("boom"), "Padrão")).toBe("Padrão")
  })
})

describe("withFallback", () => {
  it("keeps the result on success", async () => {
    await expect(withFallback(Promise.resolve(1), "Falhou")).resolves.toBe(1)
  })

  it("rewrites a failure with the step copy, keeping the status", async () => {
    const error = await rejection(withFallback(Promise.reject(new ApiError("Erro: 500", 500)), "Falhou a imagem"))
    expect(error.message).toBe("Falhou a imagem")
    expect(error.status).toBe(500)
  })
})
