import { infiniteQueryOptions, queryOptions, type InfiniteData, type QueryClient } from "@tanstack/react-query"

import { apiFetch, requireToken } from "../client"
import { queryKeys } from "../queryKeys"
import {
  APPOINTMENT_GET,
  APPOINTMENTS_GET,
  APPOINTMENTS_HISTORY_GET,
  APPOINTMENTS_SUMMARY_GET,
  type AgendaSummaryResponse,
  type AppointmentResponse,
  type PageResponse
} from "./appointments"
import {
  CUSTOMER_APPOINTMENTS_GET,
  CUSTOMER_APPOINTMENTS_SUMMARY_GET,
  type CustomerAppointmentSummaryResponse
} from "./customerAppointments"
import { WORKING_HOURS_GET, type WorkingInterval } from "./workingHours"

type AppointmentPage = PageResponse<AppointmentResponse>

export const workingHoursQuery = () =>
  queryOptions({
    queryKey: queryKeys.provider.workingHours,
    queryFn: () => apiFetch<WorkingInterval[]>(WORKING_HOURS_GET(requireToken())),
    // Only changes through this app, and the save writes the new value into the cache
    staleTime: Infinity,
    meta: { errorMessage: "Não foi possível carregar seu expediente." },
  })

export const appointmentsQuery = (from: string, to: string) =>
  queryOptions({
    queryKey: queryKeys.provider.appointments.list(from, to),
    queryFn: () => apiFetch<AppointmentResponse[]>(APPOINTMENTS_GET(requireToken(), from, to)),
    meta: { errorMessage: "Não foi possível carregar os agendamentos." },
  })

export const agendaSummaryQuery = (from: string, to: string) =>
  queryOptions({
    queryKey: queryKeys.provider.appointments.summary(from, to),
    queryFn: () => apiFetch<AgendaSummaryResponse>(APPOINTMENTS_SUMMARY_GET(requireToken(), from, to)),
    meta: { errorMessage: "Não foi possível carregar o resumo da agenda." },
  })

export const appointmentHistoryQuery = (size: number) =>
  queryOptions({
    queryKey: queryKeys.provider.appointments.history(size),
    queryFn: () => apiFetch<AppointmentPage>(APPOINTMENTS_HISTORY_GET(requireToken(), 0, size)),
    meta: { errorMessage: "Não foi possível carregar o histórico." },
  })

/** True once the page holds an appointment older than `since`; the API returns newest first. */
export const reachedCutoff = (page: AppointmentPage, since: string) =>
  page.content.some((appointment) => appointment.startAt.slice(0, 10) < since)

export const historyFeedQuery = (since: string, pageSize: number) =>
  infiniteQueryOptions({
    queryKey: queryKeys.provider.appointments.feed(since, pageSize),
    queryFn: ({ pageParam }) => apiFetch<AppointmentPage>(APPOINTMENTS_HISTORY_GET(requireToken(), pageParam, pageSize)),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const next = lastPage.page + 1
      return reachedCutoff(lastPage, since) || next >= lastPage.totalPages ? undefined : next
    },
    meta: { errorMessage: "Não foi possível carregar o histórico." },
  })

const isAppointmentList = (data: unknown): data is AppointmentResponse[] => Array.isArray(data)

const isAppointmentPage = (data: unknown): data is AppointmentPage =>
  typeof data === "object" && data !== null && Array.isArray((data as AppointmentPage).content)

const isInfinitePages = (data: unknown): data is InfiniteData<AppointmentPage> =>
  typeof data === "object" && data !== null && Array.isArray((data as InfiniteData<AppointmentPage>).pages)

/** Every appointment held by an agenda, history or feed query, whatever its shape. */
const appointmentsIn = (data: unknown): AppointmentResponse[] => {
  if (isAppointmentList(data)) return data
  if (isAppointmentPage(data)) return data.content
  if (isInfinitePages(data)) return data.pages.flatMap((page) => page.content)
  return []
}

const cachedAppointment = (queryClient: QueryClient, appointmentId: number) => {
  let newest: { appointment: AppointmentResponse; updatedAt: number } | undefined

  for (const query of queryClient.getQueryCache().findAll({ queryKey: queryKeys.provider.appointments.all })) {
    const appointment = appointmentsIn(query.state.data).find((item) => item.id === appointmentId)
    if (appointment && (!newest || query.state.dataUpdatedAt > newest.updatedAt)) {
      newest = { appointment, updatedAt: query.state.dataUpdatedAt }
    }
  }

  return newest
}

/** Seeded from any agenda/history list in cache, so opening an appointment from them costs no request. */
export const appointmentQuery = (queryClient: QueryClient, appointmentId: number) =>
  queryOptions({
    queryKey: queryKeys.provider.appointments.detail(appointmentId),
    queryFn: () => apiFetch<AppointmentResponse>(APPOINTMENT_GET(requireToken(), appointmentId)),
    enabled: Number.isInteger(appointmentId),
    initialData: () => cachedAppointment(queryClient, appointmentId)?.appointment,
    initialDataUpdatedAt: () => cachedAppointment(queryClient, appointmentId)?.updatedAt,
    meta: { errorMessage: "Não foi possível carregar o atendimento." },
  })

export const customerAppointmentsQuery = (from: string, to: string) =>
  queryOptions({
    queryKey: queryKeys.customer.appointments.list(from, to),
    queryFn: () => apiFetch<AppointmentResponse[]>(CUSTOMER_APPOINTMENTS_GET(requireToken(), from, to)),
    meta: { errorMessage: "Não foi possível carregar seus agendamentos." },
  })

export const customerSummaryQuery = () =>
  queryOptions({
    queryKey: queryKeys.customer.appointments.summary,
    queryFn: () => apiFetch<CustomerAppointmentSummaryResponse>(CUSTOMER_APPOINTMENTS_SUMMARY_GET(requireToken())),
    meta: { errorMessage: "Não foi possível carregar seus agendamentos." },
  })
