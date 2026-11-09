import { useEffect, useState } from "react"

import type { AppointmentResponse } from "@/api/schedule/appointments"
import {
  CUSTOMER_APPOINTMENTS_GET,
  CUSTOMER_APPOINTMENTS_SUMMARY_GET,
  type CustomerAppointmentSummaryResponse
} from "@/api/schedule/customerAppointments"
import { toast } from "@/components/ui/toast"
import {
  dayMonthLabel,
  HOME_UPCOMING_DAYS,
  homeCategories,
  homeProviders,
  upcomingAppointments
} from "@/services/home/customerHome"
import { addDays, toIsoDate, toLocalDateTime } from "@/services/schedule/agendaDates"

import useFetch from "../useFetch"
import { useCategories } from "../product/useCategories"
import { useProviderSearch } from "../search/useProviderSearch"

const NO_CATEGORY_FILTER: number[] = []

const showError = (message: string | undefined, fallback: string) => {
  toast.add({ type: "error", description: message ?? fallback })
}

/** Customer home: appointment counters, next appointments, service categories and featured providers. */
export const useCustomerHome = () => {
  const { request } = useFetch()
  const [now] = useState(() => new Date())
  const [summary, setSummary] = useState<CustomerAppointmentSummaryResponse | null>(null)
  const [appointments, setAppointments] = useState<AppointmentResponse[] | null>(null)

  const { categories, loaded: categoriesLoaded, error: categoriesError } = useCategories()
  const { providers, loaded: providersLoaded } = useProviderSearch("", NO_CATEGORY_FILTER)

  useEffect(() => {
    const token = window.localStorage.getItem("token")
    if (!token) return

    const loadSummary = async () => {
      const { url, options } = CUSTOMER_APPOINTMENTS_SUMMARY_GET(token)
      const { json, response } = await request(url, options)

      if (!response?.ok) {
        showError(json?.message, "Não foi possível carregar seus agendamentos.")
        return
      }

      setSummary(json as CustomerAppointmentSummaryResponse)
    }

    const loadAppointments = async () => {
      const { url, options } = CUSTOMER_APPOINTMENTS_GET(token, toIsoDate(now), toIsoDate(addDays(now, HOME_UPCOMING_DAYS)))
      const { json, response } = await request(url, options)

      if (!response?.ok) {
        showError(json?.message, "Não foi possível carregar seus próximos atendimentos.")
        setAppointments([])
        return
      }

      setAppointments(json as AppointmentResponse[])
    }

    loadSummary()
    loadAppointments()
  }, [request, now])

  useEffect(() => {
    if (!categoriesError) return
    showError(undefined, "Não foi possível carregar os serviços.")
  }, [categoriesError])

  const upcoming = appointments ? upcomingAppointments(appointments, toLocalDateTime(now)) : []

  return {
    upcoming,
    upcomingLoaded: appointments !== null,
    nextAppointmentLabel: upcoming[0] ? dayMonthLabel(upcoming[0].startAt) : "—",
    upcomingCount: summary?.upcomingCount ?? 0,
    completedCount: summary?.completedCount ?? 0,
    categories: homeCategories(categories),
    categoriesLoaded,
    providers: homeProviders(providers),
    providersLoaded,
  }
}

export type CustomerHomeState = ReturnType<typeof useCustomerHome>
