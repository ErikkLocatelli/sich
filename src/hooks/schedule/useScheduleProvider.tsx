import { useState } from "react"

import usePreviousRoute from "../usePreviousRoute"
import { useAgenda } from "./useAgenda"
import { useAppointmentHistory } from "./useAppointmentHistory"
import { dayTitle, parseIsoDate, periodLabel, toIsoDate, weekDays, type AgendaView } from "../../services/schedule/agendaDates"
import { daySummaryLabel } from "../../services/schedule/dayTimeline"

const VIEWS: AgendaView[] = ["day", "week", "month"]
const HISTORY_SIZE = 5

export const VIEW_OPTIONS = [
  { children: "Dia" },
  { children: "Semana" },
  { children: "Mês" },
] as const

/** State and data shared by the mobile and desktop provider agenda screens. */
export const useScheduleProvider = () => {
  const previousRoute = usePreviousRoute()
  const [selectedView, setSelectedView] = useState(0)
  const [selectedDate, setSelectedDate] = useState(() => toIsoDate(new Date()))
  const view = VIEWS[selectedView]
  const date = parseIsoDate(selectedDate)
  const today = toIsoDate(new Date())
  const { blocks, week, summary, loaded: agendaLoaded } = useAgenda(selectedDate, view)
  const { appointments: history, loaded: historyLoaded } = useAppointmentHistory(HISTORY_SIZE)

  return {
    animationClass: previousRoute === "/" ? "animateRight" : "animateLeft",
    selectedView,
    setSelectedView,
    selectedDate,
    setSelectedDate,
    goToToday: () => setSelectedDate(today),
    date,
    days: weekDays(date),
    periodLabel: periodLabel(view, date),
    dayTitle: dayTitle(date),
    daySummary: daySummaryLabel(blocks, selectedDate === today),
    blocks,
    week,
    summary,
    agendaLoaded,
    history,
    historyLoaded,
  }
}

export type ScheduleProviderState = ReturnType<typeof useScheduleProvider>
