import { Link } from "react-router-dom"

import Reveal from "@/components/commons/Reveal"
import { WELCOME_COPY, WELCOME_ROUTES } from "@/services/welcome/welcomeContent"

/** Closing call to action banner. */
const WelcomeCta = () => (
  <section className="mx-auto max-w-300 px-5 pt-24 lg:px-10 lg:pt-32">
    <Reveal variant="scale" className="relative overflow-hidden rounded-[36px] bg-sich-gradient px-6 py-16 text-center text-white shadow-sich-button lg:py-24">
      <div aria-hidden className="absolute -top-40 -left-24 size-120 rounded-full border border-white/15" />
      <div aria-hidden className="absolute -top-24 -left-8 size-88 rounded-full border border-white/15" />
      <div aria-hidden className="absolute -right-20 -bottom-48 size-120 rounded-full bg-white/10 blur-2xl" />

      <h2 className="relative text-[34px] leading-[1.05] font-semibold tracking-[-1.2px] lg:text-[60px] lg:tracking-[-2.4px]">
        {WELCOME_COPY.ctaTitle}
      </h2>
      <p className="relative mx-auto mt-4 max-w-120 text-[14px] leading-relaxed opacity-90">{WELCOME_COPY.ctaDescription}</p>

      <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          to={WELCOME_ROUTES.register}
          className="flex h-12 w-full max-w-72 items-center justify-center rounded-full bg-white px-8 text-[14px] font-semibold text-sich-magenta transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sich-card sm:w-auto"
        >
          {WELCOME_COPY.heroPrimary}
        </Link>
        <Link
          to={WELCOME_ROUTES.login}
          className="flex h-12 w-full max-w-72 items-center justify-center rounded-full border border-white/50 px-8 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-sich-magenta sm:w-auto"
        >
          {WELCOME_COPY.login}
        </Link>
      </div>
    </Reveal>
  </section>
)

export default WelcomeCta
