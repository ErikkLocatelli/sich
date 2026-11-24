import SichBadge from '../../components/commons/SichBadge'
import BenefitsBalanceCard from '../../components/pages/benefit/BenefitsBalanceCard'
import { BENEFITS_COPY } from '../../components/pages/benefit/benefitsCopy'
import CashbackStatement from '../../components/pages/benefit/CashbackStatement'
import LoyaltyCompactCard from '../../components/pages/benefit/LoyaltyCompactCard'
import type { BenefitsPageState } from '../../hooks/benefit/useBenefitsPage'

const BenefitsMobile = ({ state }: { state: BenefitsPageState }) => {
  const { animationClass, wallet, loyalty, statement } = state

  return (
    <div className={animationClass}>
      <SichBadge className="flex flex-col gap-5 px-5 pt-10 pb-7">
        <h1 className="text-[20px] font-bold text-white">{BENEFITS_COPY.title}</h1>
        <BenefitsBalanceCard wallet={wallet} />
      </SichBadge>

      <div className="flex flex-col gap-6 px-5 py-6">
        <LoyaltyCompactCard loyalty={loyalty} />
        <CashbackStatement {...statement} variant="section" />
      </div>
    </div>
  )
}

export default BenefitsMobile
