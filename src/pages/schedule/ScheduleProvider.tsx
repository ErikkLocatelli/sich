import { useState } from "react"

import Title from "@/components/commons/Title"
import Card from "@/components/commons/Card"
import SichText from "@/components/commons/SichText"
import MobileLink from "@/components/commons/MobileLink"
import DataPicker from "@/components/pages/schedule/DataPicker"
import DayCalendar from "@/components/pages/schedule/DayCalendar"
import ScheduleHistory from "@/components/pages/schedule/ScheduleHistory"
import { Toaster } from "@/components/ui/toast"

import { CircleCheck, CircleX } from 'lucide-react';

import { SlideToggle } from "@/components/form/SlideToggle"
import usePreviousRoute from "../../hooks/usePreviousRoute"
import { useAgenda } from "../../hooks/schedule/useAgenda"
import { useAppointmentHistory } from "../../hooks/schedule/useAppointmentHistory"
import { dayTitle, parseIsoDate, periodLabel, toIsoDate, weekDays, type AgendaView } from "../../services/schedule/agendaDates"

const VIEWS: AgendaView[] = ["day", "week", "month"]
const HISTORY_SIZE = 5

const ScheduleProvider = () => {
  const previousRoute = usePreviousRoute()
  const [selectedView, setSelectedView] = useState(0)
  const [selectedDate, setSelectedDate] = useState(() => toIsoDate(new Date()))
  const view = VIEWS[selectedView]
  const date = parseIsoDate(selectedDate)
  const days = weekDays(date)
  const { blocks, summary } = useAgenda(selectedDate, view)
  const { appointments: history } = useAppointmentHistory(HISTORY_SIZE)

  return (
    <section className={`w-full px-6 ${previousRoute === "/" ? "animateRight" : "animateLeft"}`}>
      <div className="flex flex-col gap-2">
        <Title text="Controle de agenda" className="mt-4"/>
        <span className="text-[11px] text-sich-label">
          {periodLabel(view, date)}
        </span>
        <SlideToggle
          variant="outline"
          selectedIndex={selectedView}
          onSelectedIndexChange={setSelectedView}
          options={[
            { children: "Dia" },
            { children: "Semana" },
            { children: "Mês" },
          ]}
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

        <DayCalendar
          key={selectedDate}
          className="mt-7 flex items-center flex-col gap-2 mb-3 animateLeft"
          title={dayTitle(date)}
          blocks={blocks} />
      </Card>

      <Card className="px-3 py-4 mt-4 mb-3">
        <MobileLink title="Histórico" link={"Ver tudo >"} />

        {history.length === 0 ? (
          <span className="block mt-3 text-[11px] text-black/20">Nenhum atendimento realizado</span>
        ) : (
          <div className="divide-y divide-gray-200">
            {history.map((appointment) => (
              <ScheduleHistory key={appointment.id} appointment={appointment} />
            ))}
          </div>
        )}
      </Card>

      <Toaster />
    </section>
  )
}

export default ScheduleProvider
