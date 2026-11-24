import { describe, expect, it } from "vitest"

import { formatCurrency } from "@/services/schedule/formatters"

import { cashbackDiscount, loyaltyHint, movementAmounts, percentLabel } from "./cashback"

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
