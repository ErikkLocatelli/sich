import { describe, expect, it } from "vitest"

import type { CustomerBenefitsResponse } from "@/api/benefit/benefit"
import type { FinancialSummaryResponse } from "@/api/financial/financial"
import type { AgendaSummaryResponse } from "@/api/schedule/appointments"

import { formatCurrencyShort, formatCurrencyWhole } from "@/services/schedule/formatters"

import { sinceYear } from "./profileFormat"
import { customerProfileStats, occupancyLabel, providerProfileStats } from "./profileStats"

const agenda = (workingMinutes: number, bookedMinutes: number): AgendaSummaryResponse => ({
  from: "2026-11-22",
  to: "2026-11-28",
  scheduledCount: 0,
  canceledCount: 0,
  workingMinutes,
  bookedMinutes,
  freeMinutes: Math.max(workingMinutes - bookedMinutes, 0),
  expectedRevenue: 0,
})

const benefits = { cashbackBalance: 24.5, loyalty: { progress: 3, goal: 5 } } as CustomerBenefitsResponse

describe("customerProfileStats", () => {
  it("shows completed appointments, cashback balance and loyalty progress", () => {
    const stats = customerProfileStats({ completedCount: 12, upcomingCount: 1, canceledCount: 0 }, benefits)

    expect(stats.map((stat) => stat.value)).toEqual(["12", formatCurrencyShort(24.5), "3/5"])
  })

  it("keeps every value null while loading", () => {
    expect(customerProfileStats(undefined, undefined).every((stat) => stat.value === null)).toBe(true)
  })

  it("shows zero instead of loading for a brand-new customer", () => {
    const empty = { ...benefits, cashbackBalance: 0, loyalty: { ...benefits.loyalty, progress: 0 } }
    const stats = customerProfileStats({ completedCount: 0, upcomingCount: 0, canceledCount: 0 }, empty)

    expect(stats.map((stat) => stat.value)).toEqual(["0", formatCurrencyShort(0), "0/5"])
  })
})

describe("providerProfileStats", () => {
  it("shows the month's completed appointments, net revenue and the week's occupancy", () => {
    const financial = { completedCount: 8, netRevenue: 640 } as FinancialSummaryResponse

    expect(providerProfileStats(financial, agenda(600, 150)).map((stat) => stat.value)).toEqual(["8", formatCurrencyWhole(640), "25%"])
  })

  it("loads each source independently", () => {
    expect(providerProfileStats(undefined, agenda(600, 0)).map((stat) => stat.value)).toEqual([null, null, "0%"])
  })
})

describe("occupancyLabel", () => {
  it("shows a dash without working hours instead of dividing by zero", () => {
    expect(occupancyLabel(agenda(0, 0))).toBe("—")
  })

  it("never goes above 100%", () => {
    expect(occupancyLabel(agenda(60, 90))).toBe("100%")
  })
})

describe("sinceYear", () => {
  it("reads the year of the sign-up instant", () => {
    expect(sinceYear("2024-03-10T12:00:00Z")).toBe("2024")
  })

  it.each([null, undefined, "", "not a date"])("returns null for %s", (value) => {
    expect(sinceYear(value)).toBeNull()
  })
})

describe("formatCurrencyWhole", () => {
  const plain = (value: number) => formatCurrencyWhole(value).replace(/\s/g, " ")

  it("drops the cents and keeps the thousands dot", () => {
    expect(plain(640)).toBe("R$ 640")
    expect(plain(1234.4)).toBe("R$ 1.234")
    expect(plain(1234.5)).toBe("R$ 1.235")
  })

  it("formats zero and negative values", () => {
    expect(plain(0)).toBe("R$ 0")
    expect(plain(-80.2)).toBe("-R$ 80")
  })
})
