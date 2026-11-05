import type { AddressResponse, AppointmentResponse } from "../../api/schedule/appointments"

export const appointmentPath = (appointmentId: number) => `/schedule/appointment/${appointmentId}`

export type AppointmentState ="scheduled" | "done" | "canceled"

/** Done = scheduled appointment that already ended; `now` is a local "yyyy-MM-ddTHH:mm". */
export const appointmentState = (appointment: AppointmentResponse, now: string): AppointmentState => {
  if (appointment.status === "CANCELED") return "canceled"
  return appointment.endAt.slice(0, 16) <= now ? "done" : "scheduled"
}

/** The backend refuses to cancel after the start. */
export const canCancel = (appointment: AppointmentResponse, now: string) =>
  appointment.status === "SCHEDULED" && appointment.startAt.slice(0, 16) > now

export const formatAddress = (address: AddressResponse | null) => {
  if (!address?.street) return null

  const street = [address.street, address.numberAdress].filter(Boolean).join(", ")
  const complement = [address.complementAdress, address.neighborhood].filter(Boolean).join(" · ")
  const city = [address.city, address.state].filter(Boolean).join(" - ")

  return [street, complement, city].filter(Boolean).join(" · ")
}

/** wa.me needs the number with country code and digits only; BR numbers are saved without +55. */
export const whatsappUrl = (phone: string | null) => {
  if (!phone) return null

  const digits = phone.replace(/\D/g, "")
  if (digits.length < 10) return null

  return `https://wa.me/${digits.length <= 11 ? `55${digits}` : digits}`
}
