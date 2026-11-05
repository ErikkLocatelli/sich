import { Skeleton } from "@/components/ui/skeleton"

/** Placeholder rows with the shape of `ScheduleHistory`. */
const ScheduleHistorySkeleton = ({ rows = 3 }: { rows?: number }) => {
  return (
    <div className="divide-y divide-gray-200" aria-busy="true" aria-label="Carregando histórico">
      {Array.from({ length: rows }, (_, index) => (
        <div key={index} className="flex items-center justify-between py-3 mt-2">
          <div className="flex items-center gap-2">
            <Skeleton className="size-5 shrink-0 rounded-full" />
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-2.5 w-24" />
            </div>
          </div>
          <Skeleton className="h-3.5 w-16" />
        </div>
      ))}
    </div>
  )
}

export default ScheduleHistorySkeleton
