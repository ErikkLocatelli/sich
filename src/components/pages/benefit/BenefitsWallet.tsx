import { Clock, Wallet } from "lucide-react"

import UserInfoCard from "@/components/commons/UserInfoCard"
import type { BenefitsPageState } from "@/hooks/benefit/useBenefitsPage"
import { cn } from "@/lib/utils"

import { BENEFITS_COPY } from "./benefitsCopy"

type BenefitsWalletProps = {
  wallet: BenefitsPageState["wallet"]
  /** Stack the cards (desktop side column) instead of side by side */
  stacked?: boolean
}

/** Balance and pending cashback cards; meant to sit on the gradient background. */
const BenefitsWallet = ({ wallet, stacked = false }: BenefitsWalletProps) => (
  <div className="flex flex-col gap-3">
    <div className={cn("flex gap-3", stacked && "flex-col")}>
      <UserInfoCard label="Saldo cashback" value={wallet?.balance ?? "—"} icon={Wallet} detail={wallet?.usageHint} />
      <UserInfoCard label="A receber" value={wallet?.pending ?? "—"} icon={Clock} detail={BENEFITS_COPY.pendingHint} />
    </div>
    {wallet && <p className="text-[11px] text-white/85">{wallet.earnHint}</p>}
  </div>
)

export default BenefitsWallet
