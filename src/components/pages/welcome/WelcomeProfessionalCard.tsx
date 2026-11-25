import { Star } from "lucide-react"

import { cn } from "@/lib/utils"
import type { WelcomeProfessional } from "@/services/welcome/welcomeContent"

type WelcomeProfessionalCardProps = Omit<WelcomeProfessional, "specialty"> & {
  specialty: string
  className?: string
}

/** Photo card of a professional: specialty tag on top, name and rating over the image. */
const WelcomeProfessionalCard = ({ name, specialty, rating, image, className }: WelcomeProfessionalCardProps) => (
  <article className={cn("group rounded-[22px] bg-white p-1.5 shadow-sich-card", className)}>
    <div className="relative aspect-[3/4] overflow-hidden rounded-[18px] bg-sich-pink-soft">
      <img
        src={image}
        alt={`${name}, profissional de ${specialty.toLowerCase()}`}
        loading="lazy"
        className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/60 to-transparent" />
      <span className="absolute top-2.5 left-2.5 rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-medium text-sich-heading backdrop-blur">
        {specialty}
      </span>
      <div className="absolute inset-x-3 bottom-2.5 flex items-center justify-between text-white">
        <span className="text-[13px] font-semibold">{name}</span>
        <span className="flex items-center gap-1 text-[11px] font-semibold">
          <Star className="size-3 fill-amber-400 text-amber-400" aria-hidden />
          {rating}
        </span>
      </div>
    </div>
  </article>
)

export default WelcomeProfessionalCard
