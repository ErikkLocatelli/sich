import { useState } from "react"

import { Toggle } from "@/components/ui/toggle"
import { cn } from "@/lib/utils"

interface SlideToggleOption {
  children?: React.ReactNode
  "aria-label"?: string
  disabled?: boolean
}

type SlideToggleOptions = readonly [
  SlideToggleOption,
  SlideToggleOption,
  ...SlideToggleOption[],
]

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
  options?: SlideToggleOptions
  selectedIndex?: number
  defaultSelectedIndex?: number
  onSelectedIndexChange?: (index: number) => void
  disabled?: boolean
  className?: string
}

const defaultOptions: SlideToggleOptions = [{}, {}]

function SlideToggle({
  className,
  options = defaultOptions,
  selectedIndex,
  defaultSelectedIndex = 0,
  onSelectedIndexChange,
  disabled = false,
  ...props
}: SlideToggleProps) {
  const [internalSelectedIndex, setInternalSelectedIndex] = useState(
    defaultSelectedIndex
  )
  const activeIndex = selectedIndex ?? internalSelectedIndex

  const selectIndex = (index: number) => {
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
      style={
        {
          "--slide-option-count": options.length,
          "--slide-active-index": activeIndex,
        } as React.CSSProperties
      }
      className={cn(
        "relative flex h-9 w-full items-center gap-1 overflow-hidden rounded-lg bg-[#e4e6ea] p-1 text-[12px] font-medium text-[#6b7280] hover:text-[#6b7280] aria-pressed:bg-[#e4e6ea] aria-pressed:text-[#6b7280] data-pressed:bg-[#e4e6ea] data-pressed:text-[#6b7280] hover:cursor-pointer",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-1 left-1 w-[calc((100%_-_0.5rem_-_(var(--slide-option-count)_-_1)_*_0.25rem)_/_var(--slide-option-count))] rounded-lg bg-gradient-to-r from-[#ff5a8a] to-[#c8307a] shadow-[0_1px_1.5px_rgba(0,0,0,0.06)] transition-transform duration-200 ease-out translate-x-[calc(var(--slide-active-index)_*_(100%_+_0.25rem))]"
        )}
      />
      {options.map((option, index) => {
        return (
          <span
            key={index}
            aria-hidden="true"
            onClick={(event) => {
              event.stopPropagation()
              selectIndex(index)
            }}
            className={cn(
              "relative z-10 flex h-full min-w-0 flex-1 items-center justify-center px-2.5 text-center transition-colors duration-200",
              activeIndex === index && "text-white",
              option.disabled && "cursor-not-allowed opacity-50"
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