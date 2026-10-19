const Badge = ({ status }: { status: boolean }) => {
 
  const colorStats = status ? {css: "bg-[#EAFAF0] text-[#15803D]", text: "Ativo"} : {css: "bg-[#EDAD5E]/20 text-[#EDAD5E]", text: "Inativo"}

  return <span className={`font-semibold text-[9px] ${colorStats.css} py-1 px-2 rounded-full uppercase`}>{colorStats.text}</span>
}

export default Badge
