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

export type AddressResponse = {
  street: string | null
  numberAdress: string | null
  complementAdress: string | null
  neighborhood: string | null
  city: string | null
  state: string | null
  cep: string | null
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
  providerPhone: string
  providerAddress: AddressResponse
  customerId: number | null
  customerName: string
  customerPhone: string | null
  customerAddress: AddressResponse | null
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

export const APPOINTMENT_GET = (token: string, appointmentId: number) => {
  return {
    url: API_URL + `/providers/me/appointments/${appointmentId}`,
    options: {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  }
}

export const APPOINTMENT_CANCEL_PATCH = (token: string, appointmentId: number) => {
  return {
    url: API_URL + `/providers/me/appointments/${appointmentId}/cancel`,
    options: {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  }
}

export const APPOINTMENTS_HISTORY_GET =(token: string, page: number, size: number) => {
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
