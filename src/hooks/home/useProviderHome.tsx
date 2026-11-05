import { useEffect, useState } from "react"

import useFetch from "../useFetch"
import { toast } from "../../components/ui/toast"
import {
  APPOINTMENTS_GET,
  APPOINTMENTS_SUMMARY_GET,
  type AgendaSummaryResponse,
  type AppointmentResponse
} from "../../api/schedule/appointments"
import { WORKING_HOURS_GET, type WorkingInterval } from "../../api/schedule/workingHours"
import { isoWeekday, periodFor, toIsoDate, toLocalDateTime } from "../../services/schedule/agendaDates"

const UPCOMING_LIMIT = 3

export type EmptyDayState = "rest" | "ended" | "empty"

/** Why today has nothing left to show; null while the working hours are loading. */
const emptyDayState = (workingHours: WorkingInterval[] | null, now: Date): EmptyDayState | null => {
  if (!workingHours) return null

  const todayIntervals = workingHours.filter((interval) => interval.weekday === isoWeekday(now))
  if (todayIntervals.length === 0) return "rest"

  // "HH:mm" strings compare correctly as text
  const lastEnd = todayIntervals.reduce((latest, interval) => (interval.end > latest ? interval.end : latest), "00:00")
  return toLocalDateTime(now).slice(11) >= lastEnd ? "ended" : "empty"
}

const showError = (message: string | undefined, fallback: string) => {
  toast.add({ type: "error", description: message ?? fallback })
}

/** Provider home: today's and this week's summaries and the next appointments of today. */
export const useProviderHome = () => {
  const { request } = useFetch()
  const [now] = useState(() => new Date())
  const [todaySummary, setTodaySummary] = useState<AgendaSummaryResponse | null>(null)
  const [weekSummary, setWeekSummary] = useState<AgendaSummaryResponse | null>(null)
  const [todayAppointments, setTodayAppointments] = useState<AppointmentResponse[]>([])
  const [workingHours, setWorkingHours] = useState<WorkingInterval[] | null>(null)

  useEffect(() => {
    const token = window.localStorage.getItem("token")
    if (!token) return

    const today = toIsoDate(now)
    const week = periodFor("week", now)

    const loadSummary = async (from: string, to: string, onLoad: (summary: AgendaSummaryResponse) => void) => {
      const { url, options } = APPOINTMENTS_SUMMARY_GET(token, from, to)
      const { json, response } = await request(url, options)

      if (!response?.ok) {
        showError(json?.message, "Não foi possível carregar o resumo da agenda.")
        return
      }

      onLoad(json as AgendaSummaryResponse)
    }

    const loadTodayAppointments = async () => {
      const { url, options } = APPOINTMENTS_GET(token, today, today)
      const { json, response } = await request(url, options)

      if (!response?.ok) {
        showError(json?.message, "Não foi possível carregar a agenda de hoje.")
        return
      }

      setTodayAppointments(json as AppointmentResponse[])
    }

    const loadWorkingHours = async () => {
      const { url, options } = WORKING_HOURS_GET(token)
      const { json, response } = await request(url, options)

      if (!response?.ok) {
        showError(json?.message, "Não foi possível carregar seu expediente.")
        return
      }

      setWorkingHours(json as WorkingInterval[])
    }

    loadSummary(today, today, setTodaySummary)
    loadSummary(week.from, week.to, setWeekSummary)
    loadTodayAppointments()
    loadWorkingHours()
  }, [request, now])

  const nowLabel = toLocalDateTime(now)
  const upcoming = todayAppointments
    .filter((appointment) => appointment.status === "SCHEDULED" && appointment.endAt > nowLabel)
    .slice(0, UPCOMING_LIMIT)

  return { now, todaySummary, weekSummary, upcoming, emptyDay: emptyDayState(workingHours, now) }
}
