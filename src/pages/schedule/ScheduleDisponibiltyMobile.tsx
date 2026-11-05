import PageHeader from '../../components/commons/PageHeader'
import Card from '../../components/commons/Card'
import Subtitle from '../../components/commons/SubTitle'
import DisponibilityDay from '../../components/pages/schedule/DisponibilityDay'
import DisponibilityActions from '../../components/pages/schedule/DisponibilityActions'

import type { ScheduleDisponibilityState } from '../../hooks/schedule/useScheduleDisponibility'
import { DISPONIBILITY_TIP } from './disponibilityCopy'

const ScheduleDisponibiltyMobile = ({ state }: { state: ScheduleDisponibilityState }) => {
  const { days, dayProps, handleSubmit, saving, canSubmit, cancel } = state

  return (
    <section className="w-full animateLeft">
      <PageHeader text="Disponibilidade" backTo="/schedule" backLabel="Voltar para agendamentos" />
      <form className="mb-3.5 flex flex-col gap-5" onSubmit={handleSubmit}>
        <Card className="px-4 py-4 mt-4 mx-6">
          <Subtitle text="Horários semanais" tip={DISPONIBILITY_TIP} />
          <div className="flex flex-col gap-3 mt-4 divide-y divide-gray-200">
            {days.map((day) => (
              <DisponibilityDay key={day.weekday} {...dayProps(day)} />
            ))}
          </div>
        </Card>

        <DisponibilityActions saving={saving} canSubmit={canSubmit} onCancel={cancel} className="*:flex-1 px-6" />
      </form>
    </section>
  )
}

export default ScheduleDisponibiltyMobile
