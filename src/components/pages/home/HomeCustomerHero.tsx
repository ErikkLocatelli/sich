import { CalendarDays, Sparkles, Wallet } from "lucide-react"
import { Link } from "react-router-dom"

import UserInfoCard from "@/components/commons/UserInfoCard"
import { cn } from "@/lib/utils"
import { CUSTOMER_HOME_COPY } from "@/services/home/customerHome"

type HomeCustomerHeroProps = {
  cashbackLabel: string
  loyaltyLabel: string
  nextAppointmentLabel: string
  className?: string
}

/** Desktop hero: pitch, the customer's wallet and next appointment, and a call to book. */
const HomeCustomerHero = ({ cashbackLabel, loyaltyLabel, nextAppointmentLabel, className }: HomeCustomerHeroProps) => (
  <section className={cn("flex flex-col gap-5 overflow-hidden rounded-[24px] bg-sich-gradient p-9 shadow-sich-button", className)}>
    <div className="flex max-w-130 flex-col gap-1.5 text-white">
      <h2 className="text-[28px] font-bold tracking-[-0.5px]">{CUSTOMER_HOME_COPY.heroTitle}</h2>
      <p className="text-[13px] opacity-90">{CUSTOMER_HOME_COPY.heroDescription}</p>
    </div>

    <div className="grid grid-cols-3 gap-3.5">
      <UserInfoCard label="Saldo cashback" value={cashbackLabel} icon={Wallet} />
      <UserInfoCard label="Fidelidade" value={loyaltyLabel} icon={Sparkles} />
      <UserInfoCard label="Próximo atendimento" value={nextAppointmentLabel} icon={CalendarDays} />
    </div>

    <Link
      to="/search"
      className="w-fit rounded-[14px] bg-white px-6 py-3 text-[13px] font-semibold text-sich-magenta transition-opacity hover:opacity-90"
    >
      {CUSTOMER_HOME_COPY.heroAction}
    </Link>
  </section>
)

export default HomeCustomerHero
