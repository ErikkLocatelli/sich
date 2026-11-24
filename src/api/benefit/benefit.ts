import { API_URL } from "../api"

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
