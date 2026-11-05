import { Skeleton } from "@/components/ui/skeleton"

const DAYS = 7
const ROWS = 5

// Deterministic gaps so the placeholder reads as a schedule, not a solid block
const isEmptyCell = (row: number, day: number) => (row + day) % 3 === 0

/** Placeholder with the shape of `WeekGrid`: day headers, hour labels and blocks. */
const WeekGridSkeleton = () => (
  <div
    className="grid grid-cols-[max-content_repeat(7,minmax(0,1fr))] grid-rows-[auto_repeat(5,3.5rem)] gap-x-2 gap-y-1"
    aria-busy="true"
    aria-label="Carregando grade semanal"
  >
    <span aria-hidden="true" />
    {Array.from({ length: DAYS }, (_, day) => (
      <Skeleton key={`head-${day}`} className="mx-auto mb-2 h-3 w-10" />
    ))}

    {Array.from({ length: ROWS }, (_, row) => [
      <Skeleton key={`hour-${row}`} className="h-2.5 w-8" />,
      ...Array.from({ length: DAYS }, (_, day) =>
        isEmptyCell(row, day)
          ? <span key={`cell-${row}-${day}`} aria-hidden="true" />
          : <Skeleton key={`cell-${row}-${day}`} className="rounded-[12px]" />
      ),
    ])}
  </div>
)

export default WeekGridSkeleton
