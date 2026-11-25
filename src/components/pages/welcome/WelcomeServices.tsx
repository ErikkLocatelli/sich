import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"

import Reveal from "@/components/commons/Reveal"
import { WELCOME_COPY, WELCOME_ROUTES, WELCOME_SECTIONS, WELCOME_SERVICES, type WelcomeService } from "@/services/welcome/welcomeContent"

const ServiceCard = ({ title, description, image }: WelcomeService) => (
  <Link to={WELCOME_ROUTES.register} className="group flex flex-col gap-4">
    <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-sich-surface">
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="size-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.06]"
      />
      <span className="absolute right-4 bottom-4 flex size-11 translate-y-2 items-center justify-center rounded-full bg-white text-sich-heading opacity-0 shadow-sich-card transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <ArrowUpRight className="size-4" aria-hidden />
      </span>
    </div>
    <div className="flex flex-col gap-1 px-1">
      <h3 className="text-[17px] font-semibold tracking-[-0.3px] text-sich-heading">{title}</h3>
      <p className="text-[13px] text-sich-label">{description}</p>
    </div>
  </Link>
)

/** Editorial service catalogue with photography. */
const WelcomeServices = () => (
  <section id={WELCOME_SECTIONS.services} className="mx-auto max-w-300 scroll-mt-28 px-5 pt-24 lg:px-10 lg:pt-32">
    <div className="flex flex-col items-center gap-4 text-center">
      <Reveal as="span" className="text-[12px] font-semibold tracking-[3px] text-sich-magenta uppercase">
        {WELCOME_COPY.servicesEyebrow}
      </Reveal>
      <Reveal as="h2" delay={60} className="max-w-180 text-[32px] leading-[1.06] font-semibold tracking-[-1.2px] text-sich-heading lg:text-[52px] lg:tracking-[-2px]">
        {WELCOME_COPY.servicesTitle}
      </Reveal>
      <Reveal as="p" delay={120} className="max-w-110 text-[14px] leading-relaxed text-sich-label">
        {WELCOME_COPY.servicesDescription}
      </Reveal>
    </div>

    <ul className="mt-14 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {WELCOME_SERVICES.map((service, index) => (
        <Reveal as="li" key={service.title} delay={(index % 3) * 110}>
          <ServiceCard {...service} />
        </Reveal>
      ))}
    </ul>
  </section>
)

export default WelcomeServices
