import { Clock, Wallet } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"
import type { BenefitsPageState } from "@/hooks/benefit/useBenefitsPage"

import { BENEFITS_COPY } from "./benefitsCopy"

/** Mobile hero balance: glass card with the cashback balance and what is still pending; meant for the gradient background. */
const BenefitsBalanceCard = ({ wallet }: { wallet: BenefitsPageState["wallet"] }) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center justify-between gap-3 rounded-[20px] bg-white/18 px-4.5 py-4 text-white backdrop-blur-xs">
      <div className="flex min-w-0 flex-col gap-1">
        <span className="flex items-center gap-1 text-[11px] opacity-85">
          <Wallet aria-hidden="true" className="size-3" />
          {BENEFITS_COPY.balanceLabel}
        </span>
        {wallet ? (
          <span className="text-[28px] font-bold leading-tight">{wallet.balance}</span>
        ) : (
          <Skeleton aria-label="Carregando saldo" className="h-8 w-32 bg-white/30" />
        )}
      </div>

      {wallet?.hasPending && (
        <span className="flex shrink-0 items-center gap-1 text-[12px] opacity-85" title={BENEFITS_COPY.pendingHint}>
          <Clock aria-hidden="true" className="size-3.5" />
          {wallet.pending} {BENEFITS_COPY.pendingSuffix}
        </span>
      )}
    </div>

    {wallet && <p className="px-1 text-[11px] text-white/85">{wallet.usageHint}</p>}
  </div>
)

export default BenefitsBalanceCard
