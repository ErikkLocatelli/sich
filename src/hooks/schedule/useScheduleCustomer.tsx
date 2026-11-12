import { useEffect, useState } from "react"

import type { AppointmentResponse } from "@/api/schedule/appointments"
import { CUSTOMER_APPOINTMENTS_GET } from "@/api/schedule/customerAppointments"
import { toast } from "@/components/ui/toast"
import { addDays, monthYearLabel, toIsoDate, toLocalDateTime, weekDays } from "@/services/schedule/agendaDates"
import {
  customerHistory,
  customerUpcoming,
  monthSummary,
  onDay,
  RECENT_HISTORY_LIMIT,
  SCHEDULE_CUSTOMER_COPY,
  SCHEDULE_CUSTOMER_TABS,
  SCHEDULE_HISTORY_DAYS,
  SCHEDULE_UPCOMING_DAYS,
  weekCountLabel,
  weekScheduledCount
} from "@/services/schedule/customerSchedule"

import useFetch from "../useFetch"
import usePreviousRoute from "../usePreviousRoute"

/** Customer agenda: upcoming and past appointments split by tab, plus the desktop week/month widgets. */
export const useScheduleCustomer = () => {
  const previousRoute = usePreviousRoute()
  const { request } = useFetch()
  const [now] = useState(() => new Date())
  const [selectedTab, setSelectedTab] = useState(0)
  /** Desktop only: the day picked in the week picker; null shows every appointment of the tab. */
  const [dayFilter, setDayFilter] = useState<string | null>(null)
  const [appointments, setAppointments] = useState<AppointmentResponse[] | null>(null)

  useEffect(() => {
    const token = window.localStorage.getItem("token")
    if (!token) return

    // One request covers both tabs, within the backend's listing range limit
    const loadAppointments = async () => {
      const from = toIsoDate(addDays(now, -SCHEDULE_HISTORY_DAYS))
      const to = toIsoDate(addDays(now, SCHEDULE_UPCOMING_DAYS))
      const { url, options } = CUSTOMER_APPOINTMENTS_GET(token, from, to)
      const { json, response } = await request(url, options)

      if (!response?.ok) {
        toast.add({ type: "error", description: SCHEDULE_CUSTOMER_COPY.loadError })
        setAppointments([])
        return
      }

      setAppointments(json as AppointmentResponse[])
    }

    loadAppointments()
  }, [request, now])

  const nowLocal = toLocalDateTime(now)
  const today = toIsoDate(now)
  const days = weekDays(now)
  const tab = SCHEDULE_CUSTOMER_TABS[selectedTab]
  const list = appointments ?? []
  const history = customerHistory(list, nowLocal)
  const tabList = tab === "upcoming" ? customerUpcoming(list, nowLocal) : history

  return {
    animationClass: previousRoute === "/" || previousRoute?.startsWith("/search") ? "animateRight" : "animateLeft",
    selectedTab,
    setSelectedTab,
    tab,
    now: nowLocal,
    appointments: dayFilter ? onDay(tabList, dayFilter) : tabList,
    loaded: appointments !== null,
    dayFilter,
    setDayFilter,
    clearDayFilter: () => setDayFilter(null),
    days,
    pickerDate: dayFilter ?? today,
    monthLabel: monthYearLabel(today),
    weekCountLabel: weekCountLabel(weekScheduledCount(list, days.map((day) => day.value))),
    monthSummary: monthSummary(list, nowLocal),
    recentHistory: history.slice(0, RECENT_HISTORY_LIMIT),
  }
}

export type ScheduleCustomerState = ReturnType<typeof useScheduleCustomer>
