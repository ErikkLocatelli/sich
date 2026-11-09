import { CalendarClock, CircleCheck } from "lucide-react"

import type { UserData } from "@/models/userData"

import MobileLink from "@/components/commons/MobileLink"
import HomeCustomerProviders from "@/components/pages/home/HomeCustomerProviders"
import HomeCustomerServices from "@/components/pages/home/HomeCustomerServices"
import HomeHeader from "@/components/pages/home/HomeHeader"

import type { CustomerHomeState } from "@/hooks/home/useCustomerHome"

const HomeCustomerMobile = ({ data, state }: { data: UserData; state: CustomerHomeState }) => {
  const { upcomingCount, completedCount, categories, categoriesLoaded, providers, providersLoaded } = state
  const hasServices = !categoriesLoaded || categories.length > 0
  const hasProviders = !providersLoaded || providers.length > 0

  return (
    <div className="w-full animateLeft pb-6">
      <HomeHeader
        data={data}
        stats={[
          { label: "Próximos agendamentos", value: String(upcomingCount), icon: CalendarClock },
          { label: "Atendimentos realizados", value: String(completedCount), icon: CircleCheck },
        ]} />

      {hasServices && (
        <>
          <MobileLink title="Serviços" link="Ver tudo ›" href="/search" className="px-6 mt-10" />
          <HomeCustomerServices categories={categories} loaded={categoriesLoaded} className="px-6 mt-4" />
        </>
      )}

      {hasProviders && (
        <>
          <MobileLink title="Profissionais em alta" link="Ver tudo ›" href="/search" className="px-6 mt-10" />
          <HomeCustomerProviders providers={providers} loaded={providersLoaded} className="px-6 mt-4" />
        </>
      )}
    </div>
  )
}

export default HomeCustomerMobile
