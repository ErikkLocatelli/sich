import type { LoyaltyResponse } from "@/api/benefit/benefit"
import Card from "@/components/commons/Card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { loyaltyHint, loyaltyRule } from "@/services/benefit/cashback"
import { formatCurrency } from "@/services/schedule/formatters"

import { BENEFITS_COPY } from "./benefitsCopy"
import LoyaltyProgress from "./LoyaltyProgress"

/** Desktop loyalty card: rule, `progress/goal` pill, segmented bar and what is left for the next bonus. */
const LoyaltyCard = ({ loyalty, className }: { loyalty: LoyaltyResponse | null; className?: string }) => (
  <Card className={cn("flex flex-col gap-2.5 border border-sich-border p-5.5", className)}>
    <div className="flex items-center justify-between">
      <h2 className="text-[16px] font-semibold text-sich-heading">{BENEFITS_COPY.loyaltyTitle}</h2>
      {loyalty && (
        <span className="rounded-full bg-sich-pink-soft px-2.5 py-1 text-[10px] font-bold text-(--sich-primary)">
          {loyalty.progress} / {loyalty.goal}
        </span>
      )}
    </div>

    {!loyalty ? (
      <div aria-busy="true" aria-label="Carregando" className="flex flex-col gap-2.5">
        <Skeleton className="h-3.5 w-72" />
        <Skeleton className="h-2.5 w-full" />
      </div>
    ) : (
      <>
        <p className="text-[13px] text-sich-label">{loyaltyRule(loyalty)}</p>
        <LoyaltyProgress goal={loyalty.goal} progress={loyalty.progress} className="gap-2 pt-1" />
        <p className="text-[12px] text-sich-label">
          {loyaltyHint(loyalty)}
          {loyalty.completedCards > 0 && (
            <>
              {" · "}
              {loyalty.completedCards} {loyalty.completedCards === 1 ? "cartão completo" : "cartões completos"} (
              {formatCurrency(loyalty.bonusEarnedTotal)} em bônus)
            </>
          )}
        </p>
      </>
    )}
  </Card>
)

export default LoyaltyCard
