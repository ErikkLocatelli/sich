import Reveal from "@/components/commons/Reveal"
import useParallax from "@/hooks/useParallax"
import { cn } from "@/lib/utils"
import { WELCOME_COPY, WELCOME_SECTIONS, WELCOME_WHY_FEATURES, WELCOME_WHY_IMAGES } from "@/services/welcome/welcomeContent"

const PhotoFrame = ({ src, speed, className }: { src: string; speed: number; className?: string }) => {
  const ref = useParallax<HTMLDivElement>(speed)

  return (
    <div ref={ref} className={cn("overflow-hidden rounded-[32px] border-[6px] border-[#16131f] bg-[#16131f] shadow-sich-card", className)}>
      <img src={src} alt="" loading="lazy" className="size-full rounded-[26px] object-cover" />
    </div>
  )
}

const [leftImage, centerImage, rightImage] = WELCOME_WHY_IMAGES

/** Bloom-style banner of three devices over soft brand blobs. Decorative. */
const DevicesBanner = () => (
  <div aria-hidden className="relative mt-12 flex h-90 items-end justify-center gap-3 overflow-hidden rounded-[32px] bg-sich-surface px-4 sm:h-110 lg:h-130 lg:gap-6">
    <div className="absolute -top-16 -left-10 size-72 rounded-full bg-sich-gradient-start/35 blur-3xl lg:size-110" />
    <div className="absolute -right-10 -bottom-24 size-72 rounded-full bg-sich-gradient-end/30 blur-3xl lg:size-110" />
    <div className="absolute top-1/2 left-1/2 size-160 -translate-1/2 rounded-full border border-sich-heading/6" />

    <PhotoFrame src={leftImage} speed={-0.06} className="relative mb-10 hidden h-72 w-38 -rotate-6 sm:block lg:h-96 lg:w-48" />
    <PhotoFrame src={centerImage} speed={0.04} className="relative -mb-10 h-80 w-44 sm:h-100 sm:w-52 lg:h-128 lg:w-62" />
    <PhotoFrame src={rightImage} speed={-0.1} className="relative mb-10 hidden h-72 w-38 rotate-6 sm:block lg:h-96 lg:w-48" />
  </div>
)

/** "Why choose us": staggered headline, device banner and three value cards. */
const WelcomeWhyUs = () => (
  <section id={WELCOME_SECTIONS.whyUs} className="mx-auto max-w-300 scroll-mt-28 px-5 pt-24 lg:px-10 lg:pt-32">
    <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
      <Reveal as="h2" className="text-[32px] leading-[1.06] font-semibold tracking-[-1.2px] text-sich-heading lg:text-[56px] lg:tracking-[-2.2px]">
        <span className="block">{WELCOME_COPY.whyTitleStart}</span>
        <span className="block lg:pl-[2.4em]">
          <span className="bg-sich-gradient bg-clip-text text-transparent">{WELCOME_COPY.whyTitleAccent}</span>
        </span>
      </Reveal>
      <Reveal as="p" delay={120} className="max-w-100 text-[14px] leading-relaxed text-sich-label lg:justify-self-end lg:pb-3">
        {WELCOME_COPY.whyDescription}
      </Reveal>
    </div>

    <Reveal variant="scale">
      <DevicesBanner />
    </Reveal>

    <ul className="mt-4 grid gap-4 md:grid-cols-3">
      {WELCOME_WHY_FEATURES.map(({ title, description, icon: Icon }, index) => (
        <Reveal as="li" key={title} delay={index * 100} className="flex flex-col gap-3 rounded-[24px] bg-sich-surface p-6">
          <span className="flex items-center gap-2.5 text-[15px] font-semibold text-sich-heading">
            <span className="flex size-8 items-center justify-center rounded-full bg-sich-gradient text-white">
              <Icon className="size-3.5" aria-hidden />
            </span>
            {title}
          </span>
          <p className="text-[13px] leading-relaxed text-sich-label">{description}</p>
        </Reveal>
      ))}
    </ul>
  </section>
)

export default WelcomeWhyUs
