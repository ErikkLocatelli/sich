import { useEffect, useState } from "react"

import useFetch from "../useFetch"
import { toast } from "../../components/ui/toast"
import { WORKING_HOURS_GET, type WorkingHoursRequest, type WorkingInterval } from "../../api/schedule/workingHours"

export type TimeInterval = {
  start: string
  end: string
}

export type IntervalError = {
  start: string | null
  end: string | null
}

export type DaySchedule = {
  weekday: number
  label: string
  enabled: boolean
  intervals: TimeInterval[]
}

const SLOT_MINUTES = 15
const NEW_INTERVAL_MINUTES = 60
const LAST_SLOT = 23 * 60 + 45

const DEFAULT_INTERVALS: TimeInterval[] = [
  { start: "08:00", end: "12:00" },
  { start: "13:00", end: "18:00" }
]

const WEEKDAYS = [
  { weekday: 1, label: "Segunda-feira" },
  { weekday: 2, label: "Terça-feira" },
  { weekday: 3, label: "Quarta-feira" },
  { weekday: 4, label: "Quinta-feira" },
  { weekday: 5, label: "Sexta-feira" },
  { weekday: 6, label: "Sábado" },
  { weekday: 7, label: "Domingo" }
]

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number)
  return hours * 60 + minutes
}

const toTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60).toString().padStart(2, "0")
  return `${hours}:${(minutes % 60).toString().padStart(2, "0")}`
}

const isAligned = (time: string) => toMinutes(time) % SLOT_MINUTES === 0

const emptyWeek = (): DaySchedule[] =>
  WEEKDAYS.map((day) => ({ ...day, enabled: false, intervals: [] }))

const fromResponse = (intervals: WorkingInterval[]): DaySchedule[] =>
  emptyWeek().map((day) => {
    const dayIntervals = intervals
      .filter((interval) => interval.weekday === day.weekday)
      .map(({ start, end }) => ({ start, end }))

    return { ...day, enabled: dayIntervals.length > 0, intervals: dayIntervals }
  })

const validateInterval = (interval: TimeInterval, previous?: TimeInterval): IntervalError => {
  const error: IntervalError = { start: null, end: null }

  if (!interval.start) error.start = "Preencha o início"
  else if (!isAligned(interval.start)) error.start = "Use múltiplos de 15 minutos"
  else if (previous?.end && toMinutes(interval.start) < toMinutes(previous.end)) {
    error.start = "Deve começar após o intervalo anterior"
  }

  if (!interval.end) error.end = "Preencha o fim"
  else if (!isAligned(interval.end)) error.end = "Use múltiplos de 15 minutos"
  else if (interval.start && toMinutes(interval.end) <= toMinutes(interval.start)) {
    error.end = "Deve ser depois do início"
  }

  return error
}

const validateDay = (day: DaySchedule): IntervalError[] => {
  if (!day.enabled) return day.intervals.map(() => ({ start: null, end: null }))

  return day.intervals.map((interval, index) => validateInterval(interval, day.intervals[index - 1]))
}

const nextInterval = (last: TimeInterval): TimeInterval | null => {
  if (!last.end || !isAligned(last.end)) return null

  const start = toMinutes(last.end)
  if (start >= LAST_SLOT) return null

  return { start: toTime(start), end: toTime(Math.min(start + NEW_INTERVAL_MINUTES, LAST_SLOT)) }
}

export const useWorkingHours = () => {
  const { request, loading, error } = useFetch()
  const [days, setDays] = useState<DaySchedule[]>(emptyWeek)

  useEffect(() => {
    const loadWorkingHours = async () => {
      const token = window.localStorage.getItem("token")

      if (!token) return

      const { url, options } = WORKING_HOURS_GET(token)
      const { json, response } = await request(url, options)

      if (!response?.ok) {
        toast.add({
          type: "error",
          description: json?.message ?? "Não foi possível carregar sua disponibilidade."
        })
        return
      }

      setDays(fromResponse(json as WorkingInterval[]))
    }

    loadWorkingHours()
  }, [request])

  const updateDay = (weekday: number, update: (day: DaySchedule) => DaySchedule) => {
    setDays((prevDays) => prevDays.map((day) => (day.weekday === weekday ? update(day) : day)))
  }

  const toggleDay = (weekday: number, enabled: boolean) => {
    updateDay(weekday, (day) => ({
      ...day,
      enabled,
      intervals: enabled && day.intervals.length === 0 ? DEFAULT_INTERVALS : day.intervals
    }))
  }

  const updateInterval = (weekday: number, index: number, field: keyof TimeInterval, value: string) => {
    updateDay(weekday, (day) => ({
      ...day,
      intervals: day.intervals.map((interval, i) => (i === index ? { ...interval, [field]: value } : interval))
    }))
  }

  const addInterval = (weekday: number) => {
    updateDay(weekday, (day) => {
      const next = nextInterval(day.intervals[day.intervals.length - 1])
      return next ? { ...day, intervals: [...day.intervals, next] } : day
    })
  }

  const removeLastInterval = (weekday: number) => {
    updateDay(weekday, (day) =>
      day.intervals.length > 1 ? { ...day, intervals: day.intervals.slice(0, -1) } : day
    )
  }

  const canAddInterval = (day: DaySchedule) =>
    day.intervals.length > 0 && nextInterval(day.intervals[day.intervals.length - 1]) !== null

  const errors = Object.fromEntries(days.map((day) => [day.weekday, validateDay(day)])) as Record<number, IntervalError[]>

  const isValid = Object.values(errors).every((dayErrors) =>
    dayErrors.every((intervalError) => !intervalError.start && !intervalError.end)
  )

  const getPayload = (): WorkingHoursRequest => ({
    intervals: days
      .filter((day) => day.enabled)
      .flatMap((day) => day.intervals.map(({ start, end }) => ({ weekday: day.weekday, start, end })))
  })

  return {
    days,
    errors,
    loading,
    error,
    isValid,
    toggleDay,
    updateInterval,
    addInterval,
    removeLastInterval,
    canAddInterval,
    getPayload
  }
}
