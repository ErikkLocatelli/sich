import { Link } from "react-router-dom"

import type { DayBlocks } from "@/hooks/schedule/useAgenda"
import { appointmentPath } from "@/services/schedule/appointmentDetails"
import { toMinutes, type TimelineBlock } from "@/services/schedule/dayTimeline"
import { cn } from "@/lib/utils"
import { timelineBlockLabels, timelineBlockStyles } from "./timelineBlockStyles"

const SLOT_MINUTES = 15
const SLOTS_PER_HOUR = 60 / SLOT_MINUTES
const FIRST_SLOT_ROW = 2

type Range = { start: number; end: number }

const hourRange = (week: DayBlocks[]): Range | null => {
  const blocks = week.flatMap(({ blocks }) => blocks)
  if (blocks.length === 0) return null

  const start = Math.min(...blocks.map((block) => toMinutes(block.start)))
  const end = Math.max(...blocks.map((block) => toMinutes(block.end)))
  return { start: Math.floor(start / 60) * 60, end: Math.ceil(end / 60) * 60 }
}

const slotRow = (minutes: number, range: Range) => (minutes - range.start) / SLOT_MINUTES + FIRST_SLOT_ROW

const hourLabel = (minutes: number) => `${(minutes / 60).toString().padStart(2, "0")}:00`

const GridBlock = ({ block, compact }: { block: TimelineBlock; compact: boolean }) => {
  const className = cn("flex min-h-0 flex-col overflow-hidden rounded-[12px] border px-2 py-1.5 my-0.5", compact && "rounded-[8px] p-0", timelineBlockStyles[block.type])

  if (block.type !== "appointment") {
    const label = `${timelineBlockLabels[block.type]} · ${block.start}–${block.end}`
    return (
      <div className={className} title={label}>
        {compact
          ? <span className="sr-only">{label}</span>
          : <span className="truncate text-[10px] font-semibold text-sich-label">{timelineBlockLabels[block.type]}</span>}
      </div>
    )
  }

  return (
    <Link to={appointmentPath(block.appointment.id)} className={cn(className, "hover:bg-sich-magenta/10")}>
      <strong className="truncate text-[11px] font-bold text-(--sich-primary)">{block.appointment.customerName}</strong>
      <span className="truncate text-[10px] text-(--sich-primary)/80">
        {block.appointment.items.map((item) => item.name).join(" + ")}
      </span>
      <span className="truncate text-[10px] text-sich-label">{block.start}–{block.end}</span>
    </Link>
  )
}

type WeekGridProps = {
  week: DayBlocks[]
  selectedDate?: string
  /** Narrow columns: no dates in the header and no text inside non-appointment blocks */
  compact?: boolean
  className?: string
}

const WeekGrid = ({ week, selectedDate, compact = false, className }: WeekGridProps) => {
  const range = hourRange(week)

  if (!range) {
    return <span className={cn("block text-[11px] text-black/20", className)}>Semana sem expediente cadastrado</span>
  }

  const slots = (range.end - range.start) / SLOT_MINUTES
  const hours = Array.from({ length: (range.end - range.start) / 60 }, (_, index) => range.start + index * 60)

  return (
    <div
      className={cn("grid grid-cols-[max-content_repeat(7,minmax(0,1fr))] gap-x-2", compact && "gap-x-1", className)}
      style={{ gridTemplateRows: `auto repeat(${slots}, 1rem)` }}
    >
      {week.map(({ day }, index) => (
        <span
          key={day.value}
          className={cn(
            "pb-2 text-center text-[12px] font-semibold text-[#3a3550]",
            day.value === selectedDate && "text-sich-magenta"
          )}
          style={{ gridColumn: index + 2, gridRow: 1 }}
        >
          {compact ? day.label : `${day.label} ${day.day}`}
        </span>
      ))}

      {hours.map((hour) => {
        const row = `${slotRow(hour, range)} / span ${SLOTS_PER_HOUR}`
        return [
          <span key={`label-${hour}`} className="self-start text-right text-[11px] leading-none text-sich-label -translate-y-1/2" style={{ gridColumn: 1, gridRow: row }}>
            {hourLabel(hour)}
          </span>,
          <div key={`line-${hour}`} aria-hidden="true" className="border-t border-sich-border/70" style={{ gridColumn: "2 / -1", gridRow: row }} />,
        ]
      })}

      {week.flatMap(({ day, blocks }, index) =>
        blocks.map((block) => (
          <div
            key={`${day.value}-${block.type}-${block.start}`}
            className="flex min-h-0 flex-col *:flex-1"
            style={{
              gridColumn: index + 2,
              gridRow: `${slotRow(toMinutes(block.start), range)} / ${slotRow(toMinutes(block.end), range)}`,
            }}
          >
            <GridBlock block={block} compact={compact} />
          </div>
        ))
      )}
    </div>
  )
}

export default WeekGrid
