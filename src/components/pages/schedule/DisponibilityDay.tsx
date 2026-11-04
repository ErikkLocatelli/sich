import { Plus, Trash } from "lucide-react"

import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import InputTime from "@/components/form/InputTime"
import Error from "@/components/commons/Error"
import type { DaySchedule, IntervalError, TimeInterval } from "@/hooks/schedule/useWorkingHours"

const INVALID_INPUT = "border-destructive ring-3 ring-destructive/20"

type DisponibilityDayProps = {
    day: DaySchedule
    errors: IntervalError[]
    canAddInterval: boolean
    onToggle: (enabled: boolean) => void
    onChangeInterval: (index: number, field: keyof TimeInterval, value: string) => void
    onAddInterval: () => void
    onRemoveInterval: () => void
}

const DisponibilityDay = ({ day, errors, canAddInterval, onToggle, onChangeInterval, onAddInterval, onRemoveInterval }: DisponibilityDayProps) => {
    const switchId = `day-${day.weekday}`
    const lastIndex = day.intervals.length - 1

  return (
    <div className="w-full py-3">
        <div className="flex item-center justify-between">
            <label className={`font-semibold text-[11px] ${!day.enabled && "text-black/40 "}`} htmlFor={switchId}>{day.label}</label>
            <Switch id={switchId} checked={day.enabled} onCheckedChange={onToggle}/>
        </div>
        {day.enabled ? (
        <div className="flex flex-col gap-1 mt-2 animateRight">
            {day.intervals.map((interval, index) => {
                const startError = errors[index]?.start
                const endError = errors[index]?.end
                const rowError = startError ?? endError

                return (
                <div key={index} className="flex flex-col gap-1">
                    <div className="flex flex-row items-center gap-5">
                        {/* Errors are shown once below the row, so the inputs only get the invalid border */}
                        <InputTime step={900} value={interval.start} className={startError ? INVALID_INPUT : ""} onChange={(event) => onChangeInterval(index, "start", event.target.value)} />
                        <span className="text-[11px] text-(--label-text)">até</span>
                        <InputTime step={900} value={interval.end} className={endError ? INVALID_INPUT : ""} onChange={(event) => onChangeInterval(index, "end", event.target.value)} />
                        {/* Kept on every row (hidden) so all inputs share the same width */}
                        <div className={`flex flex-row gap-1 ${index !== lastIndex ? "invisible" : ""}`}>
                            <Button type="button" size="icon-sm" variant="ghost" aria-label="Adicionar intervalo" disabled={!canAddInterval} onClick={onAddInterval}>
                                <Plus />
                            </Button>
                            <Button type="button" size="icon-sm" variant="ghost" aria-label="Remover intervalo" disabled={day.intervals.length === 1} onClick={onRemoveInterval}>
                                <Trash />
                            </Button>
                        </div>
                    </div>
                    {rowError && <Error message={rowError} className="animateDown" />}
                </div>
                )
            })}
        </div>
        ) :
        <h1 className="text-[11px] text-black/20 mt-2 animateLeft">Dia sem atendimento</h1>
        }
    </div>
  )
}

export default DisponibilityDay
