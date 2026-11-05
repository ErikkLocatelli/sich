import { Link } from "react-router-dom"

import type { TimelineBlock } from "@/services/schedule/dayTimeline"
import { appointmentPath } from "@/services/schedule/appointmentDetails"

const containerStyles: Record<TimelineBlock["type"], string> = {
  appointment: "border-sich-magenta/30 bg-sich-magenta/5",
  break: "border-sich-border bg-sich-surface",
  free: "border-dashed border-sich-border bg-transparent",
}

const ScheduleAppointment = ({ block }: { block: TimelineBlock }) => {
  const period = `${block.start}–${block.end}`
  const containerClass = `flex flex-col gap-0.5 rounded-[12px] border p-3 ${containerStyles[block.type]}`

  return (
    <>
      <span className="pt-3 text-[11px] font-medium text-sich-label">{block.start}</span>
      {block.type === "appointment" ? (
        <Link to={appointmentPath(block.appointment.id)} className={`${containerClass} hover:bg-sich-magenta/10`}>
          <strong className="text-[11px] font-bold text-(--sich-primary)">{block.appointment.customerName}</strong>
          <span className="text-[10px] text-(--sich-primary)">
            {block.appointment.items.map((item) => item.name).join(" + ")}
          </span>
          <span className="text-[10px] text-sich-label">{period}</span>
        </Link>
      ) : (
        <div className={containerClass}>
          <span className="text-[11px] text-sich-label">
            <strong className="font-bold">{block.type === "free" ? "Livre" : "Pausa"}</strong> · {period}
          </span>
        </div>
      )}
    </>
  )
}

export default ScheduleAppointment
