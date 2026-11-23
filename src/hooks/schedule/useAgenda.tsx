import { useMemo } from "react"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

import type { AppointmentResponse } from "../../api/schedule/appointments"
import type { WorkingInterval } from "../../api/schedule/workingHours"
import { agendaSummaryQuery, appointmentsQuery, workingHoursQuery } from "../../api/schedule/scheduleQueries"
import { isoWeekday, parseIsoDate, periodFor, weekDays, type AgendaView, type WeekDay } from "../../services/schedule/agendaDates"
import { buildDayTimeline, type TimelineBlock } from "../../services/schedule/dayTimeline"

export type DayBlocks = {
  day: WeekDay
  blocks: TimelineBlock[]
}

const NO_APPOINTMENTS: AppointmentResponse[] = []
const NO_INTERVALS: WorkingInterval[] = []

export const useAgenda = (selectedDate: string, view: AgendaView) => {
  const date = parseIsoDate(selectedDate)
  const weekPeriod = periodFor("week", date)
  const period = periodFor(view, date)

  const workingHoursResult = useQuery(workingHoursQuery())
  // Keyed by week: going back to a week already seen is served from cache
  const appointmentsResult = useQuery(appointmentsQuery(weekPeriod.from, weekPeriod.to))
  // The previous summary stays on screen while the next period loads
  const summaryResult = useQuery({ ...agendaSummaryQuery(period.from, period.to), placeholderData: keepPreviousData })

  const workingHours = workingHoursResult.data ?? NO_INTERVALS
  const appointments = appointmentsResult.data ?? NO_APPOINTMENTS

  const weekBlocks = useMemo<DayBlocks[]>(() =>
    weekDays(parseIsoDate(weekPeriod.from)).map((day) => {
      const weekday = isoWeekday(parseIsoDate(day.value))
      const dayIntervals = workingHours.filter((interval) => interval.weekday === weekday)
      const dayAppointments = appointments.filter((appointment) => appointment.startAt.startsWith(day.value))
      return { day, blocks: buildDayTimeline(dayIntervals, dayAppointments) }
    }),
  [workingHours, appointments, weekPeriod.from])

  const blocks = weekBlocks.find(({ day }) => day.value === selectedDate)?.blocks ?? []

  return {
    blocks,
    week: weekBlocks,
    summary: summaryResult.data ?? null,
    loading: appointmentsResult.isFetching,
    loaded: !workingHoursResult.isPending && !appointmentsResult.isPending,
  }
}
