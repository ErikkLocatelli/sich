import { CalendarCheck, Percent, Wallet, type LucideIcon } from "lucide-react"

import Card from "@/components/commons/Card"
import { Skeleton } from "@/components/ui/skeleton"
import type { BenefitsPageState } from "@/hooks/benefit/useBenefitsPage"
import { cn } from "@/lib/utils"

import { BENEFITS_COPY } from "./benefitsCopy"

// Icon per step position: book → earn → use
const STEP_ICONS: LucideIcon[] = [CalendarCheck, Wallet, Percent]

type BenefitsHowItWorksProps = { steps: BenefitsPageState["howItWorks"]; className?: string }

/** Cashback program steps, built from the program rates. Hidden when the program gives no cashback. */
const BenefitsHowItWorks = ({ steps, className }: BenefitsHowItWorksProps) => {
  if (steps?.length === 0) return null

  return (
    <Card className={cn("flex flex-col border border-sich-border p-5.5", className)}>
      <h2 className="pb-2 text-[16px] font-semibold text-sich-heading">{BENEFITS_COPY.howItWorksTitle}</h2>

      {!steps ? (
        <div aria-busy="true" aria-label="Carregando" className="flex flex-col gap-3 pt-2">
          {Array.from({ length: 3 }, (_, index) => <Skeleton key={index} className="h-10 w-full" />)}
        </div>
      ) : (
        <ol className="divide-y divide-sich-border">
          {steps.map((step, index) => {
            const Icon = STEP_ICONS[index] ?? CalendarCheck
            return (
              <li key={step} className="flex items-center gap-3.5 py-3.5">
                <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-sich-pink-soft text-sich-magenta">
                  <Icon className="size-4.5" />
                </span>
                <span className="text-[13px] text-sich-heading">{step}</span>
              </li>
            )
          })}
        </ol>
      )}
    </Card>
  )
}

export default BenefitsHowItWorks
