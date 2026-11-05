import type { AppointmentResponse } from "../../api/schedule/appointments"

export type WorkInterval = {
  start: string
  end: string
}

export type TimelineBlock =
  | { type: "free" | "break"; start: string; end: string }
  | { type: "appointment"; start: string; end: string; appointment: AppointmentResponse }

type Range = {
  start: number
  end: number
}

export const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number)
  return hours * 60 + minutes
}

const toTime = (minutes: number) =>
  `${Math.floor(minutes / 60).toString().padStart(2, "0")}:${(minutes % 60).toString().padStart(2, "0")}`

/** "2026-10-26T08:00:00" -> "08:00" */
export const timeOf = (dateTime: string) => dateTime.slice(11, 16)

/** Removes every busy range from `range`, returning what is left in order. */
const subtract = (range: Range, busy: Range[]): Range[] => {
  let pieces: Range[] = [range]

  for (const taken of busy) {
    pieces = pieces.flatMap((piece) => {
      if (taken.end <= piece.start || taken.start >= piece.end) return [piece]

      return [
        { start: piece.start, end: taken.start },
        { start: taken.end, end: piece.end }
      ].filter((rest) => rest.start < rest.end)
    })
  }

  return pieces
}

/**
 * Builds the day as a continuous list: scheduled appointments, free time inside the
 * working intervals and breaks between them. Canceled appointments are ignored, so
 * their time shows up as free. Appointments outside the working hours (fit-ins) are
 * still listed.
 */
export const buildDayTimeline = (workIntervals: WorkInterval[], appointments: AppointmentResponse[]): TimelineBlock[] => {
  const scheduled = appointments.filter((appointment) => appointment.status === "SCHEDULED")
  const busy = scheduled.map((appointment) => ({
    start: toMinutes(timeOf(appointment.startAt)),
    end: toMinutes(timeOf(appointment.endAt))
  }))

  const work = [...workIntervals]
    .map((interval) => ({ start: toMinutes(interval.start), end: toMinutes(interval.end) }))
    .sort((a, b) => a.start - b.start)

  const freeBlocks = work.flatMap((range) =>
    subtract(range, busy).map((piece) => ({ type: "free" as const, ...piece }))
  )

  const breakBlocks = work.slice(1).flatMap((range, index) => {
    const gap = { start: work[index].end, end: range.start }
    if (gap.start >= gap.end) return []
    return subtract(gap, busy).map((piece) => ({ type: "break" as const, ...piece }))
  })

  const appointmentBlocks = scheduled.map((appointment, index) => ({
    type: "appointment" as const,
    ...busy[index],
    appointment
  }))

  return [...freeBlocks, ...breakBlocks, ...appointmentBlocks]
    .sort((a, b) => a.start - b.start)
    .map((block) => ({ ...block, start: toTime(block.start), end: toTime(block.end) }))
}

const plural = (count: number, singular: string, pluralForm: string) =>
  `${count} ${count === 1 ? singular : pluralForm}`

/** "6 atendimentos hoje · 3 horários livres" */
export const daySummaryLabel = (blocks: TimelineBlock[], isToday: boolean) => {
  const appointments = blocks.filter((block) => block.type === "appointment").length
  const free = blocks.filter((block) => block.type === "free").length

  return `${plural(appointments, "atendimento", "atendimentos")} ${isToday ? "hoje" : "no dia"} · ${plural(free, "horário livre", "horários livres")}`
}
