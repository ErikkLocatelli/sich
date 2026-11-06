import type { AppointmentResponse } from "@/api/schedule/appointments"
import type { EmptyDayState } from "@/hooks/home/useProviderHome"
import { cn } from "@/lib/utils"

import HomeSchedule from "./HomeSchedule"
import HomeScheduleEmpty from "./HomeScheduleEmpty"

type HomeScheduleListProps = {
  upcoming: AppointmentResponse[]
  emptyDay: EmptyDayState | null
  layout?: "stacked" | "row"
  className?: string
}

const HomeScheduleList = ({ upcoming, emptyDay, layout, className }: HomeScheduleListProps) => (
  <div className={cn("flex flex-col gap-4", className)}>
    {/* Waits for the working hours so the empty state doesn't flash while loading */}
    {upcoming.length > 0
      ? upcoming.map((appointment) => <HomeSchedule key={appointment.id} appointment={appointment} layout={layout} />)
      : emptyDay && <HomeScheduleEmpty state={emptyDay} />}
  </div>
)

export default HomeScheduleList
