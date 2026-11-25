import { CalendarCheck, Star } from "lucide-react"

import { cn } from "@/lib/utils"
import { WELCOME_IMAGES } from "@/services/welcome/welcomeImages"

/** Decorative device: a full-bleed portrait with a glass booking card, as in the app's provider page. */
const WelcomePhoneMockup = ({ className }: { className?: string }) => (
  <div aria-hidden className={cn("relative w-64 rounded-[46px] bg-[#16131f] p-2 shadow-sich-card ring-1 ring-black/10 lg:w-68", className)}>
    <div className="relative aspect-[9/19] overflow-hidden rounded-[38px] bg-sich-pink-soft">
      <img src={WELCOME_IMAGES.heroPortrait} alt="" className="absolute inset-0 size-full object-cover" fetchPriority="high" />
      <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-black/10" />

      <div className="absolute top-2.5 left-1/2 h-6 w-22 -translate-x-1/2 rounded-full bg-[#16131f]" />
      <div className="absolute top-3 inset-x-6 flex justify-between text-[10px] font-semibold text-white">
        <span>9:41</span>
        <span className="tracking-widest">•••</span>
      </div>

      <div className="absolute inset-x-3 bottom-3 rounded-[24px] border border-white/30 bg-white/20 p-3.5 text-white backdrop-blur-xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[14px] font-semibold leading-tight">Ana Clara</p>
            <p className="text-[10px] opacity-85">Manicure · Nail art</p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-sich-heading">
            <Star className="size-2.5 fill-amber-400 text-amber-400" />5.0
          </span>
        </div>
        <div className="mt-3 flex items-center justify-center gap-1.5 rounded-[14px] bg-white py-2.5 text-[11px] font-semibold text-sich-magenta">
          <CalendarCheck className="size-3.5" />
          Agendar horário
        </div>
      </div>
    </div>
  </div>
)

export default WelcomePhoneMockup
