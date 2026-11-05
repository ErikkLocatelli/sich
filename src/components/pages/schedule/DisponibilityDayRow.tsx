import { Fragment } from "react"
import { Plus, Trash } from "lucide-react"

import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import InputTime from "@/components/form/InputTime"
import Error from "@/components/commons/Error"
import { cn } from "@/lib/utils"
import { INVALID_INPUT, type DisponibilityDayProps } from "./DisponibilityDay"

/** Desktop version of DisponibilityDay: day, intervals and switch side by side. */
const DisponibilityDayRow = ({ day, errors, canAddInterval, onToggle, onChangeInterval, onAddInterval, onRemoveInterval }: DisponibilityDayProps) => {
  const switchId = `day-${day.weekday}`
  const messages = errors
    .map((error, index) => ({ index, message: error.start ?? error.end }))
    .filter((item): item is { index: number; message: string } => item.message !== null)

  return (
    <div className="grid grid-cols-[9rem_minmax(0,1fr)_auto] items-center gap-x-6 py-4">
      <label htmlFor={switchId} className={cn("text-[14px] font-semibold text-sich-heading", !day.enabled && "text-black/40")}>
        {day.label}
      </label>

      {day.enabled ? (
        <div className="flex flex-col gap-2 animateRight">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {day.intervals.map((interval, index) => (
              <Fragment key={index}>
                {index > 0 && <span aria-hidden="true" className="text-[12px] text-sich-label">·</span>}
                <div className="flex items-center gap-2">
                  <div className="w-24">
                    <InputTime step={900} value={interval.start} className={errors[index]?.start ? INVALID_INPUT : ""} onChange={(event) => onChangeInterval(index, "start", event.target.value)} />
                  </div>
                  <span className="text-[11px] text-sich-label">até</span>
                  <div className="w-24">
                    <InputTime step={900} value={interval.end} className={errors[index]?.end ? INVALID_INPUT : ""} onChange={(event) => onChangeInterval(index, "end", event.target.value)} />
                  </div>
                </div>
              </Fragment>
            ))}
            <div className="flex gap-1">
              <Button type="button" size="icon-sm" variant="ghost" aria-label="Adicionar intervalo" disabled={!canAddInterval} onClick={onAddInterval}>
                <Plus />
              </Button>
              <Button type="button" size="icon-sm" variant="ghost" aria-label="Remover intervalo" disabled={day.intervals.length === 1} onClick={onRemoveInterval}>
                <Trash />
              </Button>
            </div>
          </div>
          {messages.map(({ index, message }) => (
            <Error key={index} message={day.intervals.length > 1 ? `Intervalo ${index + 1}: ${message}` : message} className="animateDown" />
          ))}
        </div>
      ) : (
        <span className="text-[11px] text-black/20 animateLeft">Dia sem atendimento</span>
      )}

      <Switch id={switchId} checked={day.enabled} onCheckedChange={onToggle} />
    </div>
  )
}

export default DisponibilityDayRow
