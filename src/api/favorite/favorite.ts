import { API_URL } from "../api"

const authHeaders = (token: string) => ({ 'Authorization': `Bearer ${token}` })

export const FAVORITES_GET = (token: string) => ({
  url: API_URL + "/customers/me/favorites",
  options: { method: "GET", headers: authHeaders(token) }
})

/** Idempotent; returns the provider card with `favorite = true`. */
export const FAVORITE_PUT = (token: string, providerId: number) => ({
  url: API_URL + `/customers/me/favorites/${providerId}`,
  options: { method: "PUT", headers: authHeaders(token) }
})

/** Idempotent; 204 even when the provider wasn't a favorite. */
export const FAVORITE_DELETE = (token: string, providerId: number) => ({
  url: API_URL + `/customers/me/favorites/${providerId}`,
  options: { method: "DELETE", headers: authHeaders(token) }
})
