import Card from "@/components/commons/Card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import type { FinancialEntry } from "@/services/financial/financialSummary"

type EntryIcon = React.ElementType<{ className?: string }>

const iconBoxClass = "flex size-10.5 shrink-0 items-center justify-center rounded-[14px] bg-[#fde7f0] text-sich-magenta"

const EntryRow = ({ entry, icon: Icon }: { entry: FinancialEntry; icon: EntryIcon }) => (
  <li className="flex items-center gap-3 py-3">
    <span aria-hidden="true" className={iconBoxClass}>
      <Icon className="size-4" />
    </span>
    <div className="flex min-w-0 flex-1 flex-col">
      <span className="truncate text-[13px] font-medium text-sich-heading">{entry.title}</span>
      <span className="text-[11px] text-sich-label">{entry.detail}</span>
    </div>
    <span className={cn("shrink-0 text-[13px] font-bold", entry.positive ? "text-(--sich-green)" : "text-sich-heading")}>
      {entry.amount}
    </span>
  </li>
)

const EntriesSkeleton = ({ label }: { label: string }) => (
  <ul aria-busy="true" aria-label={label} className="divide-y divide-sich-border">
    {Array.from({ length: 3 }, (_, index) => (
      <li key={index} className="flex items-center gap-3 py-3">
        <Skeleton className="size-10.5 shrink-0 rounded-[14px]" />
        <div className="flex flex-1 flex-col gap-1.5">
          <Skeleton className="h-3.5 w-32" />
          <Skeleton className="h-2.5 w-20" />
        </div>
        <Skeleton className="h-3.5 w-16" />
      </li>
    ))}
  </ul>
)

const EntriesEmpty = ({ icon: Icon, title, description }: { icon: EntryIcon; title: string; description: string }) => (
  <div className="flex flex-col items-center gap-1.5 py-6 text-center">
    <Icon aria-hidden="true" className="size-6 text-sich-magenta" />
    <p className="text-[13px] font-medium text-sich-heading">{title}</p>
    <p className="text-[11px] text-sich-label">{description}</p>
  </div>
)

type FinancialEntryListProps = {
  title: string
  /** null while loading */
  entries: FinancialEntry[] | null
  icon: EntryIcon
  emptyIcon: EntryIcon
  emptyTitle: string
  emptyDescription: string
  className?: string
}

/** Titled card with icon/label/amount rows, plus its loading and empty states. */
const FinancialEntryList = ({ title, entries, icon, emptyIcon, emptyTitle, emptyDescription, className }: FinancialEntryListProps) => (
  <Card className={cn("flex flex-col gap-1 border border-sich-border p-5", className)}>
    <h2 className="text-[15px] font-medium text-sich-heading">{title}</h2>

    {!entries ? (
      <EntriesSkeleton label={`Carregando ${title.toLowerCase()}`} />
    ) : entries.length === 0 ? (
      <EntriesEmpty icon={emptyIcon} title={emptyTitle} description={emptyDescription} />
    ) : (
      <ul className="divide-y divide-sich-border">
        {entries.map((entry) => <EntryRow key={entry.key} entry={entry} icon={icon} />)}
      </ul>
    )}
  </Card>
)

export default FinancialEntryList
