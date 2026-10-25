import { HandCoins, Handshake, BriefcaseBusiness, Star } from "lucide-react"

import type { UserData, UserDataProvider } from "@/models/userData"

import NotificationBell from "@/components/commons/NotificationBell"
import SichBadge from "@/components/commons/SichBadge"
import Title from "@/components/commons/Title"
import UserInfoCard from "@/components/commons/UserInfoCard"

const HomeHeader = ({ data, value1, value2 }: { data: UserData | UserDataProvider; value1: string; value2: string }) => {
  return (
    <SichBadge className="px-6 flex flex-col gap-6 py-10">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] text-white/80">{data?.city} · {data?.state}</span>
          <Title text={"Olá, " + data?.name + "!"} color="text-white" className="text-[20px] capitalize" />
        </div>
        <NotificationBell />
      </div>
      
      <div className="flex flex-row items-center gap-3">
        <UserInfoCard label={data.userType === "CUSTOMER" ? "Saldo cashback" : "Atendimentos de hoje"} value={value1} icon={data.userType === "CUSTOMER" ? HandCoins : BriefcaseBusiness} />
        <UserInfoCard label={data.userType === "CUSTOMER" ? "Fidelidade" : "Avaliação média"} value={value2} icon={data.userType === "CUSTOMER" ? Handshake : Star} />
      </div>
    </SichBadge>
  )
}

export default HomeHeader
