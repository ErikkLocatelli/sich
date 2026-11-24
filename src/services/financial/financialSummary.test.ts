import { describe, expect, it } from "vitest"

import type { FinancialSummaryResponse } from "@/api/financial/financial"
import { formatCurrency, formatCurrencyShort } from "@/services/schedule/formatters"

import {
  appointmentsLabel,
  dailyEntries,
  deltaHint,
  financialHero,
  financialMetrics,
  financialMonths,
  financialMonthSummary,
  percentHint,
  topProductEntries,
} from "./financialSummary"

const summary = (overrides: Partial<FinancialSummaryResponse> = {}): FinancialSummaryResponse => ({
  from: "2026-11-01",
  to: "2026-11-30",
  completedCount: 10,
  grossRevenue: 1000,
  cashbackDiscount: 0,
  netRevenue: 1000,
  averageTicket: 100,
  upcomingCount: 0,
  expectedRevenue: 0,
  canceledCount: 0,
  canceledRevenue: 0,
  daily: [],
  topProducts: [],
  ...overrides,
})

describe("financialMonths", () => {
  it("lists months backwards from the current one with full periods", () => {
    const months = financialMonths(new Date(2026, 10, 24), 3)

    expect(months.map((month) => month.label)).toEqual(["Novembro", "Outubro", "Setembro"])
    expect(months[0].name).toBe("novembro")
    expect(months[1].period).toEqual({ from: "2026-10-01", to: "2026-10-31" })
  })

  it("crosses the year boundary", () => {
    const months = financialMonths(new Date(2027, 0, 31), 2)

    expect(months[1].period).toEqual({ from: "2026-12-01", to: "2026-12-31" })
  })

  it("does not roll over on the 31st into a short month", () => {
    const months = financialMonths(new Date(2026, 2, 31), 2)

    expect(months[1].period).toEqual({ from: "2026-02-01", to: "2026-02-28" })
  })

  it("returns nothing for a non-positive count", () => {
    expect(financialMonths(new Date(2026, 10, 24), 0)).toEqual([])
  })
})

describe("appointmentsLabel", () => {
  it("handles singular and plural", () => {
    expect(appointmentsLabel(1)).toBe("1 atendimento")
    expect(appointmentsLabel(0)).toBe("0 atendimentos")
    expect(appointmentsLabel(3)).toBe("3 atendimentos")
  })
})

describe("deltaHint", () => {
  it("is null without a previous month", () => {
    expect(deltaHint(5, undefined, "outubro", String)).toBeNull()
  })

  it("shows an increase and a decrease with the absolute delta", () => {
    expect(deltaHint(8, 5, "outubro", String)).toEqual({ text: "3 vs outubro", tone: "up" })
    expect(deltaHint(5, 8, "outubro", String)).toEqual({ text: "3 vs outubro", tone: "down" })
  })

  it("treats float noise as no change", () => {
    expect(deltaHint(0.1 + 0.2, 0.3, "outubro", String)).toEqual({ text: "Igual a outubro", tone: "neutral" })
  })
})

describe("percentHint", () => {
  it("rounds the percent change", () => {
    expect(percentHint(114, 100, "outubro")).toEqual({ text: "14% vs outubro", tone: "up" })
    expect(percentHint(50, 150, "outubro")).toEqual({ text: "67% vs outubro", tone: "down" })
  })

  it("has no baseline when the previous month is missing or zero", () => {
    expect(percentHint(100, undefined, "outubro")).toBeNull()
    expect(percentHint(100, 0, "outubro")).toBeNull()
  })
})

describe("financialMetrics", () => {
  it("compares against the previous month", () => {
    const metrics = financialMetrics(
      summary({ grossRevenue: 1140, averageTicket: 109, completedCount: 12 }),
      summary(),
      "outubro",
    )

    expect(metrics.map((metric) => metric.hint?.text)).toEqual([
      "14% vs outubro",
      `${formatCurrencyShort(9)} vs outubro`,
      "2 vs outubro",
      undefined,
    ])
  })

  it("shows values without trends while the previous month is loading", () => {
    const metrics = financialMetrics(summary(), undefined, "outubro")

    expect(metrics.slice(0, 3).every((metric) => metric.hint === null)).toBe(true)
    expect(metrics[0].value).toBe(formatCurrencyShort(1000))
  })

  it("shows the revenue lost to cancellations", () => {
    const [, , , canceled] = financialMetrics(summary({ canceledCount: 2, canceledRevenue: 150 }), undefined, "outubro")

    expect(canceled.value).toBe("2")
    expect(canceled.hint).toEqual({ text: `${formatCurrencyShort(150)} não faturados`, tone: "neutral" })
  })
})

describe("financialHero", () => {
  it("omits the cashback and expected lines when there is nothing to show", () => {
    expect(financialHero(summary())).toEqual({ netRevenue: formatCurrency(1000), cashbackLine: null, expectedLine: null })
  })

  it("explains the cashback discount and the expected revenue", () => {
    const hero = financialHero(summary({ cashbackDiscount: 40, netRevenue: 960, upcomingCount: 1, expectedRevenue: 80 }))

    expect(hero.cashbackLine).toBe(`${formatCurrency(1000)} brutos − ${formatCurrency(40)} de cashback`)
    expect(hero.expectedLine).toBe(`${formatCurrency(80)} previstos em 1 atendimento agendado`)
  })

  it("pluralizes the expected appointments", () => {
    expect(financialHero(summary({ upcomingCount: 3, expectedRevenue: 240 })).expectedLine).toContain("3 atendimentos agendados")
  })
})

describe("financialMonthSummary", () => {
  it("breaks the net revenue down and shows the outlook with counts", () => {
    const { revenue, outlook } = financialMonthSummary(summary({
      cashbackDiscount: 40, netRevenue: 960, upcomingCount: 2, expectedRevenue: 180, canceledCount: 1, canceledRevenue: 90,
    }))

    expect(revenue.map((row) => row.value)).toEqual([formatCurrency(1000), `− ${formatCurrency(40)}`, formatCurrency(960)])
    expect(outlook.map((row) => row.value)).toEqual([
      `${formatCurrency(180)} · 2 atendimentos`,
      `${formatCurrency(90)} · 1 atendimento`,
    ])
  })

  it("shows plain zeros without cashback, upcoming or canceled appointments", () => {
    const { revenue, outlook } = financialMonthSummary(summary())

    expect(revenue[1].value).toBe(formatCurrency(0))
    expect(outlook.every((row) => row.value === formatCurrency(0))).toBe(true)
  })
})

describe("dailyEntries", () => {
  it("keeps only days with completed appointments, most recent first", () => {
    const entries = dailyEntries([
      { date: "2026-11-10", completedCount: 2, grossRevenue: 200, netRevenue: 190 },
      { date: "2026-11-11", completedCount: 0, grossRevenue: 0, netRevenue: 0 },
      { date: "2026-11-13", completedCount: 1, grossRevenue: 85.5, netRevenue: 85.5 },
    ])

    expect(entries.map((entry) => entry.key)).toEqual(["2026-11-13", "2026-11-10"])
    expect(entries[0]).toMatchObject({ title: "Sex, 13 Nov", detail: "1 atendimento", amount: `+ ${formatCurrency(85.5)}`, positive: true })
  })

  it("is empty for a month without completed appointments", () => {
    expect(dailyEntries([])).toEqual([])
  })
})

describe("topProductEntries", () => {
  it("sorts by revenue, caps the list and does not mutate the input", () => {
    const products = Array.from({ length: 7 }, (_, index) => ({ productName: `P${index}`, count: 1, revenue: index * 10 }))
    const entries = topProductEntries(products)

    expect(entries.map((entry) => entry.key)).toEqual(["P6", "P5", "P4", "P3", "P2"])
    expect(products[0].productName).toBe("P0")
  })
})
