import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

import Reveal from "@/components/commons/Reveal"
import { cn } from "@/lib/utils"
import {
  ALL_CATEGORIES,
  filterProfessionals,
  WELCOME_CATEGORIES,
  WELCOME_COPY,
  WELCOME_PROFESSIONALS,
  WELCOME_ROUTES,
  WELCOME_SECTIONS,
  type WelcomeCategoryFilter,
} from "@/services/welcome/welcomeContent"
import WelcomeProfessionalCard from "./WelcomeProfessionalCard"

const FILTERS: WelcomeCategoryFilter[] = [ALL_CATEGORIES, ...WELCOME_CATEGORIES]

const CategoryChips = ({ active, onChange }: { active: WelcomeCategoryFilter; onChange: (category: WelcomeCategoryFilter) => void }) => (
  <div role="group" aria-label="Filtrar por categoria" className="flex flex-wrap justify-center gap-2">
    {FILTERS.map((category) => {
      const isActive = category === active
      return (
        <button
          key={category}
          type="button"
          aria-pressed={isActive}
          onClick={() => onChange(category)}
          className={cn(
            "h-9 cursor-pointer rounded-full px-4 text-[13px] font-medium transition-all duration-300",
            isActive
              ? "bg-sich-heading text-white shadow-sich-small-card"
              : "bg-sich-surface text-sich-label hover:bg-sich-pink-soft hover:text-sich-magenta",
          )}
        >
          {category}
        </button>
      )
    })}
  </div>
)

/** "Professionals waiting for you": category chips filtering a row of photo cards. */
const WelcomeProfessionalsGallery = () => {
  const [category, setCategory] = useState<WelcomeCategoryFilter>(ALL_CATEGORIES)
  const professionals = filterProfessionals(WELCOME_PROFESSIONALS, category)

  return (
    <section id={WELCOME_SECTIONS.professionals} className="mx-auto max-w-300 scroll-mt-28 px-5 pt-24 lg:px-10 lg:pt-32">
      <Reveal as="h2" className="mx-auto max-w-160 text-center text-[32px] leading-[1.06] font-semibold tracking-[-1.2px] text-sich-heading lg:text-[52px] lg:tracking-[-2px]">
        {WELCOME_COPY.professionalsTitle}
      </Reveal>

      <Reveal delay={100} className="mt-8">
        <CategoryChips active={category} onChange={setCategory} />
      </Reveal>

      {professionals.length === 0 ? (
        <p className="mt-10 text-center text-[14px] text-sich-label">{WELCOME_COPY.professionalsEmpty}</p>
      ) : (
        <ul key={category} className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {professionals.map((professional, index) => (
            <li
              key={professional.name}
              style={{ animationDelay: `${index * 70}ms` }}
              className={cn("motion-safe:animate-[welcome-rise_0.7s_cubic-bezier(0.22,1,0.36,1)_both]", index % 2 === 1 && "lg:translate-y-6")}
            >
              <WelcomeProfessionalCard {...professional} className="shadow-sich-small-card transition-shadow duration-500 hover:shadow-sich-card" />
            </li>
          ))}
        </ul>
      )}

      <Reveal className="mt-14 flex justify-center">
        <Link
          to={WELCOME_ROUTES.register}
          className="group flex items-center gap-2 rounded-full bg-sich-gradient py-1.5 pr-6 pl-1.5 text-[14px] font-semibold text-white shadow-sich-button transition-transform duration-300 hover:-translate-y-0.5"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-white text-sich-magenta">
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
          </span>
          {WELCOME_COPY.professionalsAction}
        </Link>
      </Reveal>
    </section>
  )
}

export default WelcomeProfessionalsGallery
