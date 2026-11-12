import type { AddressResponse, AppointmentResponse } from "@/api/schedule/appointments"
import { appointmentState } from "@/services/schedule/appointmentDetails"

/** How far ahead the "Próximos" tab looks. */
export const SCHEDULE_UPCOMING_DAYS = 60
/**
 * How far back the "Histórico" tab looks; there is no paginated customer history endpoint yet.
 * The backend rejects ranges of 92+ days (AppointmentService.MAX_LIST_DAYS), and the single request
 * spans history + upcoming, so 31 + 60 = 91 days.
 */
export const SCHEDULE_HISTORY_DAYS = 31

export const SCHEDULE_CUSTOMER_COPY = {
  title: "Minha agenda",
  subtitle: "Acompanhe seus atendimentos",
  upcomingEmptyTitle: "Nenhum atendimento agendado",
  upcomingEmptyAction: "Encontrar profissional ›",
  historyEmptyTitle: "Nenhum atendimento realizado",
  loadError: "Não foi possível carregar seus agendamentos.",
} as const

export type ScheduleCustomerTab = "upcoming" | "history"

export const SCHEDULE_CUSTOMER_TABS: readonly ScheduleCustomerTab[] = ["upcoming", "history"]

export const TAB_OPTIONS = [
  { children: "Próximos" },
  { children: "Histórico" },
] as const

/** Scheduled appointments that haven't ended yet, soonest first. `now` is a local "yyyy-MM-ddTHH:mm". */
export const customerUpcoming = (appointments: AppointmentResponse[], now: string) =>
  appointments
    .filter((appointment) => appointmentState(appointment, now) === "scheduled")
    .sort((a, b) => a.startAt.localeCompare(b.startAt))

/** Finished or canceled appointments, newest first. */
export const customerHistory = (appointments: AppointmentResponse[], now: string) =>
  appointments
    .filter((appointment) => appointmentState(appointment, now) !== "scheduled")
    .sort((a, b) => b.startAt.localeCompare(a.startAt))

/** Desktop "Histórico recente" card size. */
export const RECENT_HISTORY_LIMIT = 3

export const SCHEDULE_CUSTOMER_DESKTOP_COPY = {
  today: "Hoje",
  recentHistory: "Histórico recente",
  monthSummary: "Resumo do mês",
  scheduled: "Agendados",
  done: "Concluídos",
  dayEmptyTitle: "Nenhum atendimento neste dia",
} as const

export const onDay = (appointments: AppointmentResponse[], isoDate: string) =>
  appointments.filter((appointment) => appointment.startAt.startsWith(isoDate))

/** Non-canceled appointments starting on any of the given days. */
export const weekScheduledCount = (appointments: AppointmentResponse[], isoDates: string[]) =>
  appointments.filter((appointment) =>
    appointment.status === "SCHEDULED" && isoDates.includes(appointment.startAt.slice(0, 10))).length

export const weekCountLabel = (count: number) => {
  if (count === 0) return "Nenhum atendimento marcado nesta semana."
  if (count === 1) return "1 atendimento marcado nesta semana."
  return `${count} atendimentos marcados nesta semana.`
}

/** Scheduled (not ended yet) and done appointments in the month of `now` ("yyyy-MM-ddTHH:mm"). */
export const monthSummary = (appointments: AppointmentResponse[], now: string) => {
  const month = now.slice(0, 7)
  const states = appointments
    .filter((appointment) => appointment.startAt.startsWith(month))
    .map((appointment) => appointmentState(appointment, now))

  return {
    scheduled: states.filter((state) => state === "scheduled").length,
    done: states.filter((state) => state === "done").length,
  }
}

/** "Rua Augusta, 1200 — Jardins"; null when there is no street. */
export const shortAddress = (address: AddressResponse | null) => {
  if (!address?.street) return null

  const street = [address.street, address.numberAdress].filter(Boolean).join(", ")
  return address.neighborhood ? `${street} — ${address.neighborhood}` : street
}
