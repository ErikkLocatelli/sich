export type AgendaView = "day" | "week" | "month"

export type WeekDay = {
  value: string
  label: string
  day: number
}

export type Period = {
  from: string
  to: string
}

const WEEKDAY_LABELS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]

const monthName = new Intl.DateTimeFormat("pt-BR", { month: "long" })
const weekdayName = new Intl.DateTimeFormat("pt-BR", { weekday: "long" })

const pad = (value: number) => value.toString().padStart(2, "0")

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

/** Local yyyy-MM-dd; toISOString would shift the day after 21:00 in UTC-3. */
export const toIsoDate = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

/** Local "yyyy-MM-ddTHH:mm", comparable as a string with the API's LocalDateTime. */
export const toLocalDateTime = (date: Date) =>
  `${toIsoDate(date)}T${pad(date.getHours())}:${pad(date.getMinutes())}`

export const parseIsoDate =(isoDate: string) => {
  const [year, month, day] = isoDate.split("-").map(Number)
  return new Date(year, month - 1, day)
}

export const addDays = (date: Date, days: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days)

/** Weeks start on Sunday, matching the day picker. */
export const startOfWeek = (date: Date) => addDays(date, -date.getDay())

export const weekDays = (date: Date): WeekDay[] => {
  const sunday = startOfWeek(date)

  return WEEKDAY_LABELS.map((label, index) => {
    const day = addDays(sunday, index)
    return { value: toIsoDate(day), label, day: day.getDate() }
  })
}

export const periodFor = (view: AgendaView, date: Date): Period => {
  if (view === "day") return { from: toIsoDate(date), to: toIsoDate(date) }

  if (view === "week") {
    const sunday = startOfWeek(date)
    return { from: toIsoDate(sunday), to: toIsoDate(addDays(sunday, 6)) }
  }

  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  return { from: toIsoDate(firstDay), to: toIsoDate(lastDay) }
}

const fullDate = (date: Date) => `${date.getDate()} de ${monthName.format(date)} de ${date.getFullYear()}`

const weekLabel = (date: Date) => {
  const sunday = startOfWeek(date)
  const saturday = addDays(sunday, 6)

  if (sunday.getFullYear() !== saturday.getFullYear()) {
    return `Semana de ${fullDate(sunday)} a ${fullDate(saturday)}`
  }
  if (sunday.getMonth() !== saturday.getMonth()) {
    return `Semana de ${sunday.getDate()} de ${monthName.format(sunday)} a ${fullDate(saturday)}`
  }
  return `Semana de ${sunday.getDate()} a ${fullDate(saturday)}`
}

export const periodLabel = (view: AgendaView, date: Date) => {
  if (view === "day") return `Dia ${fullDate(date)}`
  if (view === "week") return weekLabel(date)
  return `Mês de ${monthName.format(date)} de ${date.getFullYear()}`
}

/** "2026-11" -> "Novembro de 2026" */
export const monthTitle = (yearMonth: string) => {
  const [year, month] = yearMonth.split("-").map(Number)
  return `${capitalize(monthName.format(new Date(year, month - 1, 1)))} de ${year}`
}

/** Same day `months` months back; JS rolls over invalid days (31/05 - 3 months = 03/03), which is fine for a cutoff. */
export const subtractMonths = (date: Date, months: number) =>
  new Date(date.getFullYear(), date.getMonth() - months, date.getDate())

/** "Sábado 31" */
export const dayTitle = (date: Date) => `${capitalize(weekdayName.format(date))} ${date.getDate()}`

const MONTH_LABELS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

/** "2026-05-13T11:00:00" -> "Qua, 13 Mai · 11:00" */
export const shortDateTime = (dateTime: string) => {
  const date = parseIsoDate(dateTime.slice(0, 10))
  return `${WEEKDAY_LABELS[date.getDay()]}, ${date.getDate()} ${MONTH_LABELS[date.getMonth()]} · ${dateTime.slice(11, 16)}`
}

/** ISO weekday used by the backend: 1 = Monday ... 7 = Sunday. */
export const isoWeekday = (date: Date) => date.getDay() === 0 ? 7 : date.getDay()

/** `count` consecutive days starting at `start` (not aligned to the week). */
export const nextDays = (start: Date, count: number): WeekDay[] =>
  Array.from({ length: count }, (_, index) => {
    const day = addDays(start, index)
    return { value: toIsoDate(day), label: WEEKDAY_LABELS[day.getDay()], day: day.getDate() }
  })

/** "2026-11-07" -> "Novembro 2026" */
export const monthYearLabel = (isoDate: string) => {
  const date = parseIsoDate(isoDate)
  return `${capitalize(monthName.format(date))} ${date.getFullYear()}`
}
