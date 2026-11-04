import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { WeekDay } from "@/services/schedule/agendaDates"

const DataPicker = ({days, selectedDate, onSelectedDateChange, className}: {days: WeekDay[]; selectedDate: string; onSelectedDateChange: (date: string) => void; className?: string}) => {

  const selectDate = (value: string[]) => {
    const currentSelectedDate = value[0]

    if (currentSelectedDate) {
      onSelectedDateChange(currentSelectedDate)
    }
  }

  return (
    <ToggleGroup className={`w-full grid grid-cols-7 gap-0.5 ${className || ''}`} aria-label="Selecionar dia da semana" value={[selectedDate]} onValueChange={selectDate}>
        {days.map((day) => (
            <ToggleGroupItem key={day.value} value={day.value} aria-label={`${day.label} ${day.day}`} className="h-auto w-full flex-col rounded-lg border-2 border-sich-border py-1 hover:text-[none] hover:cursor-pointer [aria-pressed]:text-white/80 group">
                <span className="text-[10px] text-sich-label group-aria-pressed:text-white">{day.label}</span>
                <span className="text-[15px] font-bold">{day.day}</span>
            </ToggleGroupItem>
        ))}
    </ToggleGroup>
  )
}

export default DataPicker
