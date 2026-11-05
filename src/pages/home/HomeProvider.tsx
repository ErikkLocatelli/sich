import type { UserDataProvider } from '@/models/userData'

import HomeHeader from '../../components/pages/home/HomeHeader'
import MobileLink from '@/components/commons/MobileLink'
import HomeShortcuts from '@/components/pages/home/HomeShortcuts'
import HomeSchedule from "@/components/pages/home/HomeSchedule"
import HomeScheduleEmpty from "@/components/pages/home/HomeScheduleEmpty"
import HomeWeekly from "@/components/pages/home/HomeWeekly"
import SubTitle from '@/components/commons/SubTitle'
import { Toaster } from '@/components/ui/toast'

import { useProviderHome } from '@/hooks/home/useProviderHome'
import { formatCurrency } from '@/services/schedule/formatters'

const HomeProvider = ({data}: {data: UserDataProvider}) => {
  const { now, todaySummary, weekSummary, upcoming } = useProviderHome()

  const labelDateFormatted = now.toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  })
  .replace(/\./g, "")
  .replace(/(^| )([a-z])/g, (_, separador, letra) => separador + letra.toUpperCase())

  return (
    <div className="w-full animateLeft">
      <HomeHeader
        data={data}
        value1={String(todaySummary?.scheduledCount ?? 0)}
        value2={formatCurrency(todaySummary?.expectedRevenue ?? 0)} />

      <MobileLink title={`Agenda de hoje · ${labelDateFormatted}`} link="Ver tudo >" href="/schedule" className="px-6 mt-10"/>

      <div className="px-6 mt-4 flex flex-col gap-4">
        {/* Waits for today's summary so the empty state doesn't flash while loading */}
        {upcoming.length > 0
          ? upcoming.map((appointment) => <HomeSchedule key={appointment.id} appointment={appointment} />)
          : todaySummary && <HomeScheduleEmpty isRestDay={todaySummary.workingMinutes === 0} />}
      </div>

      <SubTitle text="Ocupação da semana" className="px-6 mt-10"/>

      <HomeWeekly summary={weekSummary} className="mx-6 mt-4"/>

      <SubTitle text="Atalhos" className="px-6 mt-10"/>

      <HomeShortcuts className="mt-1 mx-6"/>

      <Toaster />
    </div>
  )
}

export default HomeProvider
