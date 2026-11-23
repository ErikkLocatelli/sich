import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { customerAppointmentsQuery, customerSummaryQuery } from "@/api/schedule/scheduleQueries"
import {
  dayMonthLabel,
  homeCategories,
  homeProviders,
  upcomingAppointments
} from "@/services/home/customerHome"
import { toLocalDateTime } from "@/services/schedule/agendaDates"
import { customerAgendaRange } from "@/services/schedule/customerSchedule"

import { useCategories } from "../product/useCategories"
import { useProviderSearch } from "../search/useProviderSearch"

const NO_CATEGORY_FILTER: number[] = []

/** Customer home: appointment counters, next appointments, service categories and featured providers. */
export const useCustomerHome = () => {
  const [now] = useState(() => new Date())
  const { data: summary } = useQuery(customerSummaryQuery())
  const [range] = useState(() => customerAgendaRange(now))
  // Same listing as the customer agenda, so opening it next is a cache hit
  const { data: appointments, isPending: upcomingPending } = useQuery(customerAppointmentsQuery(range.from, range.to))

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
