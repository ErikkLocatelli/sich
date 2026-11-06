import { BanknoteArrowUp, BriefcaseBusiness } from "lucide-react"

import type { UserDataProvider } from "@/models/userData"

import Card from "@/components/commons/Card"
import MobileLink from "@/components/commons/MobileLink"
import SummaryCard from "@/components/commons/SummaryCard"
import Title from "@/components/commons/Title"
import HomeScheduleList from "@/components/pages/home/HomeScheduleList"
import HomeShortcuts from "@/components/pages/home/HomeShortcuts"
import HomeWeekly from "@/components/pages/home/HomeWeekly"
import { Skeleton } from "@/components/ui/skeleton"

import type { ProviderHomeState } from "@/hooks/home/useProviderHome"
import { formatCurrency } from "@/services/schedule/formatters"

const HomeProviderDesktop = ({ data, state }: { data: UserDataProvider; state: ProviderHomeState }) => {
  const { todaySummary, weekSummary, upcoming, emptyDay, greeting, remainingCount, todayLabel } = state

  return (
    <section className="flex w-full flex-col gap-6 px-10 py-8 animateLeft">
      <header className="flex flex-col gap-1">
        <Title text={`${greeting}, ${data.name}`} className="capitalize lg:text-left lg:text-[26px] lg:font-bold" />
        {remainingCount
          ? <span className="text-[13px] text-sich-label">{remainingCount}</span>
          : <Skeleton className="h-4 w-56" />}
      </header>

      <div className="grid grid-cols-2 gap-6">
        <SummaryCard icon={BriefcaseBusiness} value={todaySummary?.scheduledCount ?? 0} label="Atendimentos hoje" />
        <SummaryCard icon={BanknoteArrowUp} value={formatCurrency(todaySummary?.expectedRevenue ?? 0)} label="Previsto para hoje" />
      </div>

      <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-start gap-6">
        <Card className="flex flex-col gap-4 p-5">
          <MobileLink title={`Agenda de hoje · ${todayLabel}`} link="Ver agenda completa ›" href="/schedule" />
          <HomeScheduleList upcoming={upcoming} emptyDay={emptyDay} layout="row" />
        </Card>

        <div className="flex flex-col gap-6">
          <HomeWeekly summary={weekSummary} title="Ocupação da semana" />
          <HomeShortcuts title="Atalhos" className="my-0 px-5 pt-3" />
        </div>
      </div>
    </section>
  )
}

export default HomeProviderDesktop
