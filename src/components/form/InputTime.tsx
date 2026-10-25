import type { ChangeEventHandler, FocusEventHandler } from "react"
import type { LucideIcon } from "lucide-react"
import { CircleQuestionMark } from "lucide-react"
import { Field, FieldLabel } from "../../components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../../components/ui/input-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "../../components/ui/tooltip"

import Error from "../commons/Error"

export interface InputTimeProps {
  label?: string;
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  error?: string | null;
  icon?: LucideIcon;
  min?: string;
  max?: string;
  step?: number | string;
  className?: string;
  disabled?: boolean;
  tip?: string;
}

const InputTime = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  icon: Icon,
  min,
  max,
  step,
  className,
  disabled,
  tip
}: InputTimeProps) => {
  return (
    <Field className="flex flex-col gap-1">
      <div className="flex flex-row justify-start items-center gap-1.5">
        <FieldLabel className="text-[11px]" htmlFor={id}>{label}</FieldLabel>
        {tip && (
            <Tooltip>
              <TooltipTrigger>
                <CircleQuestionMark className="size-2.5 hover:cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent side={"right"} className="text-[10px]">
                <p>{tip}</p>
              </TooltipContent>
            </Tooltip>
          )}
      </div>
      <InputGroup className={`h-10 rounded-[16px] border-sich-border bg-white px-2 ${className || ""}`} data-invalid={!!error}>
        <InputGroupInput
          className="h-full appearance-none rounded-none border-0 bg-transparent px-2.5 py-0 text-[10px] leading-none file:relative file:top-px file:h-8 file:py-0 file:text-[11px] placeholder:text-[10px] autofill-fix [&::-webkit-calendar-picker-indicator]:hidden"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={!!error}
          type="time"
          min={min}
          max={max}
          step={step}
          disabled={disabled}
        />
        <InputGroupAddon>
          {Icon && <Icon className="size-4" />}
        </InputGroupAddon>
      </InputGroup>
      {error && <Error message={error} className="animateDown" />}
    </Field>
  )
}

export default InputTime
