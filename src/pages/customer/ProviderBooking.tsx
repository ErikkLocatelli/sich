import useHead from "@/hooks/useHead"
import { useProviderBookingPage } from "@/hooks/search/useProviderBookingPage"

import NotFound from "@/components/commons/NotFound"
import { Toaster } from "@/components/ui/toast"

import ProviderBookingMobile from "./ProviderBookingMobile"

const ProviderBooking = () => {
  useHead("Agendamento", "Agende um serviço com o profissional na SICH")
  const state = useProviderBookingPage()

  if (!state.validProvider) return <NotFound />

  return (
    <>
      <ProviderBookingMobile state={state} />
      <Toaster />
    </>
  )
}

export default ProviderBooking
