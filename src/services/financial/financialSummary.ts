import type { DailyRevenueResponse, FinancialSummaryResponse, ProductRevenueResponse } from "@/api/financial/financial"
import { periodFor, shortDateLabel, type Period } from "@/services/schedule/agendaDates"
import { formatCurrency, formatCurrencyShort } from "@/services/schedule/formatters"

/** Months the provider can pick, current month first. */
export const FINANCIAL_MONTH_COUNT = 3

const TOP_PRODUCTS_LIMIT = 5

export type FinancialMonth = {
  /** "Novembro", for the month picker */
  label: string
  /** "novembro", for sentences */
  name: string
  period: Period
}

export type MetricId = "gross" | "ticket" | "completed" | "canceled"

export type MetricHint = { text: string; tone: "up" | "down" | "neutral" }

export type FinancialMetric = {
  id: MetricId
  label: string
  value: string
  hint: MetricHint | null
}

export type FinancialHero = {
  netRevenue: string
  cashbackLine: string | null
  expectedLine: string | null
}

export type FinancialEntry = {
  key: string
  title: string
  detail: string
  amount: string
  positive: boolean
}

const monthNameFormat = new Intl.DateTimeFormat("pt-BR", { month: "long" })

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

/** `count` months going back from `now`'s month, current month first. */
export const financialMonths = (now: Date, count: number): FinancialMonth[] => {
  if (count < 1) return []

  return Array.from({ length: count }, (_, offset) => {
    const firstDay = new Date(now.getFullYear(), now.getMonth() - offset, 1)
    const name = monthNameFormat.format(firstDay)
    return { label: capitalize(name), name, period: periodFor("month", firstDay) }
  })
}

/** "1 atendimento", "3 atendimentos" */
export const appointmentsLabel = (count: number) => `${count} ${count === 1 ? "atendimento" : "atendimentos"}`

// Currency math drifts (0.1 + 0.2), compare in cents
const roundCents = (value: number) => Math.round(value * 100) / 100

/** Absolute change against the previous month; null without a previous month to compare. */
export const deltaHint = (
  current: number,
  previous: number | undefined,
  previousMonth: string,
  formatDelta: (absoluteDelta: number) => string,
): MetricHint | null => {
  if (previous === undefined) return null

  const delta = roundCents(current - previous)
  if (delta === 0) return { text: `Igual a ${previousMonth}`, tone: "neutral" }
  return { text: `${formatDelta(Math.abs(delta))} vs ${previousMonth}`, tone: delta > 0 ? "up" : "down" }
}

/** Percent change against the previous month; null when there is no baseline (missing or zero). */
export const percentHint = (current: number, previous: number | undefined, previousMonth: string): MetricHint | null => {
  if (previous === undefined || previous <= 0) return null

  const percent = Math.round(((current - previous) / previous) * 100)
  return deltaHint(percent, 0, previousMonth, (absolute) => `${absolute}%`)
}

export const financialMetrics = (
  current: FinancialSummaryResponse,
  previous: FinancialSummaryResponse | undefined,
  previousMonth: string,
): FinancialMetric[] => [
  {
    id: "gross",
    label: "Faturamento bruto",
    value: formatCurrencyShort(current.grossRevenue),
    hint: percentHint(current.grossRevenue, previous?.grossRevenue, previousMonth),
  },
  {
    id: "ticket",
    label: "Ticket médio",
    value: formatCurrencyShort(current.averageTicket),
    hint: deltaHint(current.averageTicket, previous?.averageTicket, previousMonth, formatCurrencyShort),
  },
  {
    id: "completed",
    label: "Atendimentos concluídos",
    value: String(current.completedCount),
    hint: deltaHint(current.completedCount, previous?.completedCount, previousMonth, String),
  },
  {
    id: "canceled",
    label: "Cancelamentos",
    value: String(current.canceledCount),
    hint: current.canceledRevenue > 0
      ? { text: `${formatCurrencyShort(current.canceledRevenue)} não faturados`, tone: "neutral" }
      : null,
  },
]

export const financialHero = (summary: FinancialSummaryResponse): FinancialHero => ({
  netRevenue: formatCurrency(summary.netRevenue),
  cashbackLine: summary.cashbackDiscount > 0
    ? `${formatCurrency(summary.grossRevenue)} brutos − ${formatCurrency(summary.cashbackDiscount)} de cashback`
    : null,
  expectedLine: summary.upcomingCount > 0
    ? `${formatCurrency(summary.expectedRevenue)} previstos em ${appointmentsLabel(summary.upcomingCount)} ${summary.upcomingCount === 1 ? "agendado" : "agendados"}`
    : null,
})

export type SummaryRow = { label: string; value: string }

export type FinancialMonthSummary = {
  /** How the net revenue is reached */
  revenue: SummaryRow[]
  /** What is still expected and what was lost */
  outlook: SummaryRow[]
}

const amountWithCount = (amount: number, count: number) =>
  count > 0 ? `${formatCurrency(amount)} · ${appointmentsLabel(count)}` : formatCurrency(0)

export const financialMonthSummary = (summary: FinancialSummaryResponse): FinancialMonthSummary => ({
  revenue: [
    { label: "Faturamento bruto", value: formatCurrency(summary.grossRevenue) },
    { label: "Descontos de cashback", value: summary.cashbackDiscount > 0 ? `− ${formatCurrency(summary.cashbackDiscount)}` : formatCurrency(0) },
    { label: "Faturamento líquido", value: formatCurrency(summary.netRevenue) },
  ],
  outlook: [
    { label: "Previsto em agendados", value: amountWithCount(summary.expectedRevenue, summary.upcomingCount) },
    { label: "Cancelados", value: amountWithCount(summary.canceledRevenue, summary.canceledCount) },
  ],
})

/** Days with completed appointments, most recent first. */
export const dailyEntries = (daily: DailyRevenueResponse[]): FinancialEntry[] =>
  daily
    .filter((day) => day.completedCount > 0)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((day) => ({
      key: day.date,
      title: shortDateLabel(day.date),
      detail: appointmentsLabel(day.completedCount),
      amount: `+ ${formatCurrency(day.netRevenue)}`,
      positive: true,
    }))

/** Highest revenue first, capped to the top few. */
export const topProductEntries = (products: ProductRevenueResponse[]): FinancialEntry[] =>
  [...products]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, TOP_PRODUCTS_LIMIT)
    .map((product) => ({
      key: product.productName,
      title: product.productName,
      detail: appointmentsLabel(product.count),
      amount: formatCurrency(product.revenue),
      positive: false,
    }))
