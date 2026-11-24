import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { benefitsQuery } from "@/api/benefit/benefitQueries"
import { financialQuery } from "@/api/financial/financialQueries"
import { agendaSummaryQuery, customerSummaryQuery } from "@/api/schedule/scheduleQueries"
import { periodFor } from "@/services/schedule/agendaDates"
import { customerProfileStats, providerProfileStats } from "@/services/profile/profileStats"

/** Completed appointments, cashback balance and loyalty card progress. */
export const useCustomerProfileStats = () => {
  const { data: summary } = useQuery(customerSummaryQuery())
  const { data: benefits } = useQuery(benefitsQuery())

  return customerProfileStats(summary, benefits)
}

/** This month's completed appointments and net revenue, and this week's occupancy. */
export const useProviderProfileStats = () => {
  const [now] = useState(() => new Date())
  const month = periodFor("month", now)
  const week = periodFor("week", now)

  const { data: financial } = useQuery(financialQuery(month.from, month.to))
  // Same key as the provider home and the agenda's week view
  const { data: weekSummary } = useQuery(agendaSummaryQuery(week.from, week.to))

  return providerProfileStats(financial, weekSummary)
}
