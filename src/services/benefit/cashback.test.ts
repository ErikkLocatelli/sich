import { describe, expect, it } from "vitest"

import { formatCurrency } from "@/services/schedule/formatters"

import {
  cashbackDiscount,
  cashbackSteps,
  isRedemption,
  loyaltyHint,
  loyaltyRule,
  movementAmounts,
  movementTitle,
  percentLabel,
} from "./cashback"

describe("cashbackDiscount", () => {
  it("is capped by the usage rate of the total", () => {
    expect(cashbackDiscount(90, 100, 0.2)).toBe(18)
  })

  it("is capped by the balance", () => {
    expect(cashbackDiscount(90, 10, 0.2)).toBe(10)
  })

  it("rounds the cap down to the cent like the backend", () => {
    expect(cashbackDiscount(33.33, 100, 0.2)).toBe(6.66)
    expect(cashbackDiscount(45.99, 100, 0.2)).toBe(9.19)
  })

  it("is not thrown off by float noise", () => {
    // 1500 × 0.2 is 299.99999… in floating point
    expect(cashbackDiscount(15, 100, 0.2)).toBe(3)
    expect(cashbackDiscount(0.3, 100, 0.1)).toBe(0.03)
  })

  it("is zero without balance, price or usage rate", () => {
    expect(cashbackDiscount(90, 0, 0.2)).toBe(0)
    expect(cashbackDiscount(0, 50, 0.2)).toBe(0)
    expect(cashbackDiscount(90, 50, 0)).toBe(0)
    expect(cashbackDiscount(90, -5, 0.2)).toBe(0)
  })
})

describe("percentLabel", () => {
  it("formats rates as pt-BR percentages", () => {
    expect(percentLabel(0.05)).toBe("5%")
    expect(percentLabel(0.2)).toBe("20%")
    expect(percentLabel(0.125)).toBe("12,5%")
    expect(percentLabel(0)).toBe("0%")
  })
})

describe("movementAmounts", () => {
  it("signs earned and used amounts", () => {
    expect(movementAmounts({ cashbackEarned: 4.5, cashbackUsed: 10 })).toEqual({
      earned: `+ ${formatCurrency(4.5)}`,
      used: `− ${formatCurrency(10)}`,
    })
  })

  it("leaves out zero amounts", () => {
    expect(movementAmounts({ cashbackEarned: 0, cashbackUsed: 0 })).toEqual({ earned: null, used: null })
  })
})

describe("loyaltyHint", () => {
  const bonus = formatCurrency(10)

  it("pluralizes the remaining appointments", () => {
    expect(loyaltyHint({ remaining: 3, bonusPerCard: 10 })).toBe(`Faltam 3 atendimentos para ganhar ${bonus}`)
    expect(loyaltyHint({ remaining: 1, bonusPerCard: 10 })).toBe(`Falta 1 atendimento para ganhar ${bonus}`)
  })

  it("handles a completed card", () => {
    expect(loyaltyHint({ remaining: 0, bonusPerCard: 10 })).toBe(`Bônus de ${bonus} liberado`)
  })
})

describe("isRedemption", () => {
  it("is true only when cashback was used and none earned", () => {
    expect(isRedemption({ cashbackEarned: 0, cashbackUsed: 12 })).toBe(true)
    expect(isRedemption({ cashbackEarned: 2, cashbackUsed: 12 })).toBe(false)
    expect(isRedemption({ cashbackEarned: 2, cashbackUsed: 0 })).toBe(false)
    expect(isRedemption({ cashbackEarned: 0, cashbackUsed: 0 })).toBe(false)
  })
})

describe("movementTitle", () => {
  const providerName = "Studio Ana"

  it("labels earning lines as cashback, even when cashback was also used", () => {
    expect(movementTitle({ providerName, cashbackEarned: 5, cashbackUsed: 0 })).toBe("Cashback — Studio Ana")
    expect(movementTitle({ providerName, cashbackEarned: 5, cashbackUsed: 3 })).toBe("Cashback — Studio Ana")
  })

  it("labels spend-only lines as a redemption", () => {
    expect(movementTitle({ providerName, cashbackEarned: 0, cashbackUsed: 12 })).toBe("Resgate — Studio Ana")
  })

  it("falls back to the provider name without amounts", () => {
    expect(movementTitle({ providerName, cashbackEarned: 0, cashbackUsed: 0 })).toBe("Studio Ana")
  })
})

describe("loyaltyRule", () => {
  const bonus = formatCurrency(20)

  it("describes the card goal and bonus", () => {
    expect(loyaltyRule({ goal: 5, bonusPerCard: 20 })).toBe(`A cada 5 atendimentos, ganhe ${bonus}`)
  })

  it("uses the singular for a one-appointment card", () => {
    expect(loyaltyRule({ goal: 1, bonusPerCard: 20 })).toBe(`A cada atendimento, ganhe ${bonus}`)
  })
})

describe("cashbackSteps", () => {
  it("builds the three steps from the program rates", () => {
    expect(cashbackSteps({ cashbackRate: 0.05, maxCashbackUsageRate: 0.2 })).toEqual([
      "Agende e conclua o atendimento",
      "Receba 5% de cashback no saldo",
      "Use até 20% do valor do próximo serviço",
    ])
  })

  it("drops the usage step when cashback can't be used", () => {
    expect(cashbackSteps({ cashbackRate: 0.05, maxCashbackUsageRate: 0 })).toHaveLength(2)
  })

  it("is empty when the program gives no cashback", () => {
    expect(cashbackSteps({ cashbackRate: 0, maxCashbackUsageRate: 0.2 })).toEqual([])
  })
})
