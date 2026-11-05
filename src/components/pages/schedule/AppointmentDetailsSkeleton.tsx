import Card from "@/components/commons/Card"
import { Skeleton } from "@/components/ui/skeleton"

/** Mirrors the cards of the appointment details page while it loads. */
const AppointmentDetailsSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 px-6 mt-4" aria-busy="true" aria-label="Carregando atendimento">
      <Card className="p-4">
        <div className="flex flex-row items-center gap-3">
          <Skeleton className="size-14 shrink-0 rounded-[14px]" />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <Skeleton className="h-3.5 w-36" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <Skeleton className="h-2.5 w-44" />
            <Skeleton className="h-2.5 w-24" />
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <Skeleton className="h-4 w-16" />
        <div className="mt-3 flex flex-col gap-2.5">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-3 w-52" />
        </div>
        <Skeleton className="mt-4 h-9 w-full rounded-[12px]" />
      </Card>

      <Card className="p-4">
        <Skeleton className="h-4 w-20" />
        <div className="mt-3 flex flex-col gap-3">
          {[0, 1].map((row) => (
            <div key={row} className="flex items-center justify-between">
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-2.5 w-12" />
              </div>
              <Skeleton className="h-3 w-14" />
            </div>
          ))}
          <Skeleton className="h-px w-full" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-3.5 w-12" />
            <Skeleton className="h-3.5 w-16" />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default AppointmentDetailsSkeleton
