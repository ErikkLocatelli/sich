import type { LucideIcon } from "lucide-react"

import Card from "./Card"

const SummaryCard = ({ icon: Icon, value, label }: { icon: LucideIcon; value: string | number; label: string }) => (
  <Card className="flex items-center gap-4 p-5">
    <Icon className="shrink-0" />
    <div className="flex flex-col">
      <span className="text-[26px] font-bold leading-tight tracking-[-0.5px] text-sich-heading">{value}</span>
      <span className="text-[12px] text-sich-label">{label}</span>
    </div>
  </Card>
)

export default SummaryCard
