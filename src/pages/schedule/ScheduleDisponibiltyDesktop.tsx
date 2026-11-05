import PageHeader from '../../components/commons/PageHeader'
import Card from '../../components/commons/Card'
import Subtitle from '../../components/commons/SubTitle'
import DisponibilityDayRow from '../../components/pages/schedule/DisponibilityDayRow'
import DisponibilityActions from '../../components/pages/schedule/DisponibilityActions'
import WeekGrid from '../../components/pages/schedule/WeekGrid'
import TimelineLegend from '../../components/pages/schedule/TimelineLegend'

import type { ScheduleDisponibilityState } from '../../hooks/schedule/useScheduleDisponibility'
import { DISPONIBILITY_TIP } from './disponibilityCopy'

const ScheduleDisponibiltyDesktop = ({ state }: { state: ScheduleDisponibilityState }) => {
  const { days, dayProps, handleSubmit, saving, canSubmit, cancel, preview } = state

  return (
    <section className="flex w-full flex-col gap-6 pb-8 animateLeft">
      <PageHeader text="Disponibilidade" backTo="/schedule" backLabel="Voltar para agendamentos" className="px-10" />

      <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-start gap-6 px-10">
        <form onSubmit={handleSubmit}>
          <Card className="flex flex-col p-5">
            <Subtitle text="Horários semanais" tip={DISPONIBILITY_TIP} />
            <div className="mt-2 divide-y divide-sich-border">
              {days.map((day) => (
                <DisponibilityDayRow key={day.weekday} {...dayProps(day)} />
              ))}
            </div>
            <DisponibilityActions saving={saving} canSubmit={canSubmit} onCancel={cancel} className="mt-4 justify-end *:w-auto" />
          </Card>
        </form>

        <Card className="flex flex-col gap-5 p-5">
          <Subtitle text="Prévia da semana" />
          <WeekGrid week={preview} compact />
          <TimelineLegend types={["free", "break"]} />
        </Card>
      </div>
    </section>
  )
}

export default ScheduleDisponibiltyDesktop
