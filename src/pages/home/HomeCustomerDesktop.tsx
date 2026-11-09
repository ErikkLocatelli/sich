import type { UserData } from "@/models/userData"

import Card from "@/components/commons/Card"
import MobileLink from "@/components/commons/MobileLink"
import Title from "@/components/commons/Title"
import HomeCustomerHero from "@/components/pages/home/HomeCustomerHero"
import HomeCustomerProviders from "@/components/pages/home/HomeCustomerProviders"
import HomeCustomerServices from "@/components/pages/home/HomeCustomerServices"
import HomeCustomerUpcoming from "@/components/pages/home/HomeCustomerUpcoming"

import type { CustomerHomeState } from "@/hooks/home/useCustomerHome"
import { CUSTOMER_HOME_COPY } from "@/services/home/customerHome"

const HomeCustomerDesktop = ({ data, state }: { data: UserData; state: CustomerHomeState }) => {
  const {
    upcoming, upcomingLoaded, nextAppointmentLabel, upcomingCount, completedCount,
    categories, categoriesLoaded, providers, providersLoaded,
  } = state
  const hasServices = !categoriesLoaded || categories.length > 0
  const hasProviders = !providersLoaded || providers.length > 0

  return (
    <section className="flex w-full flex-col gap-6 px-10 py-8 animateLeft">
      <header className="flex flex-col gap-1">
        <Title text={`Olá, ${data.name}`} className="capitalize lg:text-left lg:text-[26px] lg:font-bold lg:tracking-[-0.4px]" />
        <span className="text-[13px] text-sich-label">{CUSTOMER_HOME_COPY.subtitle}</span>
      </header>

      <div className="grid grid-cols-[minmax(0,1fr)_360px] items-start gap-6">
        <div className="flex flex-col gap-6">
          <HomeCustomerHero
            upcomingCount={upcomingCount}
            completedCount={completedCount}
            nextAppointmentLabel={nextAppointmentLabel} />

          {hasServices && (
            <Card className="flex flex-col gap-4 border border-sich-border p-5.5">
              <MobileLink title="Serviços" link="Ver tudo ›" href="/search" />
              <HomeCustomerServices categories={categories} loaded={categoriesLoaded} className="gap-4.5" />
            </Card>
          )}

          {hasProviders && (
            <Card className="flex flex-col gap-4 border border-sich-border p-5.5">
              <MobileLink title="Profissionais em alta" link="Ver tudo ›" href="/search" />
              <HomeCustomerProviders variant="grid" providers={providers} loaded={providersLoaded} />
            </Card>
          )}
        </div>

        <HomeCustomerUpcoming upcoming={upcoming} loaded={upcomingLoaded} className="border border-sich-border" />
      </div>
    </section>
  )
}

export default HomeCustomerDesktop
