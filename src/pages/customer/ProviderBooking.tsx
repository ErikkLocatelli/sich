import useHead from "@/hooks/useHead"
import { useIsDesktop } from "@/hooks/useMedia"
import { useProviderBookingPage } from "@/hooks/search/useProviderBookingPage"

import NotFound from "@/components/commons/NotFound"
import { Toaster } from "@/components/ui/toast"

import ProviderBookingDesktop from "./ProviderBookingDesktop"
import ProviderBookingMobile from "./ProviderBookingMobile"

const ProviderBooking = () => {
  useHead("Agendamento", "Agende um serviço com o profissional na SICH")
  const isDesktop = useIsDesktop()
  const state = useProviderBookingPage()

  if (!state.validProvider) return <NotFound />

  return (
    <>
      {isDesktop ? <ProviderBookingDesktop state={state} /> : <ProviderBookingMobile state={state} />}
      <Toaster />
    </>
  )
}

export default ProviderBooking
