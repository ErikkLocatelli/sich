import { Receipt, Trophy } from "lucide-react"

import Nails from "@/assets/icons/Nails.svg?react"
import Title from "@/components/commons/Title"
import FinancialEntryList from "@/components/pages/financial/FinancialEntryList"
import FinancialMetrics from "@/components/pages/financial/FinancialMetrics"
import FinancialMonthSummary from "@/components/pages/financial/FinancialMonthSummary"
import FinancialMonthToggle from "@/components/pages/financial/FinancialMonthToggle"
import FinancialRevenueHero from "@/components/pages/financial/FinancialRevenueHero"
import ProfileMenuSection from "@/components/pages/profile/ProfileMenuSection"
import type { FinancialPageState } from "@/hooks/financial/useFinancialPage"
import { cn } from "@/lib/utils"
import { FINANCIAL_COPY, FINANCIAL_SHORTCUTS } from "@/services/financial/financialCopy"

const FinancialDesktop = ({ state }: { state: FinancialPageState }) => {
  const { animationClass, monthLabels, monthIndex, setMonthIndex, monthName, hero, metrics, monthSummary, statement, topProducts } = state

  return (
    <section className={cn("flex w-full flex-col gap-6 px-10 py-8", animationClass)}>
      <header className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Title text={FINANCIAL_COPY.title} className="lg:text-left lg:text-[26px] lg:font-bold lg:tracking-[-0.4px]" />
          <span className="text-[13px] text-sich-label">{FINANCIAL_COPY.subtitle}</span>
        </div>
        <FinancialMonthToggle
          labels={monthLabels}
          selectedIndex={monthIndex}
          onSelectedIndexChange={setMonthIndex}
          className="w-80 shrink-0"
        />
      </header>

      <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-start gap-6">
        <div className="flex flex-col gap-6">
          <FinancialRevenueHero hero={hero} monthName={monthName} />
          <FinancialMetrics metrics={metrics} columns={4} />
          <FinancialEntryList
            title={FINANCIAL_COPY.statementTitle}
            entries={statement}
            icon={Nails}
            emptyIcon={Receipt}
            emptyTitle={FINANCIAL_COPY.statementEmptyTitle}
            emptyDescription={FINANCIAL_COPY.statementEmptyDescription}
            className="p-5.5"
          />
        </div>

        <div className="flex flex-col gap-6">
          <FinancialMonthSummary summary={monthSummary} />
          <FinancialEntryList
            title={FINANCIAL_COPY.topProductsTitle}
            entries={topProducts}
            icon={Trophy}
            emptyIcon={Trophy}
            emptyTitle={FINANCIAL_COPY.topProductsEmptyTitle}
            emptyDescription={FINANCIAL_COPY.topProductsEmptyDescription}
            className="p-5.5"
          />
          <ProfileMenuSection title={FINANCIAL_COPY.shortcutsTitle} items={FINANCIAL_SHORTCUTS} variant="desktop" />
        </div>
      </div>
    </section>
  )
}

export default FinancialDesktop
