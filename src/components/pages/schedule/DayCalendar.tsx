import SubTitle from "@/components/commons/SubTitle"
import ScheduleAppointment from "@/components/pages/schedule/ScheduleAppointment"
import type { CalendarView } from "../../../pages/schedule/ScheduleProvider"

const DayCalendar = ({ day, className }: { day: CalendarView; className?: string }) => {
  return (
    <section className={`w-full ${className || ""}`}>
      <SubTitle text={`${day.label} ${day.value}`} />
      <div className="grid grid-cols-[1fr_max-content] gap-2 pr-10">
        <ScheduleAppointment
          time="09:00"
          clientName="Marina R."
          service="Mani + Pedi"
        />
         <ScheduleAppointment
          time="11:00"
          clientName="Marina C."
          service="Mani + Alopecia"
        />
        <ScheduleAppointment variant="break" time="12:00" />
        <ScheduleAppointment
          time="13:00"
          clientName="Marina R."
          service="Mani + Pedi"
        />
         <ScheduleAppointment
          time="15:00"
          clientName="Marina C."
          service="Mani + Alopecia"
        />
      </div>
    </section>
  )
}

export default DayCalendar
