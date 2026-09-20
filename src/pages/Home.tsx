import { useContext } from 'react'

import { userContext } from '../services/userContext'
import useHead from '../hooks/useHead'

import SichBadge from '../components/commons/SichBadge'
import Title from '../components/commons/Title'
import UserInfoCard from '../components/commons/UserInfoCard'
import NotificationBell from '../components/commons/NotificationBell'
import MobileLink from '../components/commons/MobileLink'
import ServiceInfoCard from '../components/commons/ServiceInfoCard'
import PromoCard from '../components/commons/PromoCard'
import ProfessionalInfoCard from '../components/commons/ProfessionalInfoCard'
import Input from '../components/form/Input'

import { UserRoundSearch } from 'lucide-react';
import { HandCoins } from 'lucide-react';
import { Handshake } from 'lucide-react';

const Home = () => {
  useHead("Página Inicial", "Acesse seus agendamentos e benefícios na SICH")

  const { data } = useContext(userContext)

  return (
    <div className="w-full min-h-dvh">
      <SichBadge className="px-6 flex flex-col gap-4 py-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="text-[11px] text-white/80">{data?.city} · {data?.state}</span>
            <Title text={"Olá, " + data?.name + "!"} color="text-white" />
          </div>
          <NotificationBell />
        </div>

        <Input type="text" placeholder="Buscar serviços ou profissional" icon={UserRoundSearch} />

        <div className="flex flex-row items-center gap-3">
          <UserInfoCard label="Saldo cashback" value={"R$ 100,00"} icon={HandCoins} />
          <UserInfoCard label="Fidelidade" value={"3/5"} icon={Handshake} />
        </div>
      </SichBadge>

      <MobileLink title="Serviços" link="Ver todos >"/>

      <div className="px-6 mt-5 flex flex-col gap-3">
        <div className="flex flex-row gap-3">
          <ServiceInfoCard service='Esmaltaçao' desc='a partir R$95' />
          <ServiceInfoCard service='Esmaltaçao' desc='a partir R$95' />
          <ServiceInfoCard service='Esmaltaçao' desc='a partir R$95' />
        </div>

        <div className="flex flex-row gap-3">
          <ServiceInfoCard service='Esmaltaçao' desc='a partir R$95' />
          <ServiceInfoCard service='Esmaltaçao' desc='a partir R$95' />
          <ServiceInfoCard service='Esmaltaçao' desc='a partir R$95' />
        </div>
      </div>

      <PromoCard promo="Mani + Pedi com 15% off" cupom="SICH10" data="31/12/2024" className="mt-6 mx-6"/>

      <MobileLink title="Profissionais em alta" link="Ver todos >"/>

      <div className="px-6 mt-5 flex flex-col gap-3 mb-5">
        <ProfessionalInfoCard name='Ana Beatriz' url=''/>
         
        <ProfessionalInfoCard name='Carlos Silva' url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcvCvrhqSV6XXx9-KRvCqAEyjmTqtDERQqt1ZNPRdg5g&s=10"/>
        
        <ProfessionalInfoCard name='Maria Oliveira'/>
      </div>
      
    </div>
  )
}

export default Home
