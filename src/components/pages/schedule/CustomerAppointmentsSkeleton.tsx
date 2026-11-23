import Card from "@/components/commons/Card"
import { Skeleton } from "@/components/ui/skeleton"

/** Placeholder cards with the shape of `CustomerAppointmentCard`. */
const CustomerAppointmentsSkeleton = ({ cards = 2 }: { cards?: number }) => (
  <div className="flex flex-col gap-3" aria-busy="true" aria-label="Carregando agendamentos">
    {Array.from({ length: cards }, (_, index) => (
      <Card key={index} className="flex flex-col gap-3 border border-sich-border p-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-2.5 w-24" />
          </div>
          <Skeleton className="h-4.5 w-18 rounded-full" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-2.5 w-20" />
          <Skeleton className="h-2.5 w-12" />
          <Skeleton className="h-2.5 w-40" />
        </div>
      </Card>
    ))}
  </div>
)

export default CustomerAppointmentsSkeleton
