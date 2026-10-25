type ScheduleAppointmentProps = {
  time: string
} & (
  | {
      variant?: "default"
      clientName: string
      service: string
    }
  | {
      variant: "break"
    }
)

const ScheduleAppointment = ({
  variant = "default",
  clientName,
  service,
  time,
}: ScheduleAppointmentProps) => {
  const isBreak = variant === "break"

  return (
    <>
      <span className="pt-3 text-[11px] font-medium text-sich-label">{time}</span>
      <div
        className={`flex flex-col gap-0.5 rounded-[12px] border p-3 ${
          isBreak
            ? "border-sich-border bg-sich-surface"
            : "border-sich-magenta/30 bg-sich-magenta/5"
        }`}
      >
        <strong
          className={`text-[11px] font-bold ${
            isBreak ? "text-sich-label" : "text-(--sich-primary)"
          }`}
        >
          {isBreak ? "Almoço" : clientName}
        </strong>
        <span className={`text-[10px] ${isBreak ? "text-sich-label" : "text-(--sich-primary)"}`}>
          {isBreak ? " " : service}
        </span>
      </div>
    </>
  )
}

export default ScheduleAppointment
