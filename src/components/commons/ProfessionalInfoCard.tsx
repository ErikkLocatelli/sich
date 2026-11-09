import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"
import { formatCurrencyShort } from "@/services/schedule/formatters"

import Avatar from "./Avatar"

type ProfessionalInfoCardLayout = "row" | "stacked" | "compact"

type ProfessionalInfoCardProps = {
  name: string
  url?: string
  subtitle?: string
  neighborhood?: string | null
  minPrice?: number | null
  /** Short tag next to the name, e.g. "Top SICH" (compact layout only) */
  badge?: string
  href?: string
  layout?: ProfessionalInfoCardLayout
  className?: string
}

type ContentProps = Omit<ProfessionalInfoCardProps, "href" | "className" | "layout">

// TODO(backend): rating and review count ("★ 4.9 (312)") are not in ProviderSummaryResponse yet

const RowContent = ({ name, url, subtitle, neighborhood, minPrice }: ContentProps) => (
  <>
    <Avatar name={name} url={url} className="bg-sich-gradient" />

    <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
      <span className="truncate text-[14px] font-semibold text-sich-heading">{name}</span>
      {subtitle && <span className="truncate text-[11px] text-sich-label">{subtitle}</span>}
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

const StackedContent = ({ name, url, subtitle, neighborhood, minPrice }: ContentProps) => (
  <>
    <div className="flex items-center gap-3.5">
      <Avatar name={name} url={url} className="size-16 rounded-[18px] bg-sich-gradient" />
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="truncate text-[15px] font-semibold text-sich-heading">{name}</span>
        {subtitle && <span className="truncate text-[12px] text-sich-label">{subtitle}</span>}
      </div>
    </div>

    <div className="flex items-center justify-between gap-3 border-t border-sich-border pt-3.5">
      <span className="truncate text-[12px] text-sich-label">{neighborhood ?? ""}</span>
      {minPrice != null && (
        <span className="shrink-0 text-[12px] text-sich-label">
          a partir <span className="text-[15px] font-bold text-sich-magenta">{formatCurrencyShort(minPrice)}</span>
        </span>
      )}
    </div>
  </>
)

const CompactContent = ({ name, url, subtitle, neighborhood, minPrice, badge }: ContentProps) => (
  <>
    <Avatar name={name} url={url} className="shrink-0 bg-sich-gradient" />

    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
      <div className="flex min-w-0 items-center gap-1.5">
        <span className="truncate text-[14px] font-semibold text-sich-heading">{name}</span>
        {badge && (
          <span className="shrink-0 rounded-full bg-[#FDE7F0] px-1.5 py-0.5 text-[9px] font-semibold uppercase text-(--sich-primary)">
            {badge}
          </span>
        )}
      </div>
      {subtitle && <span className="truncate text-[11px] text-sich-label">{subtitle}</span>}
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-[11px] text-sich-label">{neighborhood ?? ""}</span>
        {minPrice != null && (
          <span className="shrink-0 text-[11px] font-semibold text-sich-magenta">{formatCurrencyShort(minPrice)}+</span>
        )}
      </div>
    </div>
  </>
)

const CONTENT: Record<ProfessionalInfoCardLayout, (props: ContentProps) => React.ReactNode> = {
  row: RowContent,
  stacked: StackedContent,
  compact: CompactContent,
}

const LAYOUT_CLASSES: Record<ProfessionalInfoCardLayout, string> = {
  row: "flex items-center gap-3 rounded-[16px] p-3",
  stacked: "flex flex-col gap-3.5 rounded-[20px] p-4.5",
  compact: "flex items-center gap-3 rounded-[16px] p-3",
}

const ProfessionalInfoCard = ({ className, href, layout = "row", ...props }: ProfessionalInfoCardProps) => {
  const classes = cn("border border-sich-border bg-white shadow-sich-small-card", LAYOUT_CLASSES[layout], className)
  const Content = CONTENT[layout]
  const content = <Content {...props} />

  if (!href) return <div className={classes}>{content}</div>

  return (
    <Link to={href} className={cn(classes, "transition-colors hover:border-primary/40")}>
      {content}
    </Link>
  )
}

export default ProfessionalInfoCard
