import type { ReactNode } from "react"

import { Checkbox } from "@/components/ui/checkbox"

export const SearchFilterSection = ({ title, children }: { title: string; children: ReactNode }) => (
  <fieldset className="flex flex-col gap-2.5">
    <legend className="mb-2.5 text-[12px] font-bold tracking-[0.5px] text-sich-label uppercase">{title}</legend>
    {children}
  </fieldset>
)

type SearchFilterOptionProps = {
  label: string
  checked: boolean
  onToggle: () => void
}

export const SearchFilterOption = ({ label, checked, onToggle }: SearchFilterOptionProps) => (
  <label className="flex cursor-pointer items-center gap-2.5 text-[13px] text-sich-heading">
    <Checkbox checked={checked} onCheckedChange={onToggle} className="size-[18px] rounded-[6px] border-sich-border" />
    {label}
  </label>
)
