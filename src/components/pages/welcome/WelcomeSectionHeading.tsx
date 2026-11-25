import Reveal from "@/components/commons/Reveal"
import { cn } from "@/lib/utils"

type WelcomeSectionHeadingProps = {
  title: string
  accent?: string
  description?: string
  /** Bloom-style staggered title: second line pushed right on desktop. */
  staggered?: boolean
  className?: string
}

/** Editorial section heading: title with a gradient accent and a side description on desktop. */
const WelcomeSectionHeading = ({ title, accent, description, staggered, className }: WelcomeSectionHeadingProps) => (
  <div className={cn("flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-16", className)}>
    <Reveal as="h2" className="text-[32px] leading-[1.06] font-semibold tracking-[-1.2px] text-sich-heading lg:text-[52px] lg:tracking-[-2px]">
      <span className="block">{title}</span>
      {accent && (
        <span className={cn("block", staggered && "lg:pl-[1.6em]")}>
          <span className="bg-sich-gradient bg-clip-text text-transparent">{accent}</span>
        </span>
      )}
    </Reveal>
    {description && (
      <Reveal as="p" delay={120} className="max-w-92 text-[14px] leading-relaxed text-sich-label lg:pb-2">
        {description}
      </Reveal>
    )}
  </div>
)

export default WelcomeSectionHeading
