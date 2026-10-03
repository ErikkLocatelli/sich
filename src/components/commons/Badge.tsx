const Badge = ({text, status}:{text: string, status: "professional" | "active" | "paused"}) => {
  const colorStats = {
    "professional": "bg-[#FFD1E1]/80 text-sich-magenta",
    "active": "bg-[#EAFAF0] text-[#15803D]", 
    "paused": "bg-[#EDAD5E]/20 text-[#EDAD5E]",
  }  
  

  return <span className={`font-semibold text-[9px] ${colorStats[status]} py-1 px-2 rounded-full uppercase`}>{text}</span>
}

export default Badge
