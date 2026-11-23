import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import type { AppointmentResponse } from "@/api/schedule/appointments"
import { customerAppointmentsQuery } from "@/api/schedule/scheduleQueries"
import { monthYearLabel, toIsoDate, toLocalDateTime, weekDays } from "@/services/schedule/agendaDates"
import {
  customerAgendaRange,
  customerHistory,
  customerUpcoming,
  monthSummary,
  onDay,
  RECENT_HISTORY_LIMIT,
  SCHEDULE_CUSTOMER_TABS,
  weekCountLabel,
  weekScheduledCount
} from "@/services/schedule/customerSchedule"

import usePreviousRoute from "../usePreviousRoute"

const NO_APPOINTMENTS: AppointmentResponse[] = []

/** Customer agenda: upcoming and past appointments split by tab, plus the desktop week/month widgets. */
export const useScheduleCustomer = () => {
  const previousRoute = usePreviousRoute()
  const [now] = useState(() => new Date())
  const [selectedTab, setSelectedTab] = useState(0)
  /** Desktop only: the day picked in the week picker; null shows every appointment of the tab. */
  const [dayFilter, setDayFilter] = useState<string | null>(null)
  const [range] = useState(() => customerAgendaRange(now))
  // Same listing as the customer home: coming from it, the agenda opens from cache
  const { data: appointments, isPending } = useQuery(customerAppointmentsQuery(range.from, range.to))

  const nowLocal = toLocalDateTime(now)
  const today = toIsoDate(now)
  const days = weekDays(now)
  const tab = SCHEDULE_CUSTOMER_TABS[selectedTab]
  const list = appointments ?? NO_APPOINTMENTS
  const history = customerHistory(list, nowLocal)
  const tabList = tab === "upcoming" ? customerUpcoming(list, nowLocal) : history

  return {
    animationClass: previousRoute === "/" || previousRoute?.startsWith("/search") ? "animateRight" : "animateLeft",
    selectedTab,
    setSelectedTab,
    tab,
    now: nowLocal,
    appointments: dayFilter ? onDay(tabList, dayFilter) : tabList,
    // A failed request ends loading with an empty list
    loaded: !isPending,
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
