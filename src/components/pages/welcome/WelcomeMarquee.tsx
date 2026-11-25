import { Sparkle } from "lucide-react"

import { WELCOME_MARQUEE } from "@/services/welcome/welcomeContent"

const MarqueeRow = ({ hidden }: { hidden?: boolean }) => (
  <ul aria-hidden={hidden} className="flex shrink-0 items-center">
    {WELCOME_MARQUEE.map((item) => (
      <li key={item} className="flex items-center gap-8 pr-8 text-[22px] font-medium tracking-[-0.5px] text-sich-heading/80 lg:text-[28px]">
        {item}
        <Sparkle className="size-4 fill-sich-magenta text-sich-magenta" aria-hidden />
      </li>
    ))}
  </ul>
)

/** Endless service ticker. Two identical rows slide by half their width so the loop is seamless. */
const WelcomeMarquee = () => (
  <div className="group relative mt-16 overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)] lg:mt-20">
    <div className="flex w-max motion-safe:animate-[welcome-marquee_40s_linear_infinite] group-hover:[animation-play-state:paused]">
      <MarqueeRow />
      <MarqueeRow hidden />
    </div>
  </div>
)

export default WelcomeMarquee
