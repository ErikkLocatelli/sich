import { addDays, parseIsoDate } from "@/services/schedule/agendaDates"

export const BOOKING_DAYS = 7

/** First day of the booking strip `weekOffset` strips after today. */
export const bookingStripStart = (today: Date, weekOffset: number) => addDays(today, weekOffset * BOOKING_DAYS)

/** "2026-05-14" + "14:30" -> "14/05 · 14:30" */
export const bookingDateTimeLabel = (isoDate: string, time: string) => {
  const date = parseIsoDate(isoDate)
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  return `${day}/${month} · ${time}`
}

/** "2026-05-14" + "14:30" -> "2026-05-14T14:30" (the API's LocalDateTime) */
export const bookingStartAt = (isoDate: string, time: string) => `${isoDate}T${time.slice(0, 5)}`
