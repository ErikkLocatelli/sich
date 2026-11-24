import { API_URL } from "../api"

export type DailyRevenueResponse = {
  date: string
  completedCount: number
  grossRevenue: number
  netRevenue: number
}

export type ProductRevenueResponse = {
  productName: string
  count: number
  revenue: number
}

export type FinancialSummaryResponse = {
  from: string
  to: string
  completedCount: number
  grossRevenue: number
  cashbackDiscount: number
  netRevenue: number
  averageTicket: number
  upcomingCount: number
  expectedRevenue: number
  canceledCount: number
  canceledRevenue: number
  daily: DailyRevenueResponse[]
  topProducts: ProductRevenueResponse[]
}

/** `from`/`to` are inclusive "yyyy-MM-dd" dates, at most 366 days apart. */
export const FINANCIAL_GET = (token: string, from: string, to: string) => ({
  url: API_URL + `/providers/me/financial?from=${from}&to=${to}`,
  options: { method: "GET", headers: { 'Authorization': `Bearer ${token}` } }
})
