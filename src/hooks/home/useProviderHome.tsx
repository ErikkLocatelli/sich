import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import type { AppointmentResponse } from "../../api/schedule/appointments"
import type { WorkingInterval } from "../../api/schedule/workingHours"
import { agendaSummaryQuery, appointmentsQuery, workingHoursQuery } from "../../api/schedule/scheduleQueries"
import { isoWeekday, periodFor, toIsoDate, toLocalDateTime } from "../../services/schedule/agendaDates"
import { greetingFor, shortDateLabel, remainingCountLabel } from "../../services/home/providerHome"

const UPCOMING_LIMIT = 3

export type EmptyDayState = "rest" | "ended" | "empty"

/** Why today has nothing left to show; null while the working hours are loading. */
const emptyDayState = (workingHours: WorkingInterval[] | undefined, now: Date): EmptyDayState | null => {
  if (!workingHours) return null

  const todayIntervals = workingHours.filter((interval) => interval.weekday === isoWeekday(now))
  if (todayIntervals.length === 0) return "rest"

  // "HH:mm" strings compare correctly as text
  const lastEnd = todayIntervals.reduce((latest, interval) => (interval.end > latest ? interval.end : latest), "00:00")
  return toLocalDateTime(now).slice(11) >= lastEnd ? "ended" : "empty"
}

/** Provider home: today's and this week's summaries and the next appointments of today. */
export const useProviderHome = () => {
  const [now] = useState(() => new Date())
  const today = toIsoDate(now)
  const week = periodFor("week", now)

  // Same keys the agenda uses for the day view and the current week, so opening it next is a cache hit
  const { data: todaySummary } = useQuery(agendaSummaryQuery(today, today))
  const { data: weekSummary } = useQuery(agendaSummaryQuery(week.from, week.to))
  const { data: weekAppointments } = useQuery(appointmentsQuery(week.from, week.to))
  const { data: workingHours } = useQuery(workingHoursQuery())

  const todayAppointments: AppointmentResponse[] | null =
    weekAppointments?.filter((appointment) => appointment.startAt.startsWith(today)) ?? null

  const nowLabel = toLocalDateTime(now)
  // Not finished yet: an appointment in progress still counts as remaining
  const remaining = todayAppointments?.filter(
    (appointment) => appointment.status === "SCHEDULED" && appointment.endAt > nowLabel
  ) ?? null
  const upcoming = (remaining ?? [])
    .slice(0, UPCOMING_LIMIT)

  return {
    todaySummary: todaySummary ?? null,
    weekSummary: weekSummary ?? null,
    upcoming,
    emptyDay: emptyDayState(workingHours, now),
    greeting: greetingFor(now),
    remainingCount: remainingCountLabel(remaining?.length),
    todayLabel: shortDateLabel(now),
  }
}

export type ProviderHomeState = ReturnType<typeof useProviderHome>
