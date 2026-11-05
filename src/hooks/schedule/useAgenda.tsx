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
import { isoWeekday, parseIsoDate, periodFor, weekDays, type AgendaView, type WeekDay } from "../../services/schedule/agendaDates"
import { buildDayTimeline, type TimelineBlock } from "../../services/schedule/dayTimeline"

export type DayBlocks = {
  day: WeekDay
  blocks: TimelineBlock[]
}

const showError = (message: string | undefined, fallback: string) => {
  toast.add({ type: "error", description: message ?? fallback })
}

export const useAgenda = (selectedDate: string, view: AgendaView) => {
  const { request, loading } = useFetch()
  const { request: requestSummary } = useFetch()
  const [appointments, setAppointments] = useState<AppointmentResponse[]>([])
  const [workingHours, setWorkingHours] = useState<WorkingInterval[]>([])
  const [summary, setSummary] = useState<AgendaSummaryResponse | null>(null)
  const [workingHoursLoaded, setWorkingHoursLoaded] = useState(false)
  // Week whose appointments are in state; a different week means it's still loading
  const [loadedWeek, setLoadedWeek] = useState<string | null>(null)

  const date = parseIsoDate(selectedDate)
  const weekPeriod = periodFor("week", date)
  const period = periodFor(view, date)

  useEffect(() => {
    const loadWorkingHours = async () => {
      const token = window.localStorage.getItem("token")
      if (!token) return

      const { url, options } = WORKING_HOURS_GET(token)
      const { json, response } = await request(url, options)
      setWorkingHoursLoaded(true)

      if (!response?.ok) {
        showError(json?.message, "Não foi possível carregar seu expediente.")
        return
      }

      setWorkingHours(json as WorkingInterval[])
    }

    loadWorkingHours()
  }, [request])

  useEffect(() => {
    // Ignores a response that arrives after the week changed
    let active = true

    const loadAppointments = async () => {
      const token = window.localStorage.getItem("token")
      if (!token) return

      const { url, options } = APPOINTMENTS_GET(token, weekPeriod.from, weekPeriod.to)
      const { json, response } = await request(url, options)
      if (!active) return

      setLoadedWeek(weekPeriod.from)

      if (!response?.ok) {
        showError(json?.message, "Não foi possível carregar os agendamentos.")
        setAppointments([])
        return
      }

      setAppointments(json as AppointmentResponse[])
    }

    loadAppointments()
    return () => { active = false }
  }, [request, weekPeriod.from, weekPeriod.to])

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

  const weekBlocks = useMemo<DayBlocks[]>(() =>
    weekDays(parseIsoDate(weekPeriod.from)).map((day) => {
      const weekday = isoWeekday(parseIsoDate(day.value))
      const dayIntervals = workingHours.filter((interval) => interval.weekday === weekday)
      const dayAppointments = appointments.filter((appointment) => appointment.startAt.startsWith(day.value))
      return { day, blocks: buildDayTimeline(dayIntervals, dayAppointments) }
    }),
  [workingHours, appointments, weekPeriod.from])

  const blocks = weekBlocks.find(({ day }) => day.value === selectedDate)?.blocks ?? []

  const loaded = workingHoursLoaded && loadedWeek === weekPeriod.from

  return { blocks, week: weekBlocks, summary, loading, loaded }
}
