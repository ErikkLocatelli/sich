import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

import { WELCOME_COPY, WELCOME_PROFESSIONALS, WELCOME_ROUTES, WELCOME_TRUST } from "@/services/welcome/welcomeContent"
import WelcomePhoneMockup from "./WelcomePhoneMockup"
import WelcomeProfessionalCard from "./WelcomeProfessionalCard"

const [leftProfessional, rightProfessional] = WELCOME_PROFESSIONALS

const ENTER = "motion-safe:animate-[welcome-rise_1s_cubic-bezier(0.22,1,0.36,1)_both]"

const HeroActions = () => (
  <div className="flex w-full max-w-80 flex-col gap-3 *:whitespace-nowrap sm:w-auto sm:max-w-none sm:flex-row lg:w-full lg:flex-col">
    <Link
      to={WELCOME_ROUTES.register}
      className="group flex h-12 items-center justify-center gap-2 rounded-full bg-sich-gradient px-7 text-[14px] font-semibold text-white shadow-sich-button transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sich-card"
    >
      {WELCOME_COPY.heroPrimary}
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
    </Link>
    <Link
      to={WELCOME_ROUTES.login}
      className="flex h-12 items-center justify-center rounded-full border border-sich-heading/15 bg-white px-7 text-[14px] font-semibold text-sich-heading transition-colors duration-300 hover:border-sich-heading hover:bg-sich-heading hover:text-white"
    >
      {WELCOME_COPY.heroSecondary}
    </Link>
  </div>
)

const HeroStage = () => (
  <div className="relative flex h-118 w-full items-start justify-center sm:h-130 lg:h-140">
    {/* Concentric rings + brand disc behind the device */}
    <div aria-hidden className="absolute top-6 left-1/2 size-150 -translate-x-1/2 rounded-full border border-sich-heading/6" />
    <div aria-hidden className="absolute top-20 left-1/2 size-122 -translate-x-1/2 rounded-full border border-sich-heading/6" />
    <div
      aria-hidden
      className="absolute top-28 left-1/2 size-80 -translate-x-1/2 rounded-full bg-sich-gradient lg:size-104 motion-safe:animate-[welcome-scale-in_1.2s_cubic-bezier(0.22,1,0.36,1)_both]"
    />

    <WelcomePhoneMockup className={`relative mt-4 [animation-delay:150ms] ${ENTER}`} />

    {leftProfessional && (
      <div className={`absolute top-62 left-[calc(50%-17rem)] hidden w-40 [animation-delay:450ms] sm:block lg:left-[calc(50%-21rem)] ${ENTER}`}>
        <WelcomeProfessionalCard {...leftProfessional} className="-rotate-3 motion-safe:animate-[welcome-float_7s_ease-in-out_infinite]" />
      </div>
    )}
    {rightProfessional && (
      <div className={`absolute top-14 left-[calc(50%+7rem)] hidden w-40 [animation-delay:600ms] sm:block lg:left-[calc(50%+11rem)] ${ENTER}`}>
        <WelcomeProfessionalCard {...rightProfessional} className="rotate-3 motion-safe:animate-[welcome-float_7s_ease-in-out_1.8s_infinite]" />
      </div>
    )}
  </div>
)

/** Landing hero: headline, brand stage with the device, and the entry CTAs. */
const WelcomeHero = () => (
  <section className="px-3 pt-20 lg:px-6 lg:pt-22">
    <div className="relative mx-auto max-w-330 overflow-hidden rounded-[32px] bg-sich-surface px-5 pt-14 lg:rounded-[44px] lg:px-14 lg:pt-14">
      <h1 className={`mx-auto text-center text-[36px] leading-[1.05] font-semibold tracking-[-1.4px] text-sich-heading sm:text-[50px] lg:text-[64px] lg:tracking-[-2.4px] ${ENTER}`}>
        <span className="lg:block">{WELCOME_COPY.heroTitleStart}</span>{" "}
        <span className="lg:block">{WELCOME_COPY.heroTitleEnd}</span>
      </h1>

      <div className="mt-8 grid items-end gap-8 lg:mt-0 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
        <ul className={`hidden flex-col gap-3 pb-18 [animation-delay:700ms] lg:order-1 lg:flex ${ENTER}`}>
          {WELCOME_TRUST.map(({ label, icon: Icon }) => (
            <li key={label} className="flex items-center gap-3 text-[13px] text-sich-label">
              <span className="flex size-9 items-center justify-center rounded-full bg-white text-sich-magenta shadow-sich-small-card">
                <Icon className="size-4" aria-hidden />
              </span>
              {label}
            </li>
          ))}
        </ul>

        <div className="order-2 lg:w-130">
          <HeroStage />
        </div>

        <div className={`order-1 flex flex-col items-center gap-6 text-center [animation-delay:300ms] lg:order-3 lg:items-start lg:pb-18 lg:text-left ${ENTER}`}>
          <p className="max-w-74 text-[15px] leading-relaxed text-sich-label">{WELCOME_COPY.heroDescription}</p>
          <HeroActions />
        </div>
      </div>
    </div>
  </section>
)

export default WelcomeHero
