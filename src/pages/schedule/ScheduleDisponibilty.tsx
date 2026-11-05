import { useNavigate } from 'react-router-dom'

import useHead from '../../hooks/useHead'
import useFetch from '../../hooks/useFetch'
import { useWorkingHours } from '../../hooks/schedule/useWorkingHours'

import { WORKING_HOURS_PUT } from '../../api/schedule/workingHours'

import PageHeader from '../../components/commons/PageHeader'
import Card from '../../components/commons/Card'
import Subtitle from '../../components/commons/SubTitle'
import DisponibilityDay from '../../components/pages/schedule/DisponibilityDay'

import { Button } from '../../components/ui/button'
import { Field } from '../../components/ui/field'
import { toast, Toaster } from '../../components/ui/toast'
import { Spinner } from '@/components/ui/spinner'

const ScheduleDisponibilty = () => {
  useHead("Disponibilidade", "Defina seus horários de atendimento na SICH")
  const navigate = useNavigate()
  const { request, loading } = useFetch()
  const {
    days,
    errors,
    loading: loadingWorkingHours,
    isValid,
    toggleDay,
    updateInterval,
    addInterval,
    removeLastInterval,
    canAddInterval,
    getPayload
  } = useWorkingHours()

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const token = window.localStorage.getItem("token")

    if (!token || !isValid) return

    const { url, options } = WORKING_HOURS_PUT(token, getPayload())
    const { response, json } = await request(url, options)

    if (!response?.ok) {
      toast.add({
        type: "error",
        description: json?.message ?? "Não foi possível salvar a disponibilidade."
      })
      return
    }

    toast.add({
      type: "success",
      description: "Sua disponibilidade foi salva."
    })
  }

  return (
    <section className="w-full animateLeft">
      <PageHeader text="Disponibilidade" backTo="/schedule" backLabel="Voltar para agendamentos" />
      <form className="mb-3.5 flex flex-col gap-5" onSubmit={handleSubmit}>
        <Card className="px-4 py-4 mt-4 mx-6">
          <Subtitle
            text="Horários semanais"
            tip="Defina os intervalos em que você atende em cada dia. O espaço entre dois intervalos é sua pausa. Alterar o expediente não cancela agendamentos já marcados."
          />
          <div className="flex flex-col gap-3 mt-4 divide-y divide-gray-200">
            {days.map((day) => (
              <DisponibilityDay
                key={day.weekday}
                day={day}
                errors={errors[day.weekday]}
                canAddInterval={canAddInterval(day)}
                onToggle={(enabled) => toggleDay(day.weekday, enabled)}
                onChangeInterval={(index, field, value) => updateInterval(day.weekday, index, field, value)}
                onAddInterval={() => addInterval(day.weekday)}
                onRemoveInterval={() => removeLastInterval(day.weekday)}
              />
            ))}
          </div>
        </Card>

        <Field className="flex flex-row items-center gap-4 *:flex-1 px-6">
          <Button type="button" onClick={() => navigate("/schedule")} className="text-[12px] font-semibold py-5 px-8 text-sich-magenta shadow-sich-small bg-white hover:bg-white">Cancelar</Button>
          <Button className="text-[12px] font-semibold py-5 px-8 shadow-sich-button" type="submit" disabled={!isValid || loading || loadingWorkingHours}>
            {loading && <Spinner data-icon="inline-start" />}
            Salvar
          </Button>
        </Field>
      </form>

      <Toaster />
    </section>
  )
}

export default ScheduleDisponibilty
