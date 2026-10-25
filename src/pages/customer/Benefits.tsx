import useHead from '../../hooks/useHead'
import usePreviousRoute from '../../hooks/usePreviousRoute'

import SichBadge from '../../components/commons/SichBadge'
import Title from '../../components/commons/Title'
import UserInfoCard from '../../components/commons/UserInfoCard'

import { User } from 'lucide-react'

const Benefits = () => {
  useHead("Benefícios", "Confira seus benefícios na SICH")
  const previousRoute = usePreviousRoute()

  return (
    <div className={previousRoute === "/profile" ? "animateLeft" : "animateRight"}>
      <SichBadge className="px-6 flex flex-col gap-3 py-6">
        <div>
          <span className="text-[11px] text-white/80">Benefícios SICH</span>
          <Title text="Sua Carteira" color="text-white" />
        </div>

        <UserInfoCard label="Saldo cashback" value={"R$ 100,00"} icon={User} detail="uso em até 20% por produto" />
      </SichBadge>
    </div>
  )
}

export default Benefits
