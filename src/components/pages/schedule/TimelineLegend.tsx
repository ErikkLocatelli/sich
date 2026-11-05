import type { TimelineBlock } from "@/services/schedule/dayTimeline"
import { cn } from "@/lib/utils"
import { timelineBlockLabels, timelineBlockStyles } from "./timelineBlockStyles"

const TYPES = Object.keys(timelineBlockStyles) as TimelineBlock["type"][]

type TimelineLegendProps = {
  types?: TimelineBlock["type"][]
  className?: string
}

const TimelineLegend = ({ types = TYPES, className }: TimelineLegendProps) => (
  <ul className={cn("flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-sich-label", className)}>
    {types.map((type) => (
      <li key={type} className="flex items-center gap-1.5">
        <span aria-hidden="true" className={cn("size-3 rounded-[4px] border", timelineBlockStyles[type])} />
        {type === "free" ? "Horário livre" : timelineBlockLabels[type]}
      </li>
    ))}
  </ul>
)

export default TimelineLegend
