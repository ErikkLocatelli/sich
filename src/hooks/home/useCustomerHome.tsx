import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { customerAppointmentsQuery, customerSummaryQuery } from "@/api/schedule/scheduleQueries"
import {
  dayMonthLabel,
  HOME_UPCOMING_DAYS,
  homeCategories,
  homeProviders,
  upcomingAppointments
} from "@/services/home/customerHome"
import { addDays, toIsoDate, toLocalDateTime } from "@/services/schedule/agendaDates"

import { useCategories } from "../product/useCategories"
import { useProviderSearch } from "../search/useProviderSearch"

const NO_CATEGORY_FILTER: number[] = []

/** Customer home: appointment counters, next appointments, service categories and featured providers. */
export const useCustomerHome = () => {
  const [now] = useState(() => new Date())
  const { data: summary } = useQuery(customerSummaryQuery())
  const { data: appointments, isPending: upcomingPending } = useQuery(customerAppointmentsQuery(toIsoDate(now), toIsoDate(addDays(now, HOME_UPCOMING_DAYS))))

  // Categories and the unfiltered provider search are shared with the search screen's cache
  const { categories, loaded: categoriesLoaded } = useCategories()
  const { providers, loaded: providersLoaded } = useProviderSearch("", NO_CATEGORY_FILTER)

  const upcoming = appointments ? upcomingAppointments(appointments, toLocalDateTime(now)) : []

  return {
    upcoming,
    // A failed request ends loading with an empty list
    upcomingLoaded: !upcomingPending,
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
