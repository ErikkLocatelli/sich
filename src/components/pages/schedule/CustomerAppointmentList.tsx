import type { AppointmentResponse } from "@/api/schedule/appointments"
import type { ScheduleCustomerTab } from "@/services/schedule/customerSchedule"

import CustomerAppointmentCard from "./CustomerAppointmentCard"
import CustomerAppointmentsEmpty from "./CustomerAppointmentsEmpty"
import CustomerAppointmentsSkeleton from "./CustomerAppointmentsSkeleton"

type CustomerAppointmentListProps = {
  appointments: AppointmentResponse[]
  loaded: boolean
  tab: ScheduleCustomerTab
  now: string
  variant?: "stack" | "row"
  /** Set when the list is narrowed to one day, so the empty state says so */
  dayFilter?: string | null
}

/** Customer appointments with loading and empty states, shared by mobile and desktop. */
const CustomerAppointmentList = ({ appointments, loaded, tab, now, variant = "stack", dayFilter }: CustomerAppointmentListProps) => {
  if (!loaded) return <CustomerAppointmentsSkeleton />
  if (appointments.length === 0) return <CustomerAppointmentsEmpty tab={tab} filtered={Boolean(dayFilter)} />

  return (
    <div key={`${tab}-${dayFilter ?? "all"}`} className={`flex flex-col animateLeft ${variant === "row" ? "gap-3.5" : "gap-3"}`}>
      {appointments.map((appointment) => (
        <CustomerAppointmentCard key={appointment.id} appointment={appointment} now={now} variant={variant} />
      ))}
    </div>
  )
}

export default CustomerAppointmentList
