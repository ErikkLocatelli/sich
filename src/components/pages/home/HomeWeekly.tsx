import { Link } from "react-router-dom"
import Card from "@/components/commons/Card"
import SubTitle from "@/components/commons/SubTitle"
import SegmentedProgress from "@/components/commons/SegmentedProgress"
import StatsSummary from "@/components/commons/StatsSummary"
import type { AgendaSummaryResponse } from "@/api/schedule/appointments"
import { formatDuration } from "@/services/schedule/formatters"

import { Button } from "../../ui/button"

const HomeWeekly = ({ summary, title, className }: { summary: AgendaSummaryResponse | null; title?: string; className?: string }) => {
  return (
    <Card className={`px-4 py-6 ${className || ""}`}>
        {title && <SubTitle text={title} className="mb-4" />}
        <SegmentedProgress total={summary?.workingMinutes ?? 0} value={summary?.bookedMinutes ?? 0} />

        <div className="h-px mt-4 w-full bg-gray-100" />

        <StatsSummary
          items={[
            { value: String(summary?.scheduledCount ?? 0), label: "Atendimentos" },
            { value: formatDuration(summary?.freeMinutes ?? 0), label: "Horas livres" },
            { value: String(summary?.canceledCount ?? 0), label: "Cancelamentos" },
          ]}
        />

        <Button className="text-[12px] font-semibold py-5 px-8 shadow-sich-button w-full mt-6">
          <Link to="/schedule">Ver agenda completa</Link>
        </Button>
    </Card>
  )
}

export default HomeWeekly
