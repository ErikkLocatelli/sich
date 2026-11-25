import Reveal from "@/components/commons/Reveal"
import { cn } from "@/lib/utils"
import { WELCOME_COPY, WELCOME_HIGHLIGHT, WELCOME_HOW_FEATURES, WELCOME_SECTIONS, type WelcomeFeature } from "@/services/welcome/welcomeContent"
import WelcomeSectionHeading from "./WelcomeSectionHeading"

const HighlightCard = () => {
  const { title, description, image, icon: Icon } = WELCOME_HIGHLIGHT

  return (
    <article className="group relative flex h-full min-h-110 flex-col justify-end overflow-hidden rounded-[28px] p-7 text-white">
      <img
        src={image}
        alt=""
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-sich-gradient-end via-sich-gradient-start/55 to-transparent" />
      <span className="absolute top-6 left-6 flex size-12 items-center justify-center rounded-full bg-white/25 backdrop-blur-md">
        <Icon className="size-5" aria-hidden />
      </span>
      <h3 className="relative max-w-64 text-[26px] leading-tight font-semibold tracking-[-0.6px]">{title}</h3>
      <p className="relative mt-2 max-w-76 text-[13px] leading-relaxed opacity-90">{description}</p>
    </article>
  )
}

const FeatureCard = ({ title, description, icon: Icon, className }: WelcomeFeature & { className?: string }) => (
  <article
    className={cn(
      "group flex h-full flex-col justify-between gap-12 rounded-[28px] bg-sich-surface p-7 transition-colors duration-500 hover:bg-sich-pink-soft",
      className,
    )}
  >
    <span className="flex size-11 items-center justify-center rounded-full bg-white text-sich-magenta shadow-sich-small-card transition-transform duration-500 group-hover:-rotate-12">
      <Icon className="size-4.5" aria-hidden />
    </span>
    <div className="flex flex-col gap-2">
      <h3 className="text-[18px] font-semibold tracking-[-0.3px] text-sich-heading">{title}</h3>
      <p className="max-w-80 text-[13px] leading-relaxed text-sich-label">{description}</p>
    </div>
  </article>
)

// Bloom bento rhythm: wide/narrow on the first row, narrow/wide on the second
const SPANS = ["lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-3"]

/** "How it works" bento: photo highlight plus the customer benefits. */
const WelcomeHowItWorks = () => (
  <section id={WELCOME_SECTIONS.howItWorks} className="mx-auto max-w-300 scroll-mt-28 px-5 pt-24 lg:px-10 lg:pt-32">
    <WelcomeSectionHeading
      title={WELCOME_COPY.howTitleStart}
      accent={WELCOME_COPY.howTitleAccent}
      description={WELCOME_COPY.howDescription}
      staggered
    />

    <div className="mt-12 grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,5fr)]">
      <Reveal variant="scale">
        <HighlightCard />
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {WELCOME_HOW_FEATURES.map((feature, index) => (
          <Reveal key={feature.title} delay={index * 90} className={SPANS[index]}>
            <FeatureCard {...feature} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

export default WelcomeHowItWorks
