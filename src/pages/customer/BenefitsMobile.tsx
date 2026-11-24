import SichBadge from '../../components/commons/SichBadge'
import Title from '../../components/commons/Title'
import BenefitsWallet from '../../components/pages/benefit/BenefitsWallet'
import { BENEFITS_COPY } from '../../components/pages/benefit/benefitsCopy'
import CashbackStatement from '../../components/pages/benefit/CashbackStatement'
import LoyaltyCard from '../../components/pages/benefit/LoyaltyCard'
import type { BenefitsPageState } from '../../hooks/benefit/useBenefitsPage'

const BenefitsMobile = ({ state }: { state: BenefitsPageState }) => {
  const { animationClass, wallet, loyalty, statement } = state

  return (
    <div className={animationClass}>
      <SichBadge className="flex flex-col gap-3 px-6 py-6">
        <div>
          <span className="text-[11px] text-white/80">{BENEFITS_COPY.eyebrow}</span>
          <Title text={BENEFITS_COPY.title} color="text-white" />
        </div>
        <BenefitsWallet wallet={wallet} />
      </SichBadge>

      <div className="flex flex-col gap-5 px-5 py-5">
        <LoyaltyCard loyalty={loyalty} />
        <CashbackStatement {...statement} />
      </div>
    </div>
  )
}

export default BenefitsMobile
