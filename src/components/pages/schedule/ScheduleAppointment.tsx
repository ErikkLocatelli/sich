import type { TimelineBlock } from "@/services/schedule/dayTimeline"

const containerStyles: Record<TimelineBlock["type"], string> = {
  appointment: "border-sich-magenta/30 bg-sich-magenta/5",
  break: "border-sich-border bg-sich-surface",
  free: "border-dashed border-sich-border bg-transparent",
}

const ScheduleAppointment = ({ block }: { block: TimelineBlock }) => {
  const period = `${block.start}–${block.end}`

  return (
    <>
      <span className="pt-3 text-[11px] font-medium text-sich-label">{block.start}</span>
      <div className={`flex flex-col gap-0.5 rounded-[12px] border p-3 ${containerStyles[block.type]}`}>
        {block.type === "appointment" ? (
          <>
            <strong className="text-[11px] font-bold text-(--sich-primary)">{block.appointment.customerName}</strong>
            <span className="text-[10px] text-(--sich-primary)">
              {block.appointment.items.map((item) => item.name).join(" + ")}
            </span>
            <span className="text-[10px] text-sich-label">{period}</span>
          </>
        ) : (
          <span className="text-[11px] text-sich-label">
            <strong className="font-bold">{block.type === "free" ? "Livre" : "Pausa"}</strong> · {period}
          </span>
        )}
      </div>
    </>
  )
}

export default ScheduleAppointment
