import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { benefitsQuery } from "@/api/benefit/benefitQueries"
import { financialQuery } from "@/api/financial/financialQueries"
import { agendaSummaryQuery, customerSummaryQuery } from "@/api/schedule/scheduleQueries"
import type { AnyUserData } from "@/models/userData"
import { periodFor } from "@/services/schedule/agendaDates"
import { customerProfileStats, providerProfileStats } from "@/services/profile/profileStats"

/**
 * Customer: completed appointments, cashback balance and loyalty card progress.
 * Provider: this month's completed appointments and net revenue, and this week's occupancy.
 * Only the queries of the given user type run.
 */
export const useProfileStats = (userType: AnyUserData["userType"]) => {
  const isCustomer = userType === "CUSTOMER"
  const [now] = useState(() => new Date())
  const month = periodFor("month", now)
  const week = periodFor("week", now)

  const { data: summary } = useQuery({ ...customerSummaryQuery(), enabled: isCustomer })
  const { data: benefits } = useQuery({ ...benefitsQuery(), enabled: isCustomer })
  const { data: financial } = useQuery({ ...financialQuery(month.from, month.to), enabled: !isCustomer })
  // Same key as the provider home and the agenda's week view
  const { data: weekSummary } = useQuery({ ...agendaSummaryQuery(week.from, week.to), enabled: !isCustomer })

  return isCustomer ? customerProfileStats(summary, benefits) : providerProfileStats(financial, weekSummary)
}
