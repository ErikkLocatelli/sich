import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"
import { formatCurrencyShort } from "@/services/schedule/formatters"

import Avatar from "./Avatar"

type ProfessionalInfoCardProps = {
  name: string
  url?: string
  subtitle?: string
  neighborhood?: string | null
  minPrice?: number | null
  href?: string
  className?: string
}

const ProfessionalInfoCardContent = ({ name, url, subtitle, neighborhood, minPrice }: ProfessionalInfoCardProps) => (
  <>
    <Avatar name={name} url={url} className="bg-sich-gradient" />

    <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
      <span className="truncate text-[14px] font-semibold text-sich-heading">{name}</span>
      {subtitle && <span className="truncate text-[11px] text-sich-label">{subtitle}</span>}
      {/* TODO(backend): rating and review count ("★ 4.9 (312)") are not in ProviderSummaryResponse yet */}
      {neighborhood && <span className="truncate text-[11px] text-sich-label">{neighborhood}</span>}
    </div>

    {minPrice != null && (
      <div className="flex shrink-0 flex-col items-end">
        <span className="text-[9px] text-sich-label">a partir</span>
        <span className="text-[14px] font-bold text-sich-magenta">{formatCurrencyShort(minPrice)}</span>
      </div>
    )}
  </>
)

const ProfessionalInfoCard = ({ className, href, ...props }: ProfessionalInfoCardProps) => {
  const classes = cn("flex items-center gap-3 rounded-[16px] border border-sich-border bg-white p-3 shadow-sich-small-card", className)

  if (!href) {
    return (
      <div className={classes}>
        <ProfessionalInfoCardContent {...props} />
      </div>
    )
  }

  return (
    <Link to={href} className={cn(classes, "transition-colors hover:border-primary/40")}>
      <ProfessionalInfoCardContent {...props} />
    </Link>
  )
}

export default ProfessionalInfoCard
