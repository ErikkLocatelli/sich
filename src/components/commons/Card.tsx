import { cn } from "@/lib/utils"

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("bg-white shadow-sich-small-card rounded-[16px]", className)}>
    {children}
  </div>
)

export default Card
