import type { CashbackMovementResponse, CashbackStatus, CustomerBenefitsResponse, LoyaltyResponse } from "@/api/benefit/benefit"
import { formatCurrency } from "@/services/schedule/formatters"

const toCents = (value: number) => Math.round(value * 100)

// Absorbs float noise (e.g. 1500 × 0.2 = 299.99999…) before rounding down like the backend
const floorCents = (value: number) => Math.floor(value + 1e-6)

/**
 * Discount the backend applies when the booking asks for cashback:
 * min(balance, total × maxUsageRate rounded down to the cent). Never negative.
 */
export const cashbackDiscount = (total: number, balance: number, maxUsageRate: number) => {
  if (total <= 0 || balance <= 0 || maxUsageRate <= 0) return 0
  const maxUsableCents = floorCents(toCents(total) * maxUsageRate)
  return Math.min(toCents(balance), maxUsableCents) / 100
}

/** 0.05 -> "5%", 0.125 -> "12,5%" */
export const percentLabel = (rate: number) =>
  `${(Math.round(rate * 1000) / 10).toLocaleString("pt-BR")}%`

export const CASHBACK_STATUS_LABEL: Record<CashbackStatus, string> = {
  CREDITED: "Creditado",
  PENDING: "A receber",
  CANCELED: "Cancelado",
}

/** Signed amounts of a statement line; null when the appointment didn't earn/use cashback. */
export const movementAmounts = (movement: Pick<CashbackMovementResponse, "cashbackEarned" | "cashbackUsed">) => ({
  earned: movement.cashbackEarned > 0 ? `+ ${formatCurrency(movement.cashbackEarned)}` : null,
  used: movement.cashbackUsed > 0 ? `− ${formatCurrency(movement.cashbackUsed)}` : null,
})

/** "Faltam 2 atendimentos para ganhar R$ 10,00" */
export const loyaltyHint = ({ remaining, bonusPerCard }: Pick<LoyaltyResponse, "remaining" | "bonusPerCard">) => {
  const bonus = formatCurrency(bonusPerCard)
  if (remaining <= 0) return `Bônus de ${bonus} liberado`
  return remaining === 1
    ? `Falta 1 atendimento para ganhar ${bonus}`
    : `Faltam ${remaining} atendimentos para ganhar ${bonus}`
}

/** Line that only spent cashback (a redemption), as opposed to one that earned it. */
export const isRedemption = ({ cashbackEarned, cashbackUsed }: Pick<CashbackMovementResponse, "cashbackEarned" | "cashbackUsed">) =>
  cashbackEarned <= 0 && cashbackUsed > 0

/** "Cashback — Studio Ana" / "Resgate — Studio Ana" */
export const movementTitle = (movement: Pick<CashbackMovementResponse, "providerName" | "cashbackEarned" | "cashbackUsed">) => {
  if (movement.cashbackEarned > 0) return `Cashback — ${movement.providerName}`
  if (movement.cashbackUsed > 0) return `Resgate — ${movement.providerName}`
  return movement.providerName
}

/** "A cada 5 atendimentos, ganhe R$ 20,00" */
export const loyaltyRule = ({ goal, bonusPerCard }: Pick<LoyaltyResponse, "goal" | "bonusPerCard">) => {
  const bonus = formatCurrency(bonusPerCard)
  return goal === 1 ? `A cada atendimento, ganhe ${bonus}` : `A cada ${goal} atendimentos, ganhe ${bonus}`
}

/** "How it works" steps built from the program rates; empty when the program gives no cashback. */
export const cashbackSteps = ({ cashbackRate, maxCashbackUsageRate }: Pick<CustomerBenefitsResponse, "cashbackRate" | "maxCashbackUsageRate">) => {
  if (cashbackRate <= 0) return []
  const steps = ["Agende e conclua o atendimento", `Receba ${percentLabel(cashbackRate)} de cashback no saldo`]
  if (maxCashbackUsageRate > 0) steps.push(`Use até ${percentLabel(maxCashbackUsageRate)} do valor do próximo serviço`)
  return steps
}
