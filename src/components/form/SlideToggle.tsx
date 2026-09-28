import { useState } from "react"

import { Toggle } from "@/components/ui/toggle"
import { cn } from "@/lib/utils"

type SlideToggleIndex = 0 | 1

interface SlideToggleOption {
  children?: React.ReactNode
  "aria-label"?: string
  disabled?: boolean
}

interface SlideToggleProps
  extends Omit<
    React.ComponentProps<typeof Toggle>,
    | "children"
    | "className"
    | "pressed"
    | "defaultPressed"
    | "onPressedChange"
    | "disabled"
  > {
  options?: readonly [SlideToggleOption, SlideToggleOption]
  selectedIndex?: SlideToggleIndex
  defaultSelectedIndex?: SlideToggleIndex
  onSelectedIndexChange?: (index: SlideToggleIndex) => void
  disabled?: boolean
  className?: string
}

const defaultOptions: readonly [SlideToggleOption, SlideToggleOption] = [{}, {}]

function SlideToggle({
  className,
  options = defaultOptions,
  selectedIndex,
  defaultSelectedIndex = 0,
  onSelectedIndexChange,
  disabled = false,
  ...props
}: SlideToggleProps) {
  const [internalSelectedIndex, setInternalSelectedIndex] = useState<SlideToggleIndex>(
    defaultSelectedIndex
  )
  const activeIndex = selectedIndex ?? internalSelectedIndex

  const selectIndex = (index: SlideToggleIndex) => {
    if (index === activeIndex || disabled || options[index].disabled) {
      return
    }

    if (selectedIndex === undefined) {
      setInternalSelectedIndex(index)
    }

    onSelectedIndexChange?.(index)
  }

  return (
    <Toggle
      {...props}
      type="button"
      aria-label={props["aria-label"] ?? "Alternar opção"}
      pressed={activeIndex === 1}
      disabled={disabled}
      onPressedChange={(pressed) => selectIndex(pressed ? 1 : 0)}
      className={cn(
        "relative flex h-9 w-full items-center gap-1 overflow-hidden rounded-xl bg-[#e4e6ea] p-1 text-sm font-medium text-[#6b7280] hover:bg-[#e4e6ea] hover:text-[#6b7280] aria-pressed:bg-[#e4e6ea] aria-pressed:text-[#6b7280] aria-pressed:hover:bg-[#e4e6ea] data-pressed:bg-[#e4e6ea] data-pressed:text-[#6b7280] hover:cursor-pointer",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-1 left-1 w-[calc(50%_-_0.375rem)] rounded-lg bg-gradient-to-r from-[#ff5a8a] to-[#c8307a] shadow-[0_1px_1.5px_rgba(0,0,0,0.06)] transition-transform duration-200 ease-out",
          activeIndex === 1 && "translate-x-[calc(100%+0.25rem)]"
        )}
      />
      {options.map((option, index) => {
        const optionIndex = index as SlideToggleIndex

        return (
          <span
            key={optionIndex}
            aria-hidden="true"
            className={cn(
              "relative z-10 flex h-full min-w-0 flex-1 items-center justify-center px-2.5 text-center transition-colors duration-200",
              activeIndex === optionIndex && "text-white"
            )}
          >
            {option.children}
          </span>
        )
      })}
    </Toggle>
  )
}

export type { SlideToggleOption, SlideToggleProps }
export { SlideToggle }