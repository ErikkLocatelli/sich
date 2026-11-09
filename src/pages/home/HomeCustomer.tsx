import type { UserData } from "@/models/userData"

import { Toaster } from "@/components/ui/toast"
import { useCustomerHome } from "@/hooks/home/useCustomerHome"
import { useIsDesktop } from "@/hooks/useMedia"

import HomeCustomerDesktop from "./HomeCustomerDesktop"
import HomeCustomerMobile from "./HomeCustomerMobile"

const HomeCustomer = ({ data }: { data: UserData }) => {
  const isDesktop = useIsDesktop()
  const state = useCustomerHome()

  return (
    <>
      {isDesktop ? <HomeCustomerDesktop data={data} state={state} /> : <HomeCustomerMobile data={data} state={state} />}
      <Toaster />
    </>
  )
}

export default HomeCustomer
