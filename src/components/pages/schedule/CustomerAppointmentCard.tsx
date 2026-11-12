import { CalendarDays, Clock, MapPin, type LucideIcon } from "lucide-react"

import type { AppointmentResponse } from "@/api/schedule/appointments"
import Card from "@/components/commons/Card"
import AppointmentStatusBadge from "@/components/pages/schedule/AppointmentStatusBadge"
import { appointmentServices } from "@/services/home/customerHome"
import { shortDateLabel } from "@/services/schedule/agendaDates"
import { appointmentState } from "@/services/schedule/appointmentDetails"
import { shortAddress } from "@/services/schedule/customerSchedule"

type CustomerAppointmentCardProps = {
  appointment: AppointmentResponse
  /** Local "yyyy-MM-ddTHH:mm", used to tell done from scheduled */
  now: string
  /** "stack" (mobile): info rows stacked. "row" (desktop): date tile on the left, info on one line. */
  variant?: "stack" | "row"
}

const InfoRow = ({ icon: Icon, text }: { icon: LucideIcon; text: string }) => (
  <span className="flex min-w-0 items-center gap-1.5 text-sich-label">
    <Icon className="size-3.5 shrink-0 text-sich-magenta" aria-hidden="true" />
    <span className="truncate">{text}</span>
  </span>
)

const InfoRows = ({ appointment }: { appointment: AppointmentResponse }) => {
  const address = shortAddress(appointment.providerAddress)

  return (
    <>
      <InfoRow icon={CalendarDays} text={shortDateLabel(appointment.startAt.slice(0, 10))} />
      <InfoRow icon={Clock} text={appointment.startAt.slice(11, 16)} />
      {address && <InfoRow icon={MapPin} text={address} />}
    </>
  )
}

/** "14" over "MAI", from the appointment start. */
const DateTile = ({ startAt }: { startAt: string }) => {
  const [day, month] = shortDateLabel(startAt.slice(0, 10)).split(", ")[1].split(" ")

  return (
    <div className="flex w-16 shrink-0 flex-col items-center rounded-[14px] bg-[#FDE7F0] py-2.5 text-(--sich-primary)">
      <span className="text-[20px] leading-5 font-bold">{day.padStart(2, "0")}</span>
      <span className="text-[10px] font-semibold uppercase">{month}</span>
    </div>
  )
}

const RowCard = ({ appointment, now }: Omit<CustomerAppointmentCardProps, "variant">) => (
  <Card className="flex items-center gap-4.5 border border-sich-border p-5">
    <DateTile startAt={appointment.startAt} />
    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
      <div className="flex min-w-0 items-center gap-2">
        <span className="truncate text-[15px] font-semibold text-sich-heading">{appointmentServices(appointment)}</span>
        <AppointmentStatusBadge state={appointmentState(appointment, now)} />
      </div>
      <span className="truncate text-[12px] text-sich-label">com {appointment.providerName}</span>
      <div className="flex flex-wrap gap-x-4.5 gap-y-1 pt-2 text-[12px]">
        <InfoRows appointment={appointment} />
      </div>
    </div>
  </Card>
)

const StackCard = ({ appointment, now }: Omit<CustomerAppointmentCardProps, "variant">) => (
  <Card className="flex flex-col gap-3 border border-sich-border p-3.5">
    <div className="flex items-start justify-between gap-3">
      <div className="flex min-w-0 flex-col">
        <span className="truncate text-[14px] font-semibold text-sich-heading">{appointmentServices(appointment)}</span>
        <span className="truncate text-[11px] text-sich-label">com {appointment.providerName}</span>
      </div>
      <AppointmentStatusBadge state={appointmentState(appointment, now)} />
    </div>

    <div className="flex flex-col gap-1.5 text-[11px]">
      <InfoRows appointment={appointment} />
    </div>
  </Card>
)

/** One customer appointment: services, provider, status, date, time and address. */
const CustomerAppointmentCard = ({ variant = "stack", ...props }: CustomerAppointmentCardProps) =>
  variant === "row" ? <RowCard {...props} /> : <StackCard {...props} />

export default CustomerAppointmentCard
