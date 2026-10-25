import { useState } from 'react'

import type { UserDataProvider } from '@/models/userData'

import HomeHeader from '../../components/pages/home/HomeHeader'
import MobileLink from '@/components/commons/MobileLink'
import HomeShortcuts from '@/components/pages/home/HomeShortcuts'
import HomeSchedule from "@/components/pages/home/HomeSchedule"
import HomeWeekly from "@/components/pages/home/HomeWeekly"
import SubTitle from '@/components/commons/SubTitle'

const HomeProvider = ({data}: {data: UserDataProvider}) => {
  const [date] = useState(new Date())

  const labelDateFormatted = date.toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  })
  .replace(/\./g, "")
  .replace(/(^| )([a-z])/g, (_, separador, letra) => separador + letra.toUpperCase())

  return (
    <div className="w-full min-h-dvh animateLeft">
      <HomeHeader data={data} value1={"6"} value2={"4,9"} />
      
      <MobileLink title={`Agenda de hoje · ${labelDateFormatted}`} link="Ver tudo >" href="/schedule" className="px-6 mt-10"/>

      <div className="px-6 mt-4 flex flex-col gap-4">
        <HomeSchedule/>
        <HomeSchedule/>
        <HomeSchedule/>
      </div>

      <SubTitle text="Ocupação da semana" className="px-6 mt-10"/>

      <HomeWeekly totalSlots={10} reservedSlots={9} filledSlots="6" freeSlots="4" bloquedSlots="1" className="mx-6 mt-4"/>

      <SubTitle text="Atalhos" className="px-6 mt-10"/>

      <HomeShortcuts className="mt-1 mx-6"/>
    </div>
  )
}

export default HomeProvider
