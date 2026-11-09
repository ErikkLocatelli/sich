import type { CategoryResponse } from "@/api/product/product"
import type { ProviderSummaryResponse } from "@/api/provider/provider"
import type { AppointmentResponse } from "@/api/schedule/appointments"
import { shortDateLabel } from "@/services/schedule/agendaDates"
import { filtersToSearch, EMPTY_FILTERS } from "@/services/search/searchFilters"

export const HOME_CATEGORY_LIMIT = 6
export const HOME_PROVIDER_LIMIT = 3
export const HOME_UPCOMING_LIMIT = 3
/** How far ahead the home looks for the customer's next appointments. */
export const HOME_UPCOMING_DAYS = 60

export const CUSTOMER_HOME_COPY = {
  subtitle: "Encontre profissionais de beleza perto de você",
  heroTitle: "Beleza onde você estiver",
  heroDescription: "Agende manicure, pedicure e nail art com profissionais parceiras SICH, no conforto da sua casa.",
  heroAction: "Agendar agora ›",
  upcomingEmptyTitle: "Nenhum atendimento agendado",
  upcomingEmptyAction: "Encontrar profissional ›",
} as const

/** Search page pre-filtered by one category. */
export const categoryHref = (categoryId: number) =>
  `/search${filtersToSearch({ ...EMPTY_FILTERS, categoryIds: [categoryId] })}`

export const providerHref = (providerId: number) => `/search/${providerId}`

// TODO(backend): no "trending" ranking yet; the first providers returned by the search stand in
export const homeProviders = (providers: ProviderSummaryResponse[]) => providers.slice(0, HOME_PROVIDER_LIMIT)

export const homeCategories = (categories: CategoryResponse[]) => categories.slice(0, HOME_CATEGORY_LIMIT)

/** Scheduled appointments that haven't ended yet, soonest first. `now` is a local "yyyy-MM-ddTHH:mm". */
export const upcomingAppointments = (appointments: AppointmentResponse[], now: string) =>
  appointments
    .filter((appointment) => appointment.status === "SCHEDULED" && appointment.endAt > now)
    .sort((a, b) => a.startAt.localeCompare(b.startAt))
    .slice(0, HOME_UPCOMING_LIMIT)

/** "2026-05-14T14:30:00" -> "14 Mai" */
export const dayMonthLabel = (dateTime: string) => shortDateLabel(dateTime.slice(0, 10)).split(", ")[1]

export const appointmentServices = (appointment: AppointmentResponse) =>
  appointment.items.map((item) => item.name).join(" + ")
