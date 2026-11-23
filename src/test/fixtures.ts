import type { ProductResponse } from "@/api/product/product"
import type { AppointmentResponse, PageResponse } from "@/api/schedule/appointments"

const address = { street: null, numberAdress: null, complementAdress: null, neighborhood: null, city: null, state: null, cep: null }

export const appointment = (overrides: Partial<AppointmentResponse> = {}): AppointmentResponse => ({
  id: 1,
  startAt: "2026-11-23T10:00",
  endAt: "2026-11-23T11:00",
  duration: "01:00",
  durationMinutes: 60,
  totalPrice: 100,
  status: "SCHEDULED",
  origin: "CUSTOMER",
  notes: null,
  providerId: 1,
  providerName: "Provider",
  providerPhone: "11999999999",
  providerAddress: address,
  customerId: 2,
  customerName: "Customer",
  customerPhone: null,
  customerAddress: null,
  items: [],
  canceledAt: null,
  canceledBy: null,
  createdAt: "2026-11-01T10:00",
  ...overrides,
})

export const product = (overrides: Partial<ProductResponse> = {}): ProductResponse => ({
  id: 1,
  categoryId: 1,
  categoryName: "Cabelo",
  name: "Corte",
  description: null,
  price: 50,
  duration: "00:30",
  durationMinutes: 30,
  active: true,
  images: [],
  createdAt: "2026-11-01T10:00",
  updatedAt: "2026-11-01T10:00",
  ...overrides,
})

export const page = <T,>(content: T[], pageNumber: number, totalPages: number): PageResponse<T> => ({
  content,
  page: pageNumber,
  size: content.length,
  totalElements: content.length * totalPages,
  totalPages,
})
