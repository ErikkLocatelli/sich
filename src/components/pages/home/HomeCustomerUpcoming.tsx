import { Link } from "react-router-dom"

import type { AppointmentResponse } from "@/api/schedule/appointments"
import Avatar from "@/components/commons/Avatar"
import Card from "@/components/commons/Card"
import LabelLink from "@/components/commons/LabelLink"
import MobileLink from "@/components/commons/MobileLink"
import AppointmentStatusBadge from "@/components/pages/schedule/AppointmentStatusBadge"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { appointmentServices, CUSTOMER_HOME_COPY, HOME_UPCOMING_LIMIT } from "@/services/home/customerHome"
import { appointmentPath } from "@/services/schedule/appointmentDetails"
import { shortDateTime } from "@/services/schedule/agendaDates"

type HomeCustomerUpcomingProps = {
  upcoming: AppointmentResponse[]
  loaded: boolean
  className?: string
}

const UpcomingItem = ({ appointment }: { appointment: AppointmentResponse }) => (
  <Link to={appointmentPath(appointment.id)} className="flex items-center gap-3.5 py-3.5 transition-opacity hover:opacity-80">
    {/* TODO(backend): AppointmentResponse has no provider photo yet, so Avatar falls back to initials */}
    <Avatar name={appointment.providerName} className="size-10.5 shrink-0 rounded-[14px] bg-sich-gradient [&_span]:text-[13px]" />
    <div className="flex min-w-0 flex-1 flex-col">
      <span className="truncate text-[14px] font-semibold text-sich-heading">{appointmentServices(appointment)}</span>
      <span className="truncate text-[12px] text-sich-label">{shortDateTime(appointment.startAt)}</span>
    </div>
    <AppointmentStatusBadge state="scheduled" />
  </Link>
)

const UpcomingSkeleton = () => (
  <div className="flex flex-col" aria-busy="true" aria-label="Carregando próximos atendimentos">
    {Array.from({ length: HOME_UPCOMING_LIMIT }, (_, index) => (
      <div key={index} className="flex items-center gap-3.5 py-3.5">
        <Skeleton className="size-10.5 shrink-0 rounded-[14px]" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-3.5 w-28" />
          <Skeleton className="h-2.5 w-24" />
        </div>
      </div>
    ))}
  </div>
)

const UpcomingEmpty = () => (
  <div className="flex flex-col items-center gap-1 py-6 text-center">
    <span className="text-[13px] font-medium text-sich-heading">{CUSTOMER_HOME_COPY.upcomingEmptyTitle}</span>
    <LabelLink label={CUSTOMER_HOME_COPY.upcomingEmptyAction} href="/search" className="text-[12px]" />
  </div>
)

const UpcomingContent = ({ upcoming, loaded }: Omit<HomeCustomerUpcomingProps, "className">) => {
  if (!loaded) return <UpcomingSkeleton />
  if (upcoming.length === 0) return <UpcomingEmpty />

  return (
    <div className="flex flex-col divide-y divide-sich-border">
      {upcoming.map((appointment) => <UpcomingItem key={appointment.id} appointment={appointment} />)}
    </div>
  )
}

/** The customer's next scheduled appointments, linking to their details. */
const HomeCustomerUpcoming = ({ upcoming, loaded, className }: HomeCustomerUpcomingProps) => (
  <Card className={cn("flex flex-col gap-1 p-5.5", className)}>
    <MobileLink title="Próximos atendimentos" link="Agenda ›" href="/schedule" />
    <UpcomingContent upcoming={upcoming} loaded={loaded} />
  </Card>
)

export default HomeCustomerUpcoming
