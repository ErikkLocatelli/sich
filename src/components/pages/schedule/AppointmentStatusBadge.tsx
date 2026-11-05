import type { AppointmentState } from "@/services/schedule/appointmentDetails"

const STATUS: Record<AppointmentState, { css: string; text: string }> = {
  scheduled: { css: "bg-[#FDE7F0] text-[#A01F6B]", text: "Confirmado" },
  done: { css: "bg-[#EAFAF0] text-[#15803D]", text: "Concluído" },
  canceled: { css: "bg-sich-surface text-sich-label", text: "Cancelado" },
}

const AppointmentStatusBadge = ({ state }: { state: AppointmentState }) => {
  const { css, text } = STATUS[state]

  return <span className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-semibold uppercase ${css}`}>{text}</span>
}

export default AppointmentStatusBadge
