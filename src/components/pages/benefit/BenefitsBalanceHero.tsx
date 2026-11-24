import { ArrowRight, Clock, Wallet } from "lucide-react"
import { Link } from "react-router-dom"

import { Skeleton } from "@/components/ui/skeleton"
import type { BenefitsPageState } from "@/hooks/benefit/useBenefitsPage"

import { BENEFITS_COPY } from "./benefitsCopy"

/** Desktop wallet hero: big cashback balance, pending amount and usage rule, plus a call to book. */
const BenefitsBalanceHero = ({ wallet }: { wallet: BenefitsPageState["wallet"] }) => (
  <section className="flex items-start justify-between gap-6 overflow-hidden rounded-[24px] bg-sich-gradient px-8 py-7.5 text-white shadow-sich-button">
    <div className="flex min-w-0 flex-col gap-1.5">
      <span className="flex items-center gap-1 text-[12px] opacity-85">
        <Wallet aria-hidden="true" className="size-3.5" />
        {BENEFITS_COPY.heroBalanceLabel}
      </span>
      {wallet ? (
        <span className="text-[40px] leading-tight font-bold tracking-[-1px]">{wallet.balance}</span>
      ) : (
        <Skeleton aria-label="Carregando saldo" className="h-12 w-44 bg-white/30" />
      )}
      {wallet && (
        <span className="flex items-center gap-1 text-[11px] opacity-85">
          {wallet.hasPending && (
            <>
              <Clock aria-hidden="true" className="size-3" />
              <span title={BENEFITS_COPY.pendingHint}>
                {wallet.pending} {BENEFITS_COPY.pendingSuffix}
              </span>
              <span aria-hidden="true">·</span>
            </>
          )}
          {wallet.usageHint}
        </span>
      )}
    </div>

    <Link
      to="/search"
      className="flex shrink-0 items-center gap-1.5 rounded-[14px] bg-white px-5 py-3 text-[13px] font-semibold text-sich-magenta transition-opacity hover:opacity-90"
    >
      {BENEFITS_COPY.useAction}
      <ArrowRight aria-hidden="true" className="size-4" />
    </Link>
  </section>
)

export default BenefitsBalanceHero
