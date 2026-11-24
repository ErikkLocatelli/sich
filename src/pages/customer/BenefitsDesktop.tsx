import Title from '../../components/commons/Title'
import BenefitsBalanceHero from '../../components/pages/benefit/BenefitsBalanceHero'
import { BENEFITS_COPY } from '../../components/pages/benefit/benefitsCopy'
import BenefitsHowItWorks from '../../components/pages/benefit/BenefitsHowItWorks'
import CashbackStatement from '../../components/pages/benefit/CashbackStatement'
import LoyaltyCard from '../../components/pages/benefit/LoyaltyCard'
import type { BenefitsPageState } from '../../hooks/benefit/useBenefitsPage'
import { cn } from '../../lib/utils'

const BenefitsDesktop = ({ state }: { state: BenefitsPageState }) => {
  const { animationClass, wallet, loyalty, howItWorks, statement } = state

  return (
    <section className={cn("flex w-full flex-col gap-6 px-10 py-8", animationClass)}>
      <header className="flex flex-col gap-1">
        <Title text={BENEFITS_COPY.pageTitle} className="lg:text-left lg:text-[26px] lg:font-bold lg:tracking-[-0.4px]" />
        <span className="text-[13px] text-sich-label">{BENEFITS_COPY.pageSubtitle}</span>
      </header>

      <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-start gap-6">
        <div className="flex flex-col gap-6">
          <BenefitsBalanceHero wallet={wallet} />
          <LoyaltyCard loyalty={loyalty} />
          <CashbackStatement {...statement} />
        </div>

        <BenefitsHowItWorks steps={howItWorks} />
      </div>
    </section>
  )
}

export default BenefitsDesktop
