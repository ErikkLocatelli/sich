import type { AppointmentResponse } from "@/api/schedule/appointments"
import ScheduleHistory from "./ScheduleHistory"
import ScheduleHistorySkeleton from "./ScheduleHistorySkeleton"

const ScheduleHistoryList = ({ history, loaded }: { history: AppointmentResponse[]; loaded: boolean }) => {
  if (!loaded) return <ScheduleHistorySkeleton />

  if (history.length === 0) {
    return <span className="block mt-3 text-[11px] text-black/20">Nenhum atendimento realizado</span>
  }

  return (
    <div className="divide-y divide-gray-200">
      {history.map((appointment) => (
        <ScheduleHistory key={appointment.id} appointment={appointment} />
      ))}
    </div>
  )
}

export default ScheduleHistoryList
