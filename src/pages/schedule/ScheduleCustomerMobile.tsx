import Title from "@/components/commons/Title"
import { SlideToggle } from "@/components/form/SlideToggle"
import CustomerAppointmentList from "@/components/pages/schedule/CustomerAppointmentList"

import type { ScheduleCustomerState } from "@/hooks/schedule/useScheduleCustomer"
import { SCHEDULE_CUSTOMER_COPY, TAB_OPTIONS } from "@/services/schedule/customerSchedule"

const ScheduleCustomerMobile = ({ state }: { state: ScheduleCustomerState }) => {
  const { animationClass, selectedTab, setSelectedTab, appointments, loaded, tab, now } = state

  return (
    <section className={`w-full pb-6 ${animationClass}`}>
      <header className="flex flex-col gap-1 bg-white px-6 pt-4 pb-5">
        <Title text={SCHEDULE_CUSTOMER_COPY.title} />
        <span className="text-[11px] text-sich-label">{SCHEDULE_CUSTOMER_COPY.subtitle}</span>
        <SlideToggle
          variant="outline"
          selectedIndex={selectedTab}
          onSelectedIndexChange={setSelectedTab}
          options={TAB_OPTIONS}
          className="mt-3"
          aria-label="Alternar entre próximos e histórico"
        />
      </header>

      <div className="mt-6 px-6">
        <CustomerAppointmentList appointments={appointments} loaded={loaded} tab={tab} now={now} />
      </div>
    </section>
  )
}

export default ScheduleCustomerMobile
