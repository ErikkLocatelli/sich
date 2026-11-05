import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

/** Placeholder with the shape of `DayCalendar`: title, then time + block rows. */
const DayCalendarSkeleton = ({ rows = 4, className }: { rows?: number; className?: string }) => (
  <section className={cn("w-full", className)} aria-busy="true" aria-label="Carregando agenda do dia">
    <Skeleton className="h-4 w-28" />
    <div className="mt-2 grid w-full grid-cols-[max-content_1fr] gap-2">
      {Array.from({ length: rows }, (_, index) => [
        <Skeleton key={`time-${index}`} className="mt-3 h-2.5 w-8" />,
        <div key={`block-${index}`} className="flex flex-col gap-1.5 rounded-[12px] border border-sich-border p-3">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-2.5 w-32" />
          <Skeleton className="h-2.5 w-16" />
        </div>,
      ])}
    </div>
  </section>
)

export default DayCalendarSkeleton
