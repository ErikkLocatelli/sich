import { Sparkles } from "lucide-react"

import type { LoyaltyResponse } from "@/api/benefit/benefit"
import Card from "@/components/commons/Card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { loyaltyRule } from "@/services/benefit/cashback"

import { BENEFITS_COPY } from "./benefitsCopy"
import LoyaltyProgress from "./LoyaltyProgress"

type LoyaltyCompactCardProps = { loyalty: LoyaltyResponse | null; className?: string }

/** Mobile loyalty summary: rule, `progress/goal` and the segmented bar. */
const LoyaltyCompactCard = ({ loyalty, className }: LoyaltyCompactCardProps) => (
  <Card className={cn("flex flex-col gap-2.5 border border-sich-border p-3.5", className)}>
    <div className="flex items-center gap-2.5">
      <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-sich-pink-soft text-sich-magenta">
        <Sparkles className="size-4.5" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col">
        <h2 className="text-[13px] font-semibold text-sich-heading">{BENEFITS_COPY.loyaltyTitle}</h2>
        {loyalty ? (
          <span className="text-[10px] text-sich-label">{loyaltyRule(loyalty)}</span>
        ) : (
          <Skeleton className="mt-1 h-2.5 w-40" />
        )}
      </div>
      {loyalty && (
        <span className="shrink-0 text-[16px] font-bold text-sich-magenta">
          {loyalty.progress}/{loyalty.goal}
        </span>
      )}
    </div>

    {loyalty ? (
      <LoyaltyProgress goal={loyalty.goal} progress={loyalty.progress} className="gap-2" segmentClassName="h-2" />
    ) : (
      <Skeleton aria-label="Carregando" className="h-2 w-full" />
    )}
  </Card>
)

export default LoyaltyCompactCard
