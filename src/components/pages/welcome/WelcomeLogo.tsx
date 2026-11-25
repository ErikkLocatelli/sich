import { cn } from "@/lib/utils"
import { WELCOME_TOP_ID } from "@/services/welcome/welcomeContent"
import SichLogo from "@/assets/icons/Sich.svg?react"

/** Brand mark used in the landing header and footer; jumps back to the top of the page. */
const WelcomeLogo = ({ className }: { className?: string }) => (
  <a href={`#${WELCOME_TOP_ID}`} aria-label="SICH, voltar ao topo" className={cn("flex items-center gap-2.5", className)}>
    <span className="flex size-9 items-center justify-center rounded-[12px] bg-sich-gradient shadow-sich-button">
      <SichLogo className="size-7" aria-hidden />
    </span>
    <span className="text-[18px] font-bold tracking-[-0.3px] text-sich-heading">SICH</span>
  </a>
)

export default WelcomeLogo
