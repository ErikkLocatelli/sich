import type { ChangeEventHandler, FocusEventHandler } from "react"
import type { LucideIcon } from "lucide-react"

import { Field, FieldLabel } from "../../components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../../components/ui/input-group"

import Error from "../commons/Error"

export interface InputProps {
  label?: string;
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  error?: string | null;
  icon?:  LucideIcon;
  type?: string;
  className?: string;
  disabled?: boolean;
  accept?: string;
}

const Input = ({label, id, placeholder, value, onChange, onBlur, error, icon: Icon, type, className, disabled, accept }: InputProps) => {

  return (
    <Field className="flex flex-col gap-1">
      <FieldLabel className="text-[11px]" htmlFor={id}>{label}</FieldLabel>
        <InputGroup className={`h-10 rounded-[16px] border-sich-border bg-white px-2 ${className || ""}`} data-invalid={!!error}>
        <InputGroupInput className="h-full rounded-none border-0 bg-transparent px-2.5 py-0 text-[10px] leading-none file:relative file:top-px file:h-8 file:py-0 file:text-[11px] file:leading-none placeholder:text-[10px] autofill-fix"  placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} aria-invalid={!!error} type={type || "text"} disabled={disabled} multiple={type === "file"} accept={type === "file" ? accept : undefined} />
      <InputGroupAddon>
          {Icon && <Icon className="size-4" />}
      </InputGroupAddon>
      </InputGroup>
      {error && <Error message={error} className='animateDown' />}
  </Field>
  )
}

export default Input
