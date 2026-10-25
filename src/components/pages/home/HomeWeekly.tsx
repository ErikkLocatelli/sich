import { Link } from "react-router-dom"
import Card from "@/components/commons/Card"
import SegmentedProgress from "@/components/commons/SegmentedProgress"
import StatsSummary from "@/components/commons/StatsSummary"

import { Button } from "../../ui/button"

type HomeWeeklyProps = {
  totalSlots: number
  reservedSlots: number
  filledSlots: string
  freeSlots: string
  bloquedSlots: string
  className?: string
}

const HomeWeekly = ({ totalSlots, reservedSlots, filledSlots, freeSlots, bloquedSlots, className }: HomeWeeklyProps) => {
  return (
    <Card className={`px-4 py-6 ${className}`}>
        <SegmentedProgress total={totalSlots} value={reservedSlots} />

        <div className="h-px mt-4 w-full bg-gray-100" />

        <StatsSummary
          items={[
            { value: filledSlots, label: "Atendimentos" },
            { value: freeSlots, label: "Horários livres" },
            { value: bloquedSlots, label: "Bloqueios" },
          ]}
        />

        <Button className="text-[12px] font-semibold py-5 px-8 shadow-sich-button w-full mt-6">
          <Link to="/schedule">Ver agenda completa</Link>
        </Button>
    </Card>
  )
}

export default HomeWeekly
