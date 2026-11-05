import useHead from '../../hooks/useHead'
import { useIsDesktop } from '@/hooks/useMedia'
import { useScheduleDisponibility } from '../../hooks/schedule/useScheduleDisponibility'
import { Toaster } from '../../components/ui/toast'

import ScheduleDisponibiltyDesktop from './ScheduleDisponibiltyDesktop'
import ScheduleDisponibiltyMobile from './ScheduleDisponibiltyMobile'

const ScheduleDisponibilty = () => {
  useHead("Disponibilidade", "Defina seus horários de atendimento na SICH")
  const isDesktop = useIsDesktop()
  const state = useScheduleDisponibility()

  return (
    <>
      {isDesktop ? <ScheduleDisponibiltyDesktop state={state} /> : <ScheduleDisponibiltyMobile state={state} />}
      <Toaster />
    </>
  )
}

export default ScheduleDisponibilty
