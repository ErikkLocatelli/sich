import { cn } from "@/lib/utils"

const Title = ({text, color, className} : {text: string, color?: string, className?: string}) => {
  return (
    <h2 className={cn("text-[18px] lg:text-[28px] font-semibold lg:text-center", color || "text-sich-heading", className)}>{text}</h2>
  )
}

export default Title
