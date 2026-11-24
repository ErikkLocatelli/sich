import { SlideToggle } from "@/components/form/SlideToggle"
import { cn } from "@/lib/utils"
import { FINANCIAL_COPY } from "@/services/financial/financialCopy"

type FinancialMonthToggleProps = {
  labels: string[]
  selectedIndex: number
  onSelectedIndexChange: (index: number) => void
  className?: string
}

/** Month picker that drives the whole financial page. */
const FinancialMonthToggle = ({ labels, selectedIndex, onSelectedIndexChange, className }: FinancialMonthToggleProps) => {
  // SlideToggle needs at least two options
  const [first, second, ...rest] = labels.map((label) => ({ children: label }))
  if (!first || !second) return null

  return (
    <SlideToggle
      variant="outline"
      className={cn("h-10 bg-sich-surface", className)}
      options={[first, second, ...rest]}
      selectedIndex={selectedIndex}
      onSelectedIndexChange={onSelectedIndexChange}
      aria-label={FINANCIAL_COPY.monthToggleLabel}
    />
  )
}

export default FinancialMonthToggle
