import type { LucideIcon } from "lucide-react"

import type { UserData, UserDataProvider } from "@/models/userData"

import NotificationBell from "@/components/commons/NotificationBell"
import SichBadge from "@/components/commons/SichBadge"
import Title from "@/components/commons/Title"
import UserInfoCard from "@/components/commons/UserInfoCard"

export type HomeHeaderStat = {
  label: string
  value: string
  icon: LucideIcon
}

type HomeHeaderProps = {
  data: UserData | UserDataProvider
  stats: HomeHeaderStat[]
  title?: string
  subtitle?: string | null
}

const HomeHeader = ({ data, stats, title, subtitle }: HomeHeaderProps) => {
  return (
    <SichBadge className="px-6 flex flex-col gap-6 py-10">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] text-white/80">{data?.city} · {data?.state}</span>
          <Title text={title ?? "Olá, " + data?.name + "!"} color="text-white" className="text-[20px] capitalize" />
          {subtitle && <span className="text-[11px] text-white/80">{subtitle}</span>}
        </div>
        <NotificationBell />
      </div>

      <div className="flex flex-row items-center gap-3">
        {stats.map((stat) => (
          <UserInfoCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} />
        ))}
      </div>
    </SichBadge>
  )
}

export default HomeHeader
