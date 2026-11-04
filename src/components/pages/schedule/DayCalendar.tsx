import SubTitle from "@/components/commons/SubTitle"
import ScheduleAppointment from "@/components/pages/schedule/ScheduleAppointment"
import type { TimelineBlock } from "@/services/schedule/dayTimeline"

const DayCalendar = ({ title, blocks, className }: { title: string; blocks: TimelineBlock[]; className?: string }) => {
  return (
    <section className={`w-full ${className || ""}`}>
      <SubTitle text={title} />
      {blocks.length === 0 ? (
        <span className="text-[11px] text-black/20">Dia sem atendimento</span>
      ) : (
        <div className="grid w-full grid-cols-[max-content_1fr] gap-2">
          {blocks.map((block) => (
            <ScheduleAppointment key={`${block.type}-${block.start}`} block={block} />
          ))}
        </div>
      )}
    </section>
  )
}

export default DayCalendar
