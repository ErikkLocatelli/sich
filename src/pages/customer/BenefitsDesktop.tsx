import Title from '../../components/commons/Title'
import BenefitsWallet from '../../components/pages/benefit/BenefitsWallet'
import { BENEFITS_COPY } from '../../components/pages/benefit/benefitsCopy'
import CashbackStatement from '../../components/pages/benefit/CashbackStatement'
import LoyaltyCard from '../../components/pages/benefit/LoyaltyCard'
import type { BenefitsPageState } from '../../hooks/benefit/useBenefitsPage'

const BenefitsDesktop = ({ state }: { state: BenefitsPageState }) => {
  const { animationClass, wallet, loyalty, statement } = state

  return (
    <section className={`flex w-full flex-col gap-6 px-10 py-8 ${animationClass}`}>
      <header className="flex flex-col gap-1">
        <Title text="Benefícios" className="lg:text-left lg:text-[26px] lg:font-bold lg:tracking-[-0.4px]" />
        <span className="text-[13px] text-sich-label">Seu cashback e cartão fidelidade</span>
      </header>

      <div className="grid grid-cols-[minmax(0,1fr)_360px] items-start gap-6">
        <CashbackStatement {...statement} />

        <div className="flex flex-col gap-6">
          <section className="flex flex-col gap-3 rounded-[24px] bg-sich-gradient p-5.5 shadow-sich-button">
            <div>
              <span className="text-[11px] text-white/80">{BENEFITS_COPY.eyebrow}</span>
              <h2 className="text-[18px] font-semibold text-white">{BENEFITS_COPY.title}</h2>
            </div>
            <BenefitsWallet wallet={wallet} stacked />
          </section>
          <LoyaltyCard loyalty={loyalty} />
        </div>
      </div>
    </section>
  )
}

export default BenefitsDesktop
