import { Link } from "react-router-dom"

import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import type { FinancialHero } from "@/services/financial/financialSummary"
import { FINANCIAL_COPY } from "@/services/financial/financialCopy"

type FinancialRevenueHeroProps = {
  /** null while loading */
  hero: FinancialHero | null
  monthName: string
  className?: string
}

/** Net revenue of the selected month, how it was reached and what is still expected. */
const FinancialRevenueHero = ({ hero, monthName, className }: FinancialRevenueHeroProps) => (
  <section className={cn("flex flex-col gap-1 overflow-hidden rounded-[24px] bg-sich-gradient p-6 text-white shadow-sich-button lg:p-8", className)}>
    <span className="text-[12px] opacity-85">{FINANCIAL_COPY.heroLabel(monthName)}</span>

    {hero ? (
      <>
        <span className="text-[32px] leading-tight font-bold tracking-[-1px] lg:text-[40px]">{hero.netRevenue}</span>
        {hero.cashbackLine && <span className="text-[11px] opacity-85">{hero.cashbackLine}</span>}
        {hero.expectedLine && <span className="text-[11px] opacity-85">{hero.expectedLine}</span>}
      </>
    ) : (
      <div aria-busy="true" aria-label="Carregando faturamento" className="flex flex-col gap-2 py-1">
        <Skeleton className="h-9 w-44 bg-white/25" />
        <Skeleton className="h-3 w-56 bg-white/25" />
      </div>
    )}

    <Link
      to="/schedule"
      className="mt-3 w-fit rounded-[14px] bg-white px-6 py-3 text-[13px] font-semibold text-sich-magenta transition-opacity hover:opacity-90"
    >
      {FINANCIAL_COPY.heroAction}
    </Link>
  </section>
)

export default FinancialRevenueHero
