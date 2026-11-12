import { cn } from "@/lib/utils"

const Badge = ({ text, className }: { text: string; className?: string }) => (
  <span
    className={cn(
      "inline-flex shrink-0 items-center rounded-full bg-[#FDE7F0] px-2 py-1 text-[9px] leading-none font-semibold uppercase text-[#A01F6B]",
      className,
    )}>
    {text}
  </span>
)

export default Badge
