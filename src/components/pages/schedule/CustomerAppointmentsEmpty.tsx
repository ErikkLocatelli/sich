import LabelLink from "@/components/commons/LabelLink"
import {
  SCHEDULE_CUSTOMER_COPY,
  SCHEDULE_CUSTOMER_DESKTOP_COPY,
  type ScheduleCustomerTab
} from "@/services/schedule/customerSchedule"

const EmptyText = ({ text }: { text: string }) => (
  <p className="py-10 text-center text-[13px] font-medium text-sich-heading">{text}</p>
)

/** Empty state per tab; only "Próximos" points the customer to the search. */
const CustomerAppointmentsEmpty = ({ tab, filtered = false }: { tab: ScheduleCustomerTab; filtered?: boolean }) => {
  if (filtered) return <EmptyText text={SCHEDULE_CUSTOMER_DESKTOP_COPY.dayEmptyTitle} />
  if (tab === "history") return <EmptyText text={SCHEDULE_CUSTOMER_COPY.historyEmptyTitle} />

  return (
    <div className="flex flex-col items-center gap-1 py-10 text-center">
      <span className="text-[13px] font-medium text-sich-heading">{SCHEDULE_CUSTOMER_COPY.upcomingEmptyTitle}</span>
      <LabelLink label={SCHEDULE_CUSTOMER_COPY.upcomingEmptyAction} href="/search" className="text-[12px]" />
    </div>
  )
}

export default CustomerAppointmentsEmpty
