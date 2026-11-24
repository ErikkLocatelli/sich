import { useId } from "react"

import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/services/schedule/formatters"

export type BookingSummaryRow = {
  label: string
  value: string
}

export type BookingSummaryCashback = {
  visible: boolean
  balance: number
  availableDiscount: number
  enabled: boolean
  toggle: (enabled: boolean) => void
}

type BookingSummaryProps = {
  rows: BookingSummaryRow[]
  /** Price before the cashback discount */
  price: number
  discount: number
  totalToPay: number
  cashback?: BookingSummaryCashback
  className?: string
}

const SummaryRow = ({ label, value, valueClassName }: BookingSummaryRow & { valueClassName?: string }) => (
  <div className="flex justify-between gap-3 text-[12px] lg:text-[13px]">
    <span className="text-sich-label">{label}</span>
    <span className={cn("text-right font-medium text-sich-heading lg:font-semibold", valueClassName)}>{value}</span>
  </div>
)

const CashbackOption = ({ balance, availableDiscount, enabled, toggle }: BookingSummaryCashback) => {
  const id = useId()

  return (
    <label htmlFor={id} className="flex cursor-pointer items-center justify-between gap-3 py-1">
      <span className="flex min-w-0 flex-col">
        <span className="text-[12px] font-semibold text-sich-heading lg:text-[13px]">Usar cashback</span>
        <span className="text-[11px] text-sich-label">
          Saldo {formatCurrency(balance)} · desconto de {formatCurrency(availableDiscount)}
        </span>
      </span>
      <Switch id={id} checked={enabled} onCheckedChange={toggle} />
    </label>
  )
}

const BookingSummary = ({ rows, price, discount, totalToPay, cashback, className }: BookingSummaryProps) => (
  <section className={cn("flex flex-col gap-2 rounded-[16px] bg-primary/10 p-4", className)}>
    <h2 className="mb-1 text-[14px] font-semibold text-sich-heading lg:text-[16px]">Resumo</h2>
    {rows.map((row) => <SummaryRow key={row.label} {...row} />)}
    {cashback?.visible && <CashbackOption {...cashback} />}
    {discount > 0 && (
      <>
        <SummaryRow label="Subtotal" value={formatCurrency(price)} />
        <SummaryRow label="Desconto cashback" value={`− ${formatCurrency(discount)}`} valueClassName="text-(--sich-green)" />
      </>
    )}
    <Separator className="my-1 bg-sich-border" />
    <div className="flex justify-between text-[15px] font-bold text-sich-magenta lg:text-[18px]">
      <span>Total</span>
      <span>{formatCurrency(totalToPay)}</span>
    </div>
  </section>
)

export default BookingSummary
