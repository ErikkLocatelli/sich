import { useState } from "react"

import Title from "@/components/commons/Title"
import Card from "@/components/commons/Card"
import SichText from "@/components/commons/SichText"
import MobileLink from "@/components/commons/MobileLink"
import DataPicker from "@/components/pages/schedule/DataPicker"
import DayCalendar from "@/components/pages/schedule/DayCalendar"
import ScheduleHistory from "@/components/pages/schedule/ScheduleHistory"

import { CircleCheck, CircleX } from 'lucide-react';

import { SlideToggle } from "@/components/form/SlideToggle"
import usePreviousRoute from "../../hooks/usePreviousRoute"

export type CalendarView = {
  value: string
  label: string
}

const ScheduleProvider = () => {
  const previousRoute = usePreviousRoute()
  const [selectedView, setSelectedView] = useState(0)
  const [selectedDate, setSelectedDate] = useState("1")

  const scheduleMessage = () => {
    switch (selectedView) {
      case 0:
        return "Dia 12 de maio de 2026"
      case 1:
        return "Semana de 12 a 17 de maio de 2026"
      case 2:
        return "Mês de maio de 2026"
      default:
        return ""
    }
  }

  const days: CalendarView[] = [
    { value: "1", label: "Dom" },
    { value: "2", label: "Seg" },
    { value: "3", label: "Ter" },
    { value: "4", label: "Qua" },
    { value: "5", label: "Qui" },
    { value: "6", label: "Sex" },
    { value: "7", label: "Sab" },
  ]

  const calendar: () => CalendarView | undefined = () => {
    const complete = days.find((day) => day.value === selectedDate)
    return complete
  }

  return (
    <section className={`w-full px-6 ${previousRoute === "/" ? "animateRight" : "animateLeft"}`}>
      <div className="flex flex-col gap-2">
        <Title text="Controle de agenda" className="mt-4"/>
        <span className="text-[11px] text-sich-label">
          {scheduleMessage()}
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
          <SichText text={"28"} className="text-[11px]" />
          <span className="text-[11px] text-sich-label">Confirmados</span>
        </Card>
        <Card>
          <CircleX />
          <SichText text={"0"} className="text-[11px]" />
          <span className="text-[11px] text-sich-label">Cancelamentos</span>
        </Card>
      </div>

      <Card className="px-3 py-4 mt-4 mb-3">
        <MobileLink title="Grade diária" link={"Editar disponibilidade >"} href={"/schedule/disponibility"}/>
        <DataPicker 
          days={days}
          selectedDate={selectedDate} 
          onSelectedDateChange={setSelectedDate} 
          className="mt-3" />

        <DayCalendar 
          className="mt-7 flex items-center flex-col gap-2 mb-3 animateLeft"
          day={calendar() || days[0]} />
      </Card>

      <Card className="px-3 py-4 mt-4 mb-3">
        <MobileLink title="Histórico" link={"Ver tudo >"} />
        
        <div className="divide-y divide-gray-200">
          {days.map((day) => (
            <ScheduleHistory key={day.value} />
          ))}
      </div>
      </Card>
    </section>
  )
}

export default ScheduleProvider
