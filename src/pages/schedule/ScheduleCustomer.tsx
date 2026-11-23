import { Toaster } from "@/components/ui/toast"
import { useScheduleCustomer } from "@/hooks/schedule/useScheduleCustomer"
import { useIsDesktop } from "@/hooks/useMedia"

import ScheduleCustomerDesktop from "./ScheduleCustomerDesktop"
import ScheduleCustomerMobile from "./ScheduleCustomerMobile"

const ScheduleCustomer = () => {
  const isDesktop = useIsDesktop()
  const state = useScheduleCustomer()

  return (
    <>
      {isDesktop ? <ScheduleCustomerDesktop state={state} /> : <ScheduleCustomerMobile state={state} />}
      {/* Also shows the "Agendamento confirmado" toast queued by the booking screen */}
      <Toaster />
    </>
  )
}

export default ScheduleCustomer
