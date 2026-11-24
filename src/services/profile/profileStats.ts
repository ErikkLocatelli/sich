import type { CustomerBenefitsResponse } from "@/api/benefit/benefit"
import type { FinancialSummaryResponse } from "@/api/financial/financial"
import type { AgendaSummaryResponse } from "@/api/schedule/appointments"
import type { CustomerAppointmentSummaryResponse } from "@/api/schedule/customerAppointments"
import { formatCurrencyShort } from "@/services/schedule/formatters"

/** `value` is null while loading. */
export type ProfileStat = { label: string; value: string | null }

export const customerProfileStats = (
  summary: CustomerAppointmentSummaryResponse | undefined,
  benefits: CustomerBenefitsResponse | undefined,
): ProfileStat[] => [
  { label: "Atendimentos", value: summary ? String(summary.completedCount) : null },
  { label: "Cashback", value: benefits ? formatCurrencyShort(benefits.cashbackBalance) : null },
  { label: "Fidelidade", value: benefits ? `${benefits.loyalty.progress}/${benefits.loyalty.goal}` : null },
]

/** Booked share of the working minutes; "—" without working hours in the period. */
export const occupancyLabel = (summary: AgendaSummaryResponse) => {
  if (summary.workingMinutes <= 0) return "—"
  const percent = Math.round((summary.bookedMinutes / summary.workingMinutes) * 100)
  return `${Math.min(percent, 100)}%`
}

export const providerProfileStats = (
  monthFinancial: FinancialSummaryResponse | undefined,
  weekSummary: AgendaSummaryResponse | undefined,
): ProfileStat[] => [
  { label: "Atendimentos no mês", value: monthFinancial ? String(monthFinancial.completedCount) : null },
  { label: "Faturamento no mês", value: monthFinancial ? formatCurrencyShort(monthFinancial.netRevenue) : null },
  { label: "Ocupação da semana", value: weekSummary ? occupancyLabel(weekSummary) : null },
]
