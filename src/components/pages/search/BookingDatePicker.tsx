import { ChevronLeft, ChevronRight } from "lucide-react"

import DataPicker from "@/components/pages/schedule/DataPicker"
import { Button } from "@/components/ui/button"
import type { WeekDay } from "@/services/schedule/agendaDates"

type BookingDatePickerProps = {
  monthLabel: string
  days: WeekDay[]
  weekOffset: number
  canGoBack: boolean
  onWeekChange: (offset: number) => void
  selectedDate: string
  onSelectedDateChange: (date: string) => void
}

/** Next 7 days starting today, paginated by week, reusing the agenda day picker. */
const BookingDatePicker = ({ monthLabel, days, weekOffset, canGoBack, onWeekChange, selectedDate, onSelectedDateChange }: BookingDatePickerProps) => (
  <section className="flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <h2 className="text-[14px] font-semibold text-sich-heading">Data — {monthLabel}</h2>
      <div className="flex gap-1">
        <Button variant="ghost" size="icon" disabled={!canGoBack} onClick={() => onWeekChange(weekOffset - 1)} aria-label="Semana anterior">
          <ChevronLeft />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onWeekChange(weekOffset + 1)} aria-label="Próxima semana">
          <ChevronRight />
        </Button>
      </div>
    </div>
    <DataPicker days={days} selectedDate={selectedDate} onSelectedDateChange={onSelectedDateChange} />
  </section>
)

export default BookingDatePicker
