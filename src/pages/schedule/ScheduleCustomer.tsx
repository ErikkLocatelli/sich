import usePreviousRoute from "../../hooks/usePreviousRoute"

import { Toaster } from "@/components/ui/toast"

const ScheduleCustomer = () => {
  const previousRoute = usePreviousRoute()

  return (
    <div className={previousRoute === "/" || previousRoute?.startsWith("/search") ? "animateRight" : "animateLeft"}>
      agenda do cliente funciona
      {/* Shows the "Agendamento confirmado" toast queued by the booking screen */}
      <Toaster />
    </div>
  )
}

export default ScheduleCustomer
