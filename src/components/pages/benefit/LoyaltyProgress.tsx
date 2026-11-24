import type { LoyaltyResponse } from "@/api/benefit/benefit"
import { cn } from "@/lib/utils"

type LoyaltyProgressProps = Pick<LoyaltyResponse, "goal" | "progress"> & {
  className?: string
  segmentClassName?: string
}

/** One segment per appointment of the loyalty card, filled up to `progress`. */
const LoyaltyProgress = ({ goal, progress, className, segmentClassName }: LoyaltyProgressProps) => (
  <div
    role="progressbar"
    aria-valuemin={0}
    aria-valuemax={goal}
    aria-valuenow={progress}
    aria-label="Atendimentos no cartão atual"
    className={cn("flex gap-1.5", className)}
  >
    {Array.from({ length: goal }, (_, index) => (
      <span key={index} className={cn("h-2.5 flex-1 rounded-full", index < progress ? "bg-sich-gradient" : "bg-muted", segmentClassName)} />
    ))}
  </div>
)

export default LoyaltyProgress
