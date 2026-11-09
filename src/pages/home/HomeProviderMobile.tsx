import { BanknoteArrowUp, BriefcaseBusiness } from 'lucide-react'

import type { UserDataProvider } from '@/models/userData'

import HomeHeader from '@/components/pages/home/HomeHeader'
import MobileLink from '@/components/commons/MobileLink'
import HomeShortcuts from '@/components/pages/home/HomeShortcuts'
import HomeScheduleList from "@/components/pages/home/HomeScheduleList"
import HomeWeekly from "@/components/pages/home/HomeWeekly"
import SubTitle from '@/components/commons/SubTitle'

import type { ProviderHomeState } from '@/hooks/home/useProviderHome'
import { formatCurrency } from '@/services/schedule/formatters'

const HomeProviderMobile = ({ data, state }: { data: UserDataProvider; state: ProviderHomeState }) => {
  const { todaySummary, weekSummary, upcoming, emptyDay, greeting, remainingCount, todayLabel } = state

  return (
    <div className="w-full animateLeft">
      <HomeHeader
        data={data}
        title={`${greeting}, ${data.name}`}
        subtitle={remainingCount}
        stats={[
          { label: "Atendimentos de hoje", value: String(todaySummary?.scheduledCount ?? 0), icon: BriefcaseBusiness },
          { label: "Receita prevista hoje", value: formatCurrency(todaySummary?.expectedRevenue ?? 0), icon: BanknoteArrowUp },
        ]} />

      <MobileLink title={`Agenda de hoje · ${todayLabel}`} link="Ver tudo >" href="/schedule" className="px-6 mt-10"/>

      <HomeScheduleList upcoming={upcoming} emptyDay={emptyDay} className="px-6 mt-4" />

      <SubTitle text="Ocupação da semana" className="px-6 mt-10"/>

      <HomeWeekly summary={weekSummary} className="mx-6 mt-4"/>

      <SubTitle text="Atalhos" className="px-6 mt-10"/>

      <HomeShortcuts className="mt-1 mx-6"/>
    </div>
  )
}

export default HomeProviderMobile
