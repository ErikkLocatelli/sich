import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { financialQuery } from "@/api/financial/financialQueries"
import {
  dailyEntries,
  financialHero,
  financialMetrics,
  financialMonths,
  financialMonthSummary,
  FINANCIAL_MONTH_COUNT,
  topProductEntries,
} from "@/services/financial/financialSummary"

import usePreviousRoute from "../usePreviousRoute"

// Routes to the left of "Financeiro" in the provider nav
const ROUTES_BEFORE = ["/", "/schedule", "/products"]

/** State shared by the mobile (and future desktop) financial screens; derived values are null while loading. */
export const useFinancialPage = () => {
  const previousRoute = usePreviousRoute()
  const [now] = useState(() => new Date())
  const [monthIndex, setMonthIndex] = useState(0)

  // One extra month so the oldest option still has a baseline to compare against
  const months = useMemo(() => financialMonths(now, FINANCIAL_MONTH_COUNT + 1), [now])
  const selected = months[monthIndex]
  const baseline = months[monthIndex + 1]

  const { data: current } = useQuery(financialQuery(selected.period.from, selected.period.to))
  const { data: previous } = useQuery(financialQuery(baseline.period.from, baseline.period.to))

  return {
    animationClass: ROUTES_BEFORE.includes(previousRoute ?? "") ? "animateRight" : "animateLeft",
    monthLabels: months.slice(0, FINANCIAL_MONTH_COUNT).map((month) => month.label),
    monthIndex,
    setMonthIndex,
    monthName: selected.name,
    hero: current ? financialHero(current) : null,
    metrics: current ? financialMetrics(current, previous, baseline.name) : null,
    monthSummary: current ? financialMonthSummary(current) : null,
    statement: current ? dailyEntries(current.daily) : null,
    topProducts: current ? topProductEntries(current.topProducts) : null,
  }
}

export type FinancialPageState = ReturnType<typeof useFinancialPage>
