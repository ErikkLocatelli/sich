import { Link } from "react-router-dom"

import Reveal from "@/components/commons/Reveal"
import { WELCOME_COPY, WELCOME_NAV, WELCOME_ROUTES } from "@/services/welcome/welcomeContent"
import WelcomeLogo from "./WelcomeLogo"

/** Footer: support note, brand, section links and copyright. */
const WelcomeFooter = () => (
  <footer className="mx-auto max-w-300 px-5 pt-24 lg:px-10 lg:pt-32">
    <Reveal className="flex flex-col items-center gap-2 text-center">
      <p className="text-[16px] font-semibold text-sich-heading">{WELCOME_COPY.supportTitle}</p>
      <p className="max-w-90 text-[13px] text-sich-label">{WELCOME_COPY.supportDescription}</p>
    </Reveal>

    <div className="mt-14 flex flex-col gap-8 border-t border-sich-border pt-10 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col gap-2">
        <WelcomeLogo />
        <p className="text-[13px] text-sich-label">{WELCOME_COPY.footerTagline}</p>
      </div>

      <nav aria-label="Rodapé" className="flex flex-wrap gap-x-8 gap-y-3">
        {WELCOME_NAV.map((item) => (
          <a key={item.href} href={item.href} className="text-[13px] text-sich-label transition-colors hover:text-sich-heading">
            {item.label}
          </a>
        ))}
        <Link to={WELCOME_ROUTES.login} className="text-[13px] font-semibold text-sich-magenta">
          {WELCOME_COPY.login}
        </Link>
      </nav>
    </div>

    <p className="mt-8 pb-10 text-center text-[11px] text-sich-label lg:text-left">© {new Date().getFullYear()} SICH. Todos os direitos reservados.</p>
  </footer>
)

export default WelcomeFooter
