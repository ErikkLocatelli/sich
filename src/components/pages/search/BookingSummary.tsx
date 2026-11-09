import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/services/schedule/formatters"

export type BookingSummaryRow = {
  label: string
  value: string
}

type BookingSummaryProps = {
  rows: BookingSummaryRow[]
  total: number
  className?: string
}

const SummaryRow = ({ label, value }: BookingSummaryRow) => (
  <div className="flex justify-between gap-3 text-[12px] lg:text-[13px]">
    <span className="text-sich-label">{label}</span>
    <span className="text-right font-medium text-sich-heading lg:font-semibold">{value}</span>
  </div>
)

const BookingSummary = ({ rows, total, className }: BookingSummaryProps) => (
  <section className={cn("flex flex-col gap-2 rounded-[16px] bg-primary/10 p-4", className)}>
    <h2 className="mb-1 text-[14px] font-semibold text-sich-heading lg:text-[16px]">Resumo</h2>
    {rows.map((row) => <SummaryRow key={row.label} {...row} />)}
    <Separator className="my-1 bg-sich-border" />
    <div className="flex justify-between text-[15px] font-bold text-sich-magenta lg:text-[18px]">
      <span>Total</span>
      <span>{formatCurrency(total)}</span>
    </div>
  </section>
)

export default BookingSummary
