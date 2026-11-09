import type { UserData } from "@/models/userData"

import { Toaster } from "@/components/ui/toast"
import { useCustomerHome } from "@/hooks/home/useCustomerHome"

import HomeCustomerMobile from "./HomeCustomerMobile"

const HomeCustomer = ({ data }: { data: UserData }) => {
  const state = useCustomerHome()

  return (
    <>
      <HomeCustomerMobile data={data} state={state} />
      <Toaster />
    </>
  )
}

export default HomeCustomer
