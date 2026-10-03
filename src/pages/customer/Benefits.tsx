import useHead from '../../hooks/useHead'

import SichBadge from '../../components/commons/SichBadge'
import Title from '../../components/commons/Title'
import UserInfoCard from '../../components/commons/UserInfoCard'

import { User } from 'lucide-react'

const Benefits = () => {
  useHead("Benefícios", "Confira seus benefícios na SICH")

  return (
    <>
      <SichBadge className="px-6 flex flex-col gap-3 py-6">
        <div>
          <span className="text-[11px] text-white/80">Benefícios SICH</span>
          <Title text="Sua Carteira" color="text-white" />
        </div>

        <UserInfoCard label="Saldo cashback" value={"R$ 100,00"} icon={User} detail="uso em até 20% por serviço" />
      </SichBadge>
    </>
  )
}

export default Benefits
