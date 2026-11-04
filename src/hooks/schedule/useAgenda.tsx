import { useEffect, useMemo, useState } from "react"

import useFetch from "../useFetch"
import { toast } from "../../components/ui/toast"
import {
  APPOINTMENTS_GET,
  APPOINTMENTS_SUMMARY_GET,
  type AgendaSummaryResponse,
  type AppointmentResponse
} from "../../api/schedule/appointments"
import { WORKING_HOURS_GET, type WorkingInterval } from "../../api/schedule/workingHours"
import { isoWeekday, parseIsoDate, periodFor, type AgendaView } from "../../services/schedule/agendaDates"
import { buildDayTimeline } from "../../services/schedule/dayTimeline"

const showError = (message: string | undefined, fallback: string) => {
  toast.add({ type: "error", description: message ?? fallback })
}

/**
 * Provider agenda for the week of `selectedDate`: the week's appointments and the
 * working hours are loaded once, so switching days doesn't hit the API. The summary
 * follows the selected view (day, week or month).
 */
export const useAgenda = (selectedDate: string, view: AgendaView) => {
  const { request, loading } = useFetch()
  const { request: requestSummary } = useFetch()
  const [appointments, setAppointments] = useState<AppointmentResponse[]>([])
  const [workingHours, setWorkingHours] = useState<WorkingInterval[]>([])
  const [summary, setSummary] = useState<AgendaSummaryResponse | null>(null)

  const date = parseIsoDate(selectedDate)
  const week = periodFor("week", date)
  const period = periodFor(view, date)

  useEffect(() => {
    const loadWorkingHours = async () => {
      const token = window.localStorage.getItem("token")
      if (!token) return

      const { url, options } = WORKING_HOURS_GET(token)
      const { json, response } = await request(url, options)

      if (!response?.ok) {
        showError(json?.message, "Não foi possível carregar seu expediente.")
        return
      }

      setWorkingHours(json as WorkingInterval[])
    }

    loadWorkingHours()
  }, [request])

  useEffect(() => {
    const loadAppointments = async () => {
      const token = window.localStorage.getItem("token")
      if (!token) return

      const { url, options } = APPOINTMENTS_GET(token, week.from, week.to)
      const { json, response } = await request(url, options)

      if (!response?.ok) {
        showError(json?.message, "Não foi possível carregar os agendamentos.")
        return
      }

      setAppointments(json as AppointmentResponse[])
    }

    loadAppointments()
  }, [request, week.from, week.to])

  useEffect(() => {
    const loadSummary = async () => {
      const token = window.localStorage.getItem("token")
      if (!token) return

      const { url, options } = APPOINTMENTS_SUMMARY_GET(token, period.from, period.to)
      const { json, response } = await requestSummary(url, options)

      if (!response?.ok) {
        showError(json?.message, "Não foi possível carregar o resumo da agenda.")
        return
      }

      setSummary(json as AgendaSummaryResponse)
    }

    loadSummary()
  }, [requestSummary, period.from, period.to])

  const weekday = isoWeekday(date)

  const blocks = useMemo(() => {
    const dayIntervals = workingHours.filter((interval) => interval.weekday === weekday)
    const dayAppointments = appointments.filter((appointment) => appointment.startAt.startsWith(selectedDate))
    return buildDayTimeline(dayIntervals, dayAppointments)
  }, [workingHours, appointments, weekday, selectedDate])

  return { blocks, summary, loading }
}
