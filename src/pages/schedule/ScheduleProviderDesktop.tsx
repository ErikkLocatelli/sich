import type { LucideIcon } from "lucide-react"
import { CircleCheck, CircleX } from "lucide-react"

import Title from "@/components/commons/Title"
import Card from "@/components/commons/Card"
import SubTitle from "@/components/commons/SubTitle"
import LabelLink from "@/components/commons/LabelLink"
import MobileLink from "@/components/commons/MobileLink"
import DataPicker from "@/components/pages/schedule/DataPicker"
import WeekGrid from "@/components/pages/schedule/WeekGrid"
import WeekGridSkeleton from "@/components/pages/schedule/WeekGridSkeleton"
import { Skeleton } from "@/components/ui/skeleton"
import TimelineLegend from "@/components/pages/schedule/TimelineLegend"
import ScheduleHistoryList from "@/components/pages/schedule/ScheduleHistoryList"
import { SlideToggle } from "@/components/form/SlideToggle"

import { VIEW_OPTIONS, type ScheduleProviderState } from "@/hooks/schedule/useScheduleProvider"
import { monthTitle } from "@/services/schedule/agendaDates"

const SummaryCard = ({ icon: Icon, value, label }: { icon: LucideIcon; value: number; label: string }) => (
  <Card className="flex items-center gap-4 p-5">
    <Icon className="shrink-0" />
    <div className="flex flex-col">
      <span className="text-[26px] font-bold leading-tight tracking-[-0.5px] text-sich-heading">{value}</span>
      <span className="text-[12px] text-sich-label">{label}</span>
    </div>
  </Card>
)

const ScheduleProviderDesktop = ({ state }: { state: ScheduleProviderState }) => {
  const { animationClass, selectedView, setSelectedView, selectedDate, setSelectedDate, goToToday, days, periodLabel, daySummary, week, summary, agendaLoaded, history, historyLoaded } = state

  return (
    <section className={`flex w-full flex-col gap-6 px-10 py-8 ${animationClass}`}>
      <header className="flex items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <Title text="Controle de agenda" className="lg:text-left lg:text-[26px] lg:font-bold"/>
          <span className="text-[13px] text-sich-label">{periodLabel}</span>
        </div>
        <SlideToggle
          variant="outline"
          className="h-12 w-60 rounded-[14px] text-[13px]"
          selectedIndex={selectedView}
          onSelectedIndexChange={setSelectedView}
          options={VIEW_OPTIONS}
          aria-label="Selecionar visualização da agenda"
        />
      </header>

      <div className="grid grid-cols-2 gap-6">
        <SummaryCard icon={CircleCheck} value={summary?.scheduledCount ?? 0} label="Confirmados" />
        <SummaryCard icon={CircleX} value={summary?.canceledCount ?? 0} label="Cancelamentos" />
      </div>

      <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-start gap-6">
        <Card className="flex flex-col gap-5 p-5">
          <MobileLink title="Grade semanal" link="Editar disponibilidade ›" href="/schedule/disponibility" />
          {agendaLoaded ? <WeekGrid week={week} selectedDate={selectedDate} /> : <WeekGridSkeleton />}
          <TimelineLegend />
        </Card>

        <div className="flex flex-col gap-6">
          <Card className="flex flex-col gap-4 p-5">
            <div className="flex items-center justify-between">
              <SubTitle text={monthTitle(selectedDate.slice(0, 7))} />
              <button type="button" onClick={goToToday} className="hover:cursor-pointer">
                <LabelLink label="Hoje" className="text-[12px]" />
              </button>
            </div>
            <DataPicker days={days} selectedDate={selectedDate} onSelectedDateChange={setSelectedDate} />
            {agendaLoaded
              ? <span className="text-[12px] text-sich-label">{daySummary}</span>
              : <Skeleton className="h-3 w-52" />}
          </Card>

          <Card className="p-5">
            <MobileLink title="Histórico recente" link="Ver tudo ›" href="/schedule/history" />
            <ScheduleHistoryList history={history} loaded={historyLoaded} />
          </Card>
        </div>
      </div>
    </section>
  )
}

export default ScheduleProviderDesktop
