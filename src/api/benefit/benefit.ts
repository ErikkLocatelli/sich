import { API_URL } from "../api"
import type { PageResponse } from "../schedule/appointments"

export type LoyaltyResponse = {
  goal: number
  /** Appointments in the current card: `progress/goal` is the "3/5" of the profile */
  progress: number
  remaining: number
  completedCards: number
  completedAppointments: number
  bonusPerCard: number
  bonusEarnedTotal: number
}

export type CustomerBenefitsResponse = {
  cashbackBalance: number
  cashbackPending: number
  cashbackEarnedTotal: number
  cashbackUsedTotal: number
  cashbackRate: number
  maxCashbackUsageRate: number
  loyalty: LoyaltyResponse
}

export const BENEFITS_GET = (token: string) => ({
  url: API_URL + "/customers/me/benefits",
  options: { method: "GET", headers: { 'Authorization': `Bearer ${token}` } }
})

/** CREDITED: already in the balance · PENDING: enters after the appointment · CANCELED: never enters, the discount went back */
export type CashbackStatus = "CREDITED" | "PENDING" | "CANCELED"

/** Statement line: an appointment that earned or used cashback (loyalty bonuses are not listed). */
export type CashbackMovementResponse = {
  appointmentId: number
  startAt: string
  providerId: number
  providerName: string
  totalPrice: number
  cashbackUsed: number
  cashbackEarned: number
  status: CashbackStatus
}

export type CashbackHistoryPage = PageResponse<CashbackMovementResponse>

/** Newest first; `page` starts at 0. */
export const BENEFITS_HISTORY_GET = (token: string, page: number, size: number) => ({
  url: API_URL + `/customers/me/benefits/history?page=${page}&size=${size}`,
  options: { method: "GET", headers: { 'Authorization': `Bearer ${token}` } }
})
