import Card from "@/components/commons/Card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import type { FinancialMonthSummary as MonthSummary, SummaryRow } from "@/services/financial/financialSummary"
import { FINANCIAL_COPY } from "@/services/financial/financialCopy"

const Row = ({ label, value }: SummaryRow) => (
  <div className="flex justify-between gap-3 text-[13px]">
    <span className="text-sich-label">{label}</span>
    <span className="text-right font-semibold text-sich-heading">{value}</span>
  </div>
)

const RowsSkeleton = ({ count }: { count: number }) => (
  <>
    {Array.from({ length: count }, (_, index) => (
      <div key={index} className="flex justify-between gap-3">
        <Skeleton className="h-3.5 w-28" />
        <Skeleton className="h-3.5 w-20" />
      </div>
    ))}
  </>
)

type FinancialMonthSummaryProps = {
  /** null while loading */
  summary: MonthSummary | null
  className?: string
}

/** Label/value breakdown of the selected month. */
const FinancialMonthSummary = ({ summary, className }: FinancialMonthSummaryProps) => (
  <Card className={cn("flex flex-col gap-3 border border-sich-border p-5.5", className)}>
    <h2 className="mb-1 text-[15px] font-medium text-sich-heading">{FINANCIAL_COPY.monthSummaryTitle}</h2>

    <div aria-busy={!summary} className="flex flex-col gap-3">
      {summary ? summary.revenue.map((row) => <Row key={row.label} {...row} />) : <RowsSkeleton count={3} />}
      <Separator className="bg-sich-border" />
      {summary ? summary.outlook.map((row) => <Row key={row.label} {...row} />) : <RowsSkeleton count={2} />}
    </div>
  </Card>
)

export default FinancialMonthSummary
