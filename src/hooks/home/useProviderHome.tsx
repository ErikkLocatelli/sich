import { useEffect, useState } from "react"

import useFetch from "../useFetch"
import { toast } from "../../components/ui/toast"
import {
  APPOINTMENTS_GET,
  APPOINTMENTS_SUMMARY_GET,
  type AgendaSummaryResponse,
  type AppointmentResponse
} from "../../api/schedule/appointments"
import { periodFor, toIsoDate, toLocalDateTime } from "../../services/schedule/agendaDates"

const UPCOMING_LIMIT = 3

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

    loadSummary(today, today, setTodaySummary)
    loadSummary(week.from, week.to, setWeekSummary)
    loadTodayAppointments()
  }, [request, now])

  const nowLabel = toLocalDateTime(now)
  const upcoming = todayAppointments
    .filter((appointment) => appointment.status === "SCHEDULED" && appointment.endAt > nowLabel)
    .slice(0, UPCOMING_LIMIT)

  return { now, todaySummary, weekSummary, upcoming }
}
