import { API_URL } from "../api"

export type AppointmentStatus = "SCHEDULED" | "CANCELED"

export type AppointmentOrigin = "PROVIDER" | "CUSTOMER"

export type AppointmentItemResponse = {
  productId: number | null
  name: string
  price: number
  duration: string
  durationMinutes: number
}

export type AppointmentResponse = {
  id: number
  startAt: string
  endAt: string
  duration: string
  durationMinutes: number
  totalPrice: number
  status: AppointmentStatus
  origin: AppointmentOrigin
  notes: string | null
  providerId: number
  providerName: string
  customerId: number | null
  customerName: string
  customerPhone: string | null
  items: AppointmentItemResponse[]
  canceledAt: string | null
  canceledBy: AppointmentOrigin | null
  createdAt: string
}

export type AgendaSummaryResponse = {
  from: string
  to: string
  scheduledCount: number
  canceledCount: number
  workingMinutes: number
  bookedMinutes: number
  freeMinutes: number
  expectedRevenue: number
}

export type PageResponse<T> = {
  content: T[]
  page: number
  size: number
  totalElements: number
  totalPages: number
}

export const APPOINTMENTS_HISTORY_GET = (token: string, page: number, size: number) => {
  return {
    url: API_URL + `/providers/me/appointments/history?page=${page}&size=${size}`,
    options: {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  }
}

export const APPOINTMENTS_GET =(token: string, from: string, to: string) => {
  return {
    url: API_URL + `/providers/me/appointments?from=${from}&to=${to}`,
    options: {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  }
}

export const APPOINTMENTS_SUMMARY_GET = (token: string, from: string, to: string) => {
  return {
    url: API_URL + `/providers/me/appointments/summary?from=${from}&to=${to}`,
    options: {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  }
}
