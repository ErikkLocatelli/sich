import { Gift, Receipt } from "lucide-react"

import type { CashbackMovementResponse } from "@/api/benefit/benefit"
import Card from "@/components/commons/Card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import type { BenefitsPageState } from "@/hooks/benefit/useBenefitsPage"
import { cn } from "@/lib/utils"
import { CASHBACK_STATUS_LABEL, isRedemption, movementAmounts, movementTitle } from "@/services/benefit/cashback"
import { shortDateTime } from "@/services/schedule/agendaDates"

import { BENEFITS_COPY } from "./benefitsCopy"

const MovementRow = ({ movement, rowClassName }: { movement: CashbackMovementResponse; rowClassName?: string }) => {
  const canceled = movement.status === "CANCELED"
  const redemption = isRedemption(movement)
  const { earned, used } = movementAmounts(movement)

  return (
    <li className={cn("flex items-center justify-between gap-3 py-3", canceled && "opacity-50", rowClassName)}>
      <div className="flex min-w-0 items-center gap-2.5">
        <span
          aria-hidden="true"
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-[10px]",
            redemption ? "bg-muted text-sich-label" : "bg-sich-pink-soft text-sich-magenta",
          )}
        >
          <Gift className="size-4" />
        </span>
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-[13px] font-medium text-sich-heading">{movementTitle(movement)}</span>
          <span className="text-[10px] text-sich-label">
            {shortDateTime(movement.startAt)} · {CASHBACK_STATUS_LABEL[movement.status]}
          </span>
        </div>
      </div>
      <div className={cn("flex shrink-0 flex-col items-end text-[13px] font-semibold", canceled && "line-through")}>
        {earned && <span className={movement.status === "CREDITED" ? "text-(--sich-green)" : "text-sich-label"}>{earned}</span>}
        {used && <span className="text-sich-red">{used}</span>}
      </div>
    </li>
  )
}

const StatementSkeleton = ({ rowClassName }: { rowClassName?: string }) => (
  <ul aria-busy="true" aria-label="Carregando extrato" className="divide-y divide-sich-border">
    {Array.from({ length: 3 }, (_, index) => (
      <li key={index} className={cn("flex items-center gap-2.5 py-3", rowClassName)}>
        <Skeleton className="size-9 shrink-0 rounded-[10px]" />
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
  <div className="flex flex-col items-center gap-1.5 px-4 py-6 text-center">
    <Receipt aria-hidden="true" className="size-6 text-sich-magenta" />
    <p className="text-[13px] font-medium text-sich-heading">Nenhuma movimentação ainda</p>
    <p className="text-[11px] text-sich-label">O cashback dos seus agendamentos aparece aqui.</p>
  </div>
)

type CashbackStatementProps = BenefitsPageState["statement"] & {
  /** `card`: heading inside a padded card (desktop) · `section`: heading above an edge-to-edge list card (mobile) */
  variant?: "card" | "section"
  className?: string
}

const CashbackStatement = ({ movements, loaded, hasMore, loadingMore, loadMore, variant = "card", className }: CashbackStatementProps) => {
  const isSection = variant === "section"
  const rowClassName = isSection ? "px-3.5" : undefined

  const heading = (
    <h2 className={cn("text-sich-heading", isSection ? "text-[14px] font-semibold" : "pb-2 text-[16px] font-semibold")}>
      {BENEFITS_COPY.statementTitle}
    </h2>
  )

  const body = (
    <>
      {!loaded ? (
        <StatementSkeleton rowClassName={rowClassName} />
      ) : movements.length === 0 ? (
        <StatementEmpty />
      ) : (
        <ul className="divide-y divide-sich-border">
          {movements.map((movement) => <MovementRow key={movement.appointmentId} movement={movement} rowClassName={rowClassName} />)}
        </ul>
      )}

      {hasMore && (
        <Button
          type="button"
          variant="ghost"
          onClick={loadMore}
          disabled={loadingMore}
          className={cn(
            "self-center text-[12px] font-semibold text-sich-magenta hover:bg-sich-magenta/5 hover:text-sich-magenta",
            isSection ? "mb-2" : "mt-1",
          )}
        >
          {loadingMore && <Spinner className="size-3.5" />}
          Ver mais
        </Button>
      )}
    </>
  )

  if (isSection) {
    return (
      <section className={cn("flex flex-col gap-2.5", className)}>
        {heading}
        <Card className="flex flex-col overflow-hidden border border-sich-border">{body}</Card>
      </section>
    )
  }

  return (
    <Card className={cn("flex flex-col gap-1 border border-sich-border p-5.5", className)}>
      {heading}
      {body}
    </Card>
  )
}

export default CashbackStatement
