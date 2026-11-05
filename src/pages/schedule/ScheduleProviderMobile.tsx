import Title from "@/components/commons/Title"
import Card from "@/components/commons/Card"
import SichText from "@/components/commons/SichText"
import MobileLink from "@/components/commons/MobileLink"
import DataPicker from "@/components/pages/schedule/DataPicker"
import DayCalendar from "@/components/pages/schedule/DayCalendar"
import DayCalendarSkeleton from "@/components/pages/schedule/DayCalendarSkeleton"
import { Skeleton } from "@/components/ui/skeleton"
import ScheduleHistoryList from "@/components/pages/schedule/ScheduleHistoryList"
import TimelineLegend from "@/components/pages/schedule/TimelineLegend"
import { SlideToggle } from "@/components/form/SlideToggle"

import { CircleCheck, CircleX } from "lucide-react"

import { VIEW_OPTIONS, type ScheduleProviderState } from "@/hooks/schedule/useScheduleProvider"

const ScheduleProviderMobile = ({ state }: { state: ScheduleProviderState }) => {
  const { animationClass, selectedView, setSelectedView, selectedDate, setSelectedDate, days, periodLabel, dayTitle, daySummary, blocks, summary, agendaLoaded, history, historyLoaded } = state

  return (
    <section className={`w-full px-6 ${animationClass}`}>
      <div className="flex flex-col gap-2">
        <Title text="Controle de agenda" className="mt-4"/>
        <span className="text-[11px] text-sich-label">{periodLabel}</span>
        <SlideToggle
          variant="outline"
          selectedIndex={selectedView}
          onSelectedIndexChange={setSelectedView}
          options={VIEW_OPTIONS}
          aria-label="Selecionar visualização da agenda"
        />
      </div>

      <div className="mt-4 flex gap-4 *:w-full *:p-3 *:flex *:flex-col *:justify-center *:items-center *:gap-2">
        <Card>
          <CircleCheck />
          <SichText text={String(summary?.scheduledCount ?? 0)} className="text-[11px]" />
          <span className="text-[11px] text-sich-label">Confirmados</span>
        </Card>
        <Card>
          <CircleX />
          <SichText text={String(summary?.canceledCount ?? 0)} className="text-[11px]" />
          <span className="text-[11px] text-sich-label">Cancelamentos</span>
        </Card>
      </div>

      <Card className="px-3 py-4 mt-4 mb-3">
        <MobileLink title="Grade semanal" link={"Editar disponibilidade >"} href={"/schedule/disponibility"}/>
        <DataPicker
          days={days}
          selectedDate={selectedDate}
          onSelectedDateChange={setSelectedDate}
          className="mt-3" />
        {agendaLoaded ? (
          <>
            <span className="mt-3 block text-[11px] text-sich-label">{daySummary}</span>
            <DayCalendar
              key={selectedDate}
              className="mt-7 flex items-center flex-col gap-2 mb-3 animateLeft"
              title={dayTitle}
              blocks={blocks} />
          </>
        ) : (
          <>
            <Skeleton className="mt-3 h-2.5 w-48" />
            <DayCalendarSkeleton className="mt-7 mb-3" />
          </>
        )}
        <TimelineLegend />
      </Card>

      <Card className="px-3 py-4 mt-4 mb-3">
        <MobileLink title="Histórico" link={"Ver tudo >"} href="/schedule/history" />
        <ScheduleHistoryList history={history} loaded={historyLoaded} />
      </Card>
    </section>
  )
}

export default ScheduleProviderMobile
