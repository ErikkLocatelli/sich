import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/services/schedule/formatters"

type BookingSummaryProps = {
  serviceName: string
  providerName: string
  dateTimeLabel: string
  total: number
}

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between gap-3 text-[12px]">
    <span className="text-sich-label">{label}</span>
    <span className="text-right font-medium text-sich-heading">{value}</span>
  </div>
)

/** Booking recap; cashback is hidden until the backend supports it, so the total is the service price. */
const BookingSummary = ({ serviceName, providerName, dateTimeLabel, total }: BookingSummaryProps) => (
  <section className="flex flex-col gap-2 rounded-[16px] bg-primary/10 p-4">
    <h2 className="mb-1 text-[14px] font-semibold text-sich-heading">Resumo</h2>
    <SummaryRow label="Serviço" value={serviceName} />
    <SummaryRow label="Profissional" value={providerName} />
    <SummaryRow label="Data e hora" value={dateTimeLabel} />
    <Separator className="my-1 bg-sich-border" />
    <div className="flex justify-between text-[15px] font-bold text-sich-magenta">
      <span>Total</span>
      <span>{formatCurrency(total)}</span>
    </div>
  </section>
)

export default BookingSummary
