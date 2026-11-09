import { API_URL } from "../api"

export type ProviderSummaryResponse = {
  id: number
  name: string
  city: string | null
  state: string | null
  neighborhood: string | null
  minPrice: number | null
  categories: string[]
}

export type AvailabilityResponse = {
  date: string
  duration: string
  durationMinutes: number
  startTimes: string[]
}

const authHeaders = (token: string) => ({ 'Authorization': `Bearer ${token}` })

export const PROVIDERS_SEARCH_GET = (token: string, query: string, categoryIds: number[]) => {
  const params = new URLSearchParams()
  if (query.trim()) params.set("q", query.trim())
  if (categoryIds.length > 0) params.set("categoryIds", categoryIds.join(","))
  const search = params.toString()

  return {
    url: API_URL + `/providers${search ? `?${search}` : ""}`,
    options: {
      method: "GET",
      headers: authHeaders(token)
    }
  }
}

export const PROVIDER_GET = (token: string, providerId: number) => {
  return {
    url: API_URL + `/providers/${providerId}`,
    options: {
      method: "GET",
      headers: authHeaders(token)
    }
  }
}

export const PROVIDER_PRODUCTS_GET = (token: string, providerId: number) => {
  return {
    url: API_URL + `/providers/${providerId}/products`,
    options: {
      method: "GET",
      headers: authHeaders(token)
    }
  }
}

export const PROVIDER_AVAILABILITY_GET = (token: string, providerId: number, date: string, productIds: number[]) => {
  return {
    url: API_URL + `/providers/${providerId}/availability?date=${date}&productIds=${productIds.join(",")}`,
    options: {
      method: "GET",
      headers: authHeaders(token)
    }
  }
}
