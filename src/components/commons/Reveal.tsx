import type { CSSProperties, ElementType, ReactNode } from "react"

import useInView from "@/hooks/useInView"
import { cn } from "@/lib/utils"

type RevealProps = {
  children: ReactNode
  as?: ElementType
  /** Delay in ms, handy for staggering siblings. */
  delay?: number
  variant?: "up" | "fade" | "scale"
  className?: string
}

const HIDDEN: Record<NonNullable<RevealProps["variant"]>, string> = {
  // Full literals so Tailwind picks them up
  up: "motion-safe:translate-y-8 motion-safe:opacity-0",
  fade: "motion-safe:opacity-0",
  scale: "motion-safe:scale-95 motion-safe:opacity-0",
}

/** Animates its content in the first time it scrolls into view. Static when the user prefers reduced motion. */
const Reveal = ({ children, as: Tag = "div", delay = 0, variant = "up", className }: RevealProps) => {
  const { ref, inView } = useInView<HTMLElement>()
  const style: CSSProperties = { transitionDelay: `${delay}ms` }

  return (
    <Tag
      ref={ref}
      style={style}
      data-inview={inView}
      className={cn(
        "motion-safe:transition-all motion-safe:duration-900 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]",
        !inView && HIDDEN[variant],
        className,
      )}
    >
      {children}
    </Tag>
  )
}

export default Reveal
