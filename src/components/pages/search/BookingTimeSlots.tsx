import { Skeleton } from "@/components/ui/skeleton"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

type BookingTimeSlotsProps = {
  times: string[]
  loaded: boolean
  selectedTime: string | null
  onSelect: (time: string | null) => void
}

/** Free start times only (the API doesn't return the taken ones). */
const BookingTimeSlots = ({ times, loaded, selectedTime, onSelect }: BookingTimeSlotsProps) => {
  if (!loaded) {
    return (
      <div className="grid grid-cols-3 gap-2" aria-busy="true" aria-label="Carregando horários">
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
      className="grid w-full grid-cols-3 gap-2"
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
