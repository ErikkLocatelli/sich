type SegmentedProgressProps = {
  total: number
  value: number
  segments?: number
}

const SegmentedProgress = ({ total, value, segments = 5 }: SegmentedProgressProps) => {
  const safeTotal = Math.max(total, 0)
  const safeValue = Math.min(Math.max(value, 0), safeTotal)
  const percentage = safeTotal === 0 ? 0 : (safeValue / safeTotal) * 100
  const segmentSize = 100 / segments
  const percentageLabel = Number.isInteger(percentage) ? `${percentage}%` : `${percentage.toFixed(1)}%`

  return (
    <div aria-label={`${percentageLabel} dos horários preenchidos`}>
      <div className="flex flex-row items-center justify-between">
        <span className="text-[13px] text-sich-label">Horários preenchidos</span>
        <span className="text-[13px] font-semibold">{percentageLabel}</span>
      </div>

      <div className="mt-3 flex flex-row items-center justify-between gap-2">
        {Array.from({ length: segments }, ( _,index) => {
          const fillPercentage = Math.min(Math.max(percentage - index * segmentSize, 0), segmentSize) / segmentSize * 100

          return (
            <span className="h-3 flex-1 overflow-hidden rounded-full bg-muted" key={index}>
              <span
                className="block h-full rounded-full bg-primary"
                style={{ width: `${fillPercentage}%` }}
              />
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default SegmentedProgress
