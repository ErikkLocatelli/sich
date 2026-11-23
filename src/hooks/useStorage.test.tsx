import { useContext, type ReactNode } from "react"
import { describe, expect, it } from "vitest"
import { http, HttpResponse } from "msw"
import { act, renderHook, waitFor } from "@testing-library/react"
import { QueryClientProvider } from "@tanstack/react-query"
import { MemoryRouter, useLocation, useNavigate } from "react-router-dom"

import { userContext } from "@/services/userContext"
import { createTestQueryClient } from "@/test/render"
import { API, countRequests, server } from "@/test/server"

import { UserStorage } from "./useStorage"

const user = { name: "Ana", userType: "CUSTOMER" }

const renderAuth = (initialPath = "/") => {
  const client = createTestQueryClient()
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[initialPath]}>
        <UserStorage>{children}</UserStorage>
      </MemoryRouter>
    </QueryClientProvider>
  )

  const hook = renderHook(() => ({ auth: useContext(userContext), navigate: useNavigate(), location: useLocation() }), { wrapper })
  return { client, ...hook }
}

describe("UserStorage", () => {
  it("loads the user once and doesn't refetch it on every navigation", async () => {
    server.use(http.get(`${API}/auth/me`, () => HttpResponse.json(user)))
    const { result } = renderAuth()

    await waitFor(() => expect(result.current.auth.login).toBe(true))
    act(() => result.current.navigate("/search"))
    act(() => result.current.navigate("/schedule"))

    expect(result.current.auth.data).toEqual(user)
    expect(countRequests("GET /auth/me")).toBe(1)
  })

  it("is ready right away and logged out when there's no token", () => {
    window.localStorage.removeItem("token")
    const { result } = renderAuth()

    expect(result.current.auth.authReady).toBe(true)
    expect(result.current.auth.login).toBe(false)
    expect(countRequests("GET /auth/me")).toBe(0)
  })

  it("logs out and drops the token when the session is rejected", async () => {
    server.use(http.get(`${API}/auth/me`, () => new HttpResponse(null, { status: 401 })))
    const { result } = renderAuth("/schedule")

    await waitFor(() => expect(result.current.location.pathname).toBe("/login"))
    expect(result.current.auth.login).toBe(false)
    expect(window.localStorage.getItem("token")).toBeNull()
  })

  it("logs in with a fresh cache", async () => {
    window.localStorage.removeItem("token")
    server.use(http.get(`${API}/auth/me`, () => HttpResponse.json(user)))
    const { result, client } = renderAuth("/login")
    client.setQueryData(["categories"], ["from a previous session"])

    act(() => result.current.auth.userLogin("new-token"))

    await waitFor(() => expect(result.current.auth.login).toBe(true))
    expect(window.localStorage.getItem("token")).toBe("new-token")
    expect(client.getQueryData(["categories"])).toBeUndefined()
  })

  it("clears every cached query on logout", async () => {
    server.use(http.get(`${API}/auth/me`, () => HttpResponse.json(user)))
    const { result, client } = renderAuth()
    await waitFor(() => expect(result.current.auth.login).toBe(true))
    client.setQueryData(["categories"], ["cached"])

    act(() => result.current.auth.userLogout())

    expect(client.getQueryData(["categories"])).toBeUndefined()
    expect(result.current.auth.login).toBe(false)
    expect(result.current.location.pathname).toBe("/login")
  })
})
