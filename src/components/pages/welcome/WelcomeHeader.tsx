import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

import useScrolled from "@/hooks/useScrolled"
import { cn } from "@/lib/utils"
import { WELCOME_COPY, WELCOME_NAV, WELCOME_ROUTES } from "@/services/welcome/welcomeContent"
import WelcomeLogo from "./WelcomeLogo"

/** Fixed top bar that condenses into a floating pill once the page scrolls. */
const WelcomeHeader = () => {
  const scrolled = useScrolled()

  return (
    <header className="fixed inset-x-0 top-0 z-30 px-3 pt-3 lg:px-6">
      <div
        className={cn(
          "mx-auto flex h-14 max-w-300 items-center justify-between rounded-full px-3 transition-all duration-500 ease-out lg:h-16 lg:px-5",
          scrolled
            ? "max-w-240 border border-white/60 bg-white/75 shadow-sich-small-card backdrop-blur-xl"
            : "border border-transparent bg-transparent",
        )}
      >
        <WelcomeLogo />

        <nav aria-label="Seções" className="hidden items-center gap-1 lg:flex">
          {WELCOME_NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-[13px] font-medium text-sich-label transition-colors hover:bg-sich-heading/5 hover:text-sich-heading"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Link
          to={WELCOME_ROUTES.login}
          className="group flex items-center gap-2 rounded-full bg-sich-heading py-1.5 pr-5 pl-1.5 text-[13px] font-semibold text-white transition-all hover:bg-sich-magenta"
        >
          <span className="flex size-7 items-center justify-center rounded-full bg-white text-sich-heading transition-colors group-hover:text-sich-magenta">
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
          </span>
          {WELCOME_COPY.login}
        </Link>
      </div>
    </header>
  )
}

export default WelcomeHeader
