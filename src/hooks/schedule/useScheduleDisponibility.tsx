import { useNavigate } from "react-router-dom"

import useFetch from "../useFetch"
import { useWorkingHours, type DaySchedule, type IntervalError, type TimeInterval } from "./useWorkingHours"
import type { DayBlocks } from "./useAgenda"
import { toast } from "../../components/ui/toast"
import { WORKING_HOURS_PUT } from "../../api/schedule/workingHours"
import { isoWeekday, parseIsoDate, weekDays } from "../../services/schedule/agendaDates"
import { buildDayTimeline } from "../../services/schedule/dayTimeline"

const isValidInterval = (error: IntervalError | undefined) => !error?.start && !error?.end

/** Week preview of the schedule being edited; invalid intervals are left out until fixed. */
const buildPreview = (days: DaySchedule[], errors: Record<number, IntervalError[]>): DayBlocks[] =>
  weekDays(new Date()).map((day) => {
    const schedule = days.find((item) => item.weekday === isoWeekday(parseIsoDate(day.value)))
    if (!schedule?.enabled) return { day, blocks: [] }

    const intervals = schedule.intervals.filter((_, index) => isValidInterval(errors[schedule.weekday]?.[index]))
    return { day, blocks: buildDayTimeline(intervals, []) }
  })

/** State and actions shared by the mobile and desktop disponibility screens. */
export const useScheduleDisponibility = () => {
  const navigate = useNavigate()
  const { request, loading: saving } = useFetch()
  const workingHours = useWorkingHours()
  const { days, errors, isValid, loading: loadingWorkingHours, getPayload } = workingHours

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    const token = window.localStorage.getItem("token")
    if (!token || !isValid) return

    const { url, options } = WORKING_HOURS_PUT(token, getPayload())
    const { response, json } = await request(url, options)

    if (!response?.ok) {
      toast.add({ type: "error", description: json?.message ?? "Não foi possível salvar a disponibilidade." })
      return
    }

    toast.add({ type: "success", description: "Sua disponibilidade foi salva." })
  }

  return {
    ...workingHours,
    saving,
    canSubmit: isValid && !saving && !loadingWorkingHours,
    handleSubmit,
    cancel: () => navigate("/schedule"),
    preview: buildPreview(days, errors),
    /** Props for one day row, shared by the mobile and desktop day components */
    dayProps: (day: DaySchedule) => ({
      day,
      errors: errors[day.weekday],
      canAddInterval: workingHours.canAddInterval(day),
      onToggle: (enabled: boolean) => workingHours.toggleDay(day.weekday, enabled),
      onChangeInterval: (index: number, field: keyof TimeInterval, value: string) =>
        workingHours.updateInterval(day.weekday, index, field, value),
      onAddInterval: () => workingHours.addInterval(day.weekday),
      onRemoveInterval: () => workingHours.removeLastInterval(day.weekday),
    }),
  }
}

export type ScheduleDisponibilityState = ReturnType<typeof useScheduleDisponibility>
