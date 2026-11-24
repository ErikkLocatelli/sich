import { Receipt, Trophy } from "lucide-react"

import Nails from "@/assets/icons/Nails.svg?react"
import Title from "@/components/commons/Title"
import FinancialEntryList from "@/components/pages/financial/FinancialEntryList"
import FinancialMetrics from "@/components/pages/financial/FinancialMetrics"
import FinancialMonthToggle from "@/components/pages/financial/FinancialMonthToggle"
import FinancialRevenueHero from "@/components/pages/financial/FinancialRevenueHero"
import ProfileMenuSection from "@/components/pages/profile/ProfileMenuSection"
import type { FinancialPageState } from "@/hooks/financial/useFinancialPage"
import { cn } from "@/lib/utils"
import { FINANCIAL_COPY, FINANCIAL_SHORTCUTS } from "@/services/financial/financialCopy"

const FinancialMobile = ({ state }: { state: FinancialPageState }) => {
  const { animationClass, monthLabels, monthIndex, setMonthIndex, monthName, hero, metrics, statement, topProducts } = state

  return (
    <div className={cn("flex w-full flex-col gap-5 px-5 pt-6 pb-5", animationClass)}>
      <header className="flex flex-col gap-1">
        <Title text={FINANCIAL_COPY.title} />
        <p className="text-[12px] text-sich-label">{FINANCIAL_COPY.subtitle}</p>
      </header>

      <FinancialMonthToggle labels={monthLabels} selectedIndex={monthIndex} onSelectedIndexChange={setMonthIndex} />

      <FinancialRevenueHero hero={hero} monthName={monthName} />

      <FinancialMetrics metrics={metrics} />

      <FinancialEntryList
        title={FINANCIAL_COPY.statementTitle}
        entries={statement}
        icon={Nails}
        emptyIcon={Receipt}
        emptyTitle={FINANCIAL_COPY.statementEmptyTitle}
        emptyDescription={FINANCIAL_COPY.statementEmptyDescription}
      />

      <FinancialEntryList
        title={FINANCIAL_COPY.topProductsTitle}
        entries={topProducts}
        icon={Trophy}
        emptyIcon={Trophy}
        emptyTitle={FINANCIAL_COPY.topProductsEmptyTitle}
        emptyDescription={FINANCIAL_COPY.topProductsEmptyDescription}
      />

      <ProfileMenuSection title={FINANCIAL_COPY.shortcutsTitle} items={FINANCIAL_SHORTCUTS} />
    </div>
  )
}

export default FinancialMobile
