import * as React from "react"
import {
  Select as SelectComponent,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { FieldLabel, FieldGroup } from "../../components/ui/field"
import type { LucideIcon } from "lucide-react"

interface SelectProps<T> {
  label?: string
  insideLabel?: string
  id?: string
  data: T[]
  placeholder?: string
  error?: string | null
  icon?: LucideIcon
  defaultValue?: string
  disabled?: boolean
  getKey: (item: T) => string
  getValue: (item: T) => string
  getLabel: (item: T) => React.ReactNode
}

function Select<T>({
  label,
  id,
  data,
  placeholder,
  insideLabel,
  icon: Icon,
  defaultValue,
  disabled,
  getKey,
  getValue,
  getLabel,
}: SelectProps<T>) {
  return (
    <FieldGroup className="flex flex-col gap-1">
      <FieldLabel className="text-[11px]" htmlFor={id}>
        {label}
      </FieldLabel>
      <SelectComponent defaultValue={defaultValue} disabled={disabled}>
        <SelectTrigger
          id={id}
          className="w-full h-300 rounded-[16px] border-sich-border bg-white px-2 py-6 text-[11px] cursor-pointer" 
        >
          {Icon && <Icon className="size-4" />}
          <SelectValue placeholder={placeholder} className="text-[11px]" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {insideLabel && <SelectLabel>{insideLabel}</SelectLabel>}
            {data.map((item) => (
              <SelectItem
                key={getKey(item)}
                value={getValue(item)}
                className="text-[11px]"
              >
                {getLabel(item)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectComponent>
    </FieldGroup>
  )
}

export default Select