import { ArrowRight, Bell } from "lucide-react"
import { Link } from "react-router-dom"

import Reveal from "@/components/commons/Reveal"
import useParallax from "@/hooks/useParallax"
import { WELCOME_COPY, WELCOME_PARTNER_FEATURES, WELCOME_ROUTES, WELCOME_SECTIONS } from "@/services/welcome/welcomeContent"
import { WELCOME_IMAGES } from "@/services/welcome/welcomeImages"

const PartnerVisual = () => {
  const toastRef = useParallax<HTMLDivElement>(-0.12)
  const insetRef = useParallax<HTMLDivElement>(0.08)

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-[28px]">
        <img src={WELCOME_IMAGES.workSalon} alt="Profissional fazendo manicure em uma cliente" loading="lazy" className="aspect-[5/6] w-full object-cover" />
      </div>

      {/* Mock notification as the partner would see it in the app */}
      <div ref={toastRef} aria-hidden className="absolute top-8 -left-3 flex items-center gap-3 rounded-[18px] bg-white/90 py-3 pr-5 pl-3 shadow-sich-card backdrop-blur lg:-left-10">
        <span className="flex size-10 items-center justify-center rounded-[12px] bg-sich-gradient text-white">
          <Bell className="size-4" />
        </span>
        <div className="flex flex-col">
          <span className="text-[13px] font-semibold text-sich-heading">{WELCOME_COPY.partnersToastTitle}</span>
          <span className="text-[11px] text-sich-label">{WELCOME_COPY.partnersToastDetail}</span>
        </div>
      </div>

      <div ref={insetRef} aria-hidden className="absolute -right-3 -bottom-8 w-32 overflow-hidden rounded-[20px] border-4 border-white shadow-sich-card lg:-right-10 lg:w-44">
        <img src={WELCOME_IMAGES.workFiling} alt="" loading="lazy" className="aspect-square w-full object-cover" />
      </div>
    </div>
  )
}

/** Partner pitch: what a professional gets from the app. */
const WelcomePartners = () => (
  <section id={WELCOME_SECTIONS.partners} className="mx-auto max-w-300 scroll-mt-28 px-5 pt-24 lg:px-10 lg:pt-32">
    <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
      <Reveal variant="scale" className="order-2 px-3 lg:order-1 lg:px-0">
        <PartnerVisual />
      </Reveal>

      <div className="order-1 flex flex-col gap-5 lg:order-2">
        <Reveal as="span" className="text-[12px] font-semibold tracking-[3px] text-sich-magenta uppercase">
          {WELCOME_COPY.partnersEyebrow}
        </Reveal>
        <Reveal as="h2" delay={60} className="text-[30px] leading-[1.08] font-semibold tracking-[-1.2px] text-sich-heading lg:text-[44px] lg:tracking-[-1.8px]">
          {WELCOME_COPY.partnersTitle}
        </Reveal>
        <Reveal as="p" delay={120} className="text-[14px] leading-relaxed text-sich-label">
          {WELCOME_COPY.partnersDescription}
        </Reveal>

        <ul className="mt-2 flex flex-col border-t border-sich-border">
          {WELCOME_PARTNER_FEATURES.map(({ title, description, icon: Icon }, index) => (
            <Reveal as="li" key={title} delay={160 + index * 80} className="group flex items-start gap-4 border-b border-sich-border py-5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sich-surface text-sich-magenta transition-colors duration-300 group-hover:bg-sich-gradient group-hover:text-white">
                <Icon className="size-4" aria-hidden />
              </span>
              <div className="flex flex-col gap-0.5">
                <h3 className="text-[15px] font-semibold text-sich-heading">{title}</h3>
                <p className="text-[13px] text-sich-label">{description}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={400}>
          <Link to={WELCOME_ROUTES.register} className="group mt-2 flex w-fit items-center gap-3 text-[14px] font-semibold text-sich-heading">
            {WELCOME_COPY.partnersAction}
            <span className="flex size-10 items-center justify-center rounded-full border border-sich-heading/15 transition-all duration-300 group-hover:border-transparent group-hover:bg-sich-gradient group-hover:text-white">
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
            </span>
          </Link>
        </Reveal>
      </div>
    </div>
  </section>
)

export default WelcomePartners
