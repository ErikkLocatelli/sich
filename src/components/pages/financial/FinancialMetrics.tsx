import { ArrowDown, ArrowUp, CalendarCheck, CalendarX, ChartColumn, Wallet, type LucideIcon } from "lucide-react"

import Card from "@/components/commons/Card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import type { FinancialMetric, MetricHint, MetricId } from "@/services/financial/financialSummary"

const METRIC_ICONS: Record<MetricId, LucideIcon> = {
  gross: Wallet,
  ticket: ChartColumn,
  completed: CalendarCheck,
  canceled: CalendarX,
}

const HINT_STYLES: Record<MetricHint["tone"], { icon: LucideIcon | null; className: string }> = {
  up: { icon: ArrowUp, className: "font-semibold text-(--sich-green)" },
  down: { icon: ArrowDown, className: "font-semibold text-destructive" },
  neutral: { icon: null, className: "text-sich-label" },
}

const cardClass = "flex flex-col gap-1 border border-sich-border p-4"

const iconBoxClass = "mb-2 flex size-9 items-center justify-center rounded-[12px] bg-[#fde7f0] text-sich-magenta"

const Hint = ({ hint }: { hint: MetricHint }) => {
  const { icon: Icon, className } = HINT_STYLES[hint.tone]

  return (
    <span className={cn("flex items-center gap-0.5 text-[11px]", className)}>
      {Icon && <Icon aria-hidden="true" className="size-3 shrink-0" />}
      {hint.text}
    </span>
  )
}

const MetricCard = ({ metric }: { metric: FinancialMetric }) => {
  const Icon = METRIC_ICONS[metric.id]

  return (
    <Card className={cardClass}>
      <span aria-hidden="true" className={iconBoxClass}>
        <Icon className="size-4" />
      </span>
      <span className="text-[20px] leading-tight font-bold tracking-[-0.5px] text-sich-heading">{metric.value}</span>
      <span className="text-[11px] text-sich-label">{metric.label}</span>
      {metric.hint && <Hint hint={metric.hint} />}
    </Card>
  )
}

const MetricSkeleton = () => (
  <Card className={cardClass}>
    <Skeleton className="mb-2 size-9 rounded-[12px]" />
    <Skeleton className="h-6 w-20" />
    <Skeleton className="h-3 w-24" />
  </Card>
)

type FinancialMetricsProps = {
  /** null while loading */
  metrics: FinancialMetric[] | null
  /** 2×2 on mobile, a single row on desktop */
  columns?: 2 | 4
  className?: string
}

const FinancialMetrics = ({ metrics, columns = 2, className }: FinancialMetricsProps) => (
  <div aria-busy={!metrics} className={cn("grid gap-3", columns === 4 ? "grid-cols-4 gap-4" : "grid-cols-2", className)}>
    {metrics
      ? metrics.map((metric) => <MetricCard key={metric.id} metric={metric} />)
      : Array.from({ length: 4 }, (_, index) => <MetricSkeleton key={index} />)}
  </div>
)

export default FinancialMetrics
