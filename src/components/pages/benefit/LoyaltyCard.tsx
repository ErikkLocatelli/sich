import type { LoyaltyResponse } from "@/api/benefit/benefit"
import Card from "@/components/commons/Card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { loyaltyHint } from "@/services/benefit/cashback"
import { formatCurrency } from "@/services/schedule/formatters"

const LoyaltyCard = ({ loyalty, className }: { loyalty: LoyaltyResponse | null; className?: string }) => (
  <Card className={cn("flex flex-col gap-3 border border-sich-border p-5", className)}>
    <div className="flex items-center justify-between">
      <h2 className="text-[15px] font-medium text-sich-heading">Cartão fidelidade</h2>
      {loyalty && <span className="text-[14px] font-bold text-sich-magenta">{loyalty.progress}/{loyalty.goal}</span>}
    </div>

    {!loyalty ? (
      <Skeleton aria-label="Carregando" className="h-3 w-full" />
    ) : (
      <>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={loyalty.goal}
          aria-valuenow={loyalty.progress}
          aria-label="Atendimentos no cartão atual"
          className="flex gap-1.5"
        >
          {Array.from({ length: loyalty.goal }, (_, index) => (
            <span key={index} className={cn("h-2.5 flex-1 rounded-full", index < loyalty.progress ? "bg-sich-gradient" : "bg-muted")} />
          ))}
        </div>
        <p className="text-[12px] text-sich-label">{loyaltyHint(loyalty)}</p>
        {loyalty.completedCards > 0 && (
          <p className="text-[11px] text-sich-label">
            {loyalty.completedCards} {loyalty.completedCards === 1 ? "cartão completo" : "cartões completos"} ·{" "}
            {formatCurrency(loyalty.bonusEarnedTotal)} em bônus
          </p>
        )}
      </>
    )}
  </Card>
)

export default LoyaltyCard
