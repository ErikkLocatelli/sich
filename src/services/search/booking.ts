import { addDays, parseIsoDate } from "@/services/schedule/agendaDates"

export const BOOKING_DAYS = 7

export const bookingStripStart = (today: Date, weekOffset: number) => addDays(today, weekOffset * BOOKING_DAYS)

export const bookingDateTimeLabel = (isoDate: string, time: string) => {
  const date = parseIsoDate(isoDate)
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  return `${day}/${month} · ${time}`
}

export const bookingStartAt = (isoDate: string, time: string) => `${isoDate}T${time.slice(0, 5)}`
