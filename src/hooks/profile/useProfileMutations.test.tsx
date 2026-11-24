import { describe, expect, it, vi } from "vitest"
import { http, HttpResponse } from "msw"
import { act, waitFor } from "@testing-library/react"

import { queryKeys } from "@/api/queryKeys"
import { toast } from "@/components/ui/toast"
import type { UserData } from "@/models/userData"
import { renderWithClient } from "@/test/render"
import { API, countRequests, server } from "@/test/server"

import { useChangePassword, useDeletePhoto, useUpdateAddress, useUpdateProfile } from "./useProfileMutations"

const me = (overrides: Partial<UserData> = {}): UserData => ({
  email: "ana@test.com",
  userType: "CUSTOMER",
  name: "Ana",
  phone: "11988887777",
  cnpjCpf: null,
  city: null,
  state: null,
  street: null,
  complementAdress: null,
  neighborhood: null,
  cep: null,
  numberAdress: null,
  photo: "data:image/png;base64,AAAA",
  createdAt: "2024-03-10T12:00:00Z",
  ...overrides,
})

describe("profile mutations", () => {
  it("replaces the cached profile with the one the API returns", async () => {
    let body: unknown
    server.use(http.patch(`${API}/users/me`, async ({ request }) => {
      body = await request.json()
      return HttpResponse.json(me({ name: "Ana Prado" }))
    }))
    const { result, client } = renderWithClient(() => useUpdateProfile())
    client.setQueryData(queryKeys.me, me())

    act(() => result.current.mutate({ name: "Ana Prado", phone: "11988887777", cnpjCpf: "" }))

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(body).toEqual({ name: "Ana Prado", phone: "11988887777", cnpjCpf: "" })
    expect(client.getQueryData<UserData>(queryKeys.me)?.name).toBe("Ana Prado")
    expect(countRequests("GET /auth/me")).toBe(0)
  })

  it("shows the backend's 422 message and keeps the cached profile", async () => {
    const add = vi.spyOn(toast, "add")
    server.use(http.patch(`${API}/users/me/address`, () =>
      HttpResponse.json({ message: "O CEP deve ter 8 dígitos" }, { status: 422 })))
    const { result, client } = renderWithClient(() => useUpdateAddress())
    client.setQueryData(queryKeys.me, me())

    act(() => result.current.mutate({ cep: "123" }))

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(add).toHaveBeenCalledWith({ type: "error", description: "O CEP deve ter 8 dígitos" })
    expect(client.getQueryData<UserData>(queryKeys.me)).toEqual(me())
    add.mockRestore()
  })

  it("clears the photo in the cache after the 204 of the removal", async () => {
    server.use(http.delete(`${API}/users/me/photo`, () => new HttpResponse(null, { status: 204 })))
    const { result, client } = renderWithClient(() => useDeletePhoto())
    client.setQueryData(queryKeys.me, me())

    act(() => result.current.mutate())

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(client.getQueryData<UserData>(queryKeys.me)?.photo).toBeNull()
  })

  it("reports a wrong current password without touching the session", async () => {
    const add = vi.spyOn(toast, "add")
    server.use(http.put(`${API}/users/me/password`, () =>
      HttpResponse.json({ message: "A senha atual está incorreta" }, { status: 422 })))
    const { result } = renderWithClient(() => useChangePassword())

    act(() => result.current.mutate({ currentPassword: "wrong", newPassword: "novaSenha456" }))

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(add).toHaveBeenCalledWith({ type: "error", description: "A senha atual está incorreta" })
    expect(window.localStorage.getItem("token")).toBe("test-token")
    add.mockRestore()
  })
})
