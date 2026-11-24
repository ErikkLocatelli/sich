import { CircleCheck, CircleX, Clock, Receipt } from "lucide-react"

import type { CashbackMovementResponse, CashbackStatus } from "@/api/benefit/benefit"
import Card from "@/components/commons/Card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import type { BenefitsPageState } from "@/hooks/benefit/useBenefitsPage"
import { cn } from "@/lib/utils"
import { CASHBACK_STATUS_LABEL, movementAmounts } from "@/services/benefit/cashback"
import { shortDateTime } from "@/services/schedule/agendaDates"

const statusIcon: Record<CashbackStatus, { icon: typeof CircleCheck; className: string }> = {
  CREDITED: { icon: CircleCheck, className: "text-(--sich-green)" },
  PENDING: { icon: Clock, className: "text-sich-magenta" },
  CANCELED: { icon: CircleX, className: "text-sich-label" },
}

const MovementRow = ({ movement }: { movement: CashbackMovementResponse }) => {
  const canceled = movement.status === "CANCELED"
  const { icon: Icon, className } = statusIcon[movement.status]
  const { earned, used } = movementAmounts(movement)

  return (
    <li className={cn("flex items-center justify-between gap-3 py-3", canceled && "opacity-50")}>
      <div className="flex min-w-0 items-center gap-2.5">
        <Icon aria-hidden="true" className={cn("size-5 shrink-0", className)} />
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-[13px] font-medium text-sich-heading">{movement.providerName}</span>
          <span className="text-[11px] text-sich-label">
            {shortDateTime(movement.startAt)} · {CASHBACK_STATUS_LABEL[movement.status]}
          </span>
        </div>
      </div>
      <div className={cn("flex shrink-0 flex-col items-end text-[13px] font-semibold", canceled && "line-through")}>
        {earned && <span className={movement.status === "CREDITED" ? "text-(--sich-green)" : "text-sich-label"}>{earned}</span>}
        {used && <span className="text-sich-heading">{used}</span>}
      </div>
    </li>
  )
}

const StatementSkeleton = () => (
  <ul aria-busy="true" aria-label="Carregando extrato" className="divide-y divide-sich-border">
    {Array.from({ length: 3 }, (_, index) => (
      <li key={index} className="flex items-center gap-2.5 py-3">
        <Skeleton className="size-5 shrink-0 rounded-full" />
        <div className="flex flex-1 flex-col gap-1.5">
          <Skeleton className="h-3.5 w-32" />
          <Skeleton className="h-2.5 w-24" />
        </div>
        <Skeleton className="h-3.5 w-14" />
      </li>
    ))}
  </ul>
)

const StatementEmpty = () => (
  <div className="flex flex-col items-center gap-1.5 py-6 text-center">
    <Receipt aria-hidden="true" className="size-6 text-sich-magenta" />
    <p className="text-[13px] font-medium text-sich-heading">Nenhuma movimentação ainda</p>
    <p className="text-[11px] text-sich-label">O cashback dos seus agendamentos aparece aqui.</p>
  </div>
)

type CashbackStatementProps = BenefitsPageState["statement"] & { className?: string }

const CashbackStatement = ({ movements, loaded, hasMore, loadingMore, loadMore, className }: CashbackStatementProps) => (
  <Card className={cn("flex flex-col gap-1 border border-sich-border p-5", className)}>
    <h2 className="text-[15px] font-medium text-sich-heading">Extrato</h2>

    {!loaded ? (
      <StatementSkeleton />
    ) : movements.length === 0 ? (
      <StatementEmpty />
    ) : (
      <ul className="divide-y divide-sich-border">
        {movements.map((movement) => <MovementRow key={movement.appointmentId} movement={movement} />)}
      </ul>
    )}

    {hasMore && (
      <Button
        type="button"
        variant="ghost"
        onClick={loadMore}
        disabled={loadingMore}
        className="mt-1 self-center text-[12px] font-semibold text-sich-magenta hover:bg-sich-magenta/5 hover:text-sich-magenta"
      >
        {loadingMore && <Spinner className="size-3.5" />}
        Ver mais
      </Button>
    )}
  </Card>
)

export default CashbackStatement
