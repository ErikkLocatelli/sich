import { CircleQuestionMark } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "../../components/ui/tooltip"

const SubTitle = ({text, className, tip}: {text: string; className?: string; tip?: string}) => {
  if (!tip) {
    return <h3 className={`text-[15px] font-medium ${className}`}>{text}</h3>
  }

  return (
    <div className={`flex flex-row justify-start items-center gap-1.5 ${className || ""}`}>
      <h3 className="text-[15px] font-medium">{text}</h3>
      <Tooltip>
        <TooltipTrigger>
          <CircleQuestionMark className="size-3 hover:cursor-pointer" />
        </TooltipTrigger>
        <TooltipContent side={"right"} className="text-[10px] max-w-60">
          <p>{tip}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}

export default SubTitle
