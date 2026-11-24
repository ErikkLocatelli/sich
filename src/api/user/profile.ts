import { API_URL } from "../api"

/** `null`/absent keeps the current value; an empty `cnpjCpf` clears it. */
export type ProfileBody = {
  name?: string | null
  phone?: string | null
  cnpjCpf?: string | null
}

/** `null`/absent keeps the current value and an empty string clears it. */
export type AddressBody = {
  cep?: string | null
  city?: string | null
  state?: string | null
  street?: string | null
  numberAdress?: string | null
  complementAdress?: string | null
  neighborhood?: string | null
}

export type PasswordBody = {
  currentPassword: string
  newPassword: string
}

const jsonRequest = (token: string, path: string, method: string, body?: unknown) => ({
  url: API_URL + path,
  options: {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: body === undefined ? undefined : JSON.stringify(body)
  }
})

export const PROFILE_PATCH = (token: string, body: ProfileBody) => jsonRequest(token, "/users/me", "PATCH", body)

export const ADDRESS_PATCH = (token: string, body: AddressBody) => jsonRequest(token, "/users/me/address", "PATCH", body)

export const PASSWORD_PUT = (token: string, body: PasswordBody) => jsonRequest(token, "/users/me/password", "PUT", body)

/** `image` is a png/jpeg/webp data URL of at most 1 MB. */
export const PHOTO_PUT = (token: string, image: string) => jsonRequest(token, "/users/me/photo", "PUT", { image })

export const PHOTO_DELETE = (token: string) => jsonRequest(token, "/users/me/photo", "DELETE")
