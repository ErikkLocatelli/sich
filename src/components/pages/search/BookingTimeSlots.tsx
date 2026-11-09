import { Skeleton } from "@/components/ui/skeleton"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

type BookingTimeSlotsProps = {
  times: string[]
  loaded: boolean
  selectedTime: string | null
  onSelect: (time: string | null) => void
  className?: string
}

const BookingTimeSlots = ({ times, loaded, selectedTime, onSelect, className }: BookingTimeSlotsProps) => {
  if (!loaded) {
    return (
      <div className={cn("grid grid-cols-3 gap-2", className)} aria-busy="true" aria-label="Carregando horários">
        {Array.from({ length: 6 }, (_, index) => <Skeleton key={index} className="h-10 rounded-[12px]" />)}
      </div>
    )
  }

  if (times.length === 0) {
    return <p className="py-4 text-center text-[12px] text-sich-label">Sem horários livres nesta data.</p>
  }

  return (
    <ToggleGroup
      variant="outline"
      value={selectedTime ? [selectedTime] : []}
      onValueChange={(value) => onSelect(value[0] ?? null)}
      aria-label="Escolha o horário"
      className={cn("grid w-full grid-cols-3 gap-2", className)}
    >
      {times.map((time) => (
        <ToggleGroupItem
          key={time}
          value={time}
          className="h-10 w-full rounded-[12px] border-sich-border bg-white text-[12px] text-sich-heading hover:cursor-pointer"
        >
          {time}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

export default BookingTimeSlots
