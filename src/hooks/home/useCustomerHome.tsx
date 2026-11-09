import { useEffect, useState } from "react"

import {
  CUSTOMER_APPOINTMENTS_SUMMARY_GET,
  type CustomerAppointmentSummaryResponse
} from "@/api/schedule/customerAppointments"
import { toast } from "@/components/ui/toast"
import { homeCategories, homeProviders } from "@/services/home/customerHome"

import useFetch from "../useFetch"
import { useCategories } from "../product/useCategories"
import { useProviderSearch } from "../search/useProviderSearch"

const NO_CATEGORY_FILTER: number[] = []

/** Customer home: appointment counters, service categories and featured providers. */
export const useCustomerHome = () => {
  const { request } = useFetch()
  const [summary, setSummary] = useState<CustomerAppointmentSummaryResponse | null>(null)

  const { categories, loaded: categoriesLoaded, error: categoriesError } = useCategories()
  const { providers, loaded: providersLoaded } = useProviderSearch("", NO_CATEGORY_FILTER)

  useEffect(() => {
    const token = window.localStorage.getItem("token")
    if (!token) return

    const loadSummary = async () => {
      const { url, options } = CUSTOMER_APPOINTMENTS_SUMMARY_GET(token)
      const { json, response } = await request(url, options)

      if (!response?.ok) {
        toast.add({ type: "error", description: json?.message ?? "Não foi possível carregar seus agendamentos." })
        return
      }

      setSummary(json as CustomerAppointmentSummaryResponse)
    }

    loadSummary()
  }, [request])

  useEffect(() => {
    if (!categoriesError) return
    toast.add({ type: "error", description: "Não foi possível carregar os serviços." })
  }, [categoriesError])

  return {
    upcomingCount: summary?.upcomingCount ?? 0,
    completedCount: summary?.completedCount ?? 0,
    categories: homeCategories(categories),
    categoriesLoaded,
    providers: homeProviders(providers),
    providersLoaded,
  }
}

export type CustomerHomeState = ReturnType<typeof useCustomerHome>
