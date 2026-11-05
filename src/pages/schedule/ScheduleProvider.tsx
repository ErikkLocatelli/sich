import { Toaster } from "@/components/ui/toast"
import { useIsDesktop } from "@/hooks/useMedia"
import { useScheduleProvider } from "@/hooks/schedule/useScheduleProvider"

import ScheduleProviderDesktop from "./ScheduleProviderDesktop"
import ScheduleProviderMobile from "./ScheduleProviderMobile"

const ScheduleProvider = () => {
  const isDesktop = useIsDesktop()
  const state = useScheduleProvider()

  return (
    <>
      {isDesktop ? <ScheduleProviderDesktop state={state} /> : <ScheduleProviderMobile state={state} />}
      <Toaster />
    </>
  )
}

export default ScheduleProvider
