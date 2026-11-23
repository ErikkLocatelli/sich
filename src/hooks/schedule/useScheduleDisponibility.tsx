import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { apiFetch, requireToken } from "../../api/client"
import { queryKeys } from "../../api/queryKeys"
import { useWorkingHours, type DaySchedule, type IntervalError, type TimeInterval } from "./useWorkingHours"
import type { DayBlocks } from "./useAgenda"
import { toast } from "../../components/ui/toast"
import { WORKING_HOURS_PUT, type WorkingHoursRequest } from "../../api/schedule/workingHours"
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
  const queryClient = useQueryClient()
  const workingHours = useWorkingHours()
  const { days, errors, isValid, loaded, getPayload } = workingHours

  const save = useMutation({
    mutationFn: (body: WorkingHoursRequest) => apiFetch<unknown>(WORKING_HOURS_PUT(requireToken(), body)),
    meta: { errorMessage: "Não foi possível salvar a disponibilidade." },
    onSuccess: (_response, body) => {
      // The saved payload is the new state: no need to fetch it back
      queryClient.setQueryData(queryKeys.provider.workingHours, body.intervals)
      // Working, booked and free minutes depend on the schedule
      queryClient.invalidateQueries({ queryKey: queryKeys.provider.appointments.summaries })
      toast.add({ type: "success", description: "Sua disponibilidade foi salva." })
    },
  })
  const saving = save.isPending

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isValid || !loaded) return

    save.mutate(getPayload())
  }

  return {
    ...workingHours,
    saving,
    canSubmit: isValid && loaded && !saving,
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
