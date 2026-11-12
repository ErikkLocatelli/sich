import Card from "@/components/commons/Card"
import LabelLink from "@/components/commons/LabelLink"
import StatsSummary from "@/components/commons/StatsSummary"
import SubTitle from "@/components/commons/SubTitle"
import Title from "@/components/commons/Title"
import { SlideToggle } from "@/components/form/SlideToggle"
import CustomerAppointmentList from "@/components/pages/schedule/CustomerAppointmentList"
import DataPicker from "@/components/pages/schedule/DataPicker"
import { Skeleton } from "@/components/ui/skeleton"

import type { ScheduleCustomerState } from "@/hooks/schedule/useScheduleCustomer"
import { SCHEDULE_CUSTOMER_COPY, SCHEDULE_CUSTOMER_DESKTOP_COPY as COPY, TAB_OPTIONS } from "@/services/schedule/customerSchedule"

const WeekCard = ({ state }: { state: ScheduleCustomerState }) => {
  const { monthLabel, days, pickerDate, setDayFilter, clearDayFilter, weekCountLabel, loaded } = state

  return (
    <Card className="flex flex-col gap-3.5 border border-sich-border p-5.5">
      <div className="flex items-center justify-between">
        <SubTitle text={monthLabel} className="font-semibold text-sich-heading" />
        {/* Back to the current week with no day filter */}
        <button type="button" onClick={clearDayFilter} className="hover:cursor-pointer">
          <LabelLink label={COPY.today} className="text-[12px]" />
        </button>
      </div>
      <DataPicker days={days} selectedDate={pickerDate} onSelectedDateChange={setDayFilter} />
      {loaded
        ? <span className="text-[12px] text-sich-label">{weekCountLabel}</span>
        : <Skeleton className="h-3 w-52" />}
    </Card>
  )
}

const MonthSummaryCard = ({ state }: { state: ScheduleCustomerState }) => {
  const { monthSummary, loaded } = state

  return (
    <Card className="flex flex-col border border-sich-border p-5.5">
      <SubTitle text={COPY.monthSummary} className="font-semibold text-sich-heading" />
      {loaded ? (
        <StatsSummary items={[
          { value: String(monthSummary.scheduled), label: COPY.scheduled },
          { value: String(monthSummary.done), label: COPY.done },
        ]} />
      ) : (
        <Skeleton className="mt-4 h-10 w-full" />
      )}
    </Card>
  )
}

const RecentHistoryCard = ({ state }: { state: ScheduleCustomerState }) => {
  const { recentHistory, loaded, now } = state

  return (
    <Card className="flex flex-col gap-3.5 border border-sich-border px-5.5 pt-7 pb-9">
      <SubTitle text={COPY.recentHistory} className="font-semibold text-sich-heading" />
      <CustomerAppointmentList appointments={recentHistory} loaded={loaded} tab="history" now={now} variant="row" />
    </Card>
  )
}

const ScheduleCustomerDesktop = ({ state }: { state: ScheduleCustomerState }) => {
  const { animationClass, selectedTab, setSelectedTab, appointments, loaded, tab, now, dayFilter } = state

  return (
    <section className={`flex w-full flex-col gap-5 px-10 py-8 ${animationClass}`}>
      <header className="flex flex-col gap-1">
        <Title text={SCHEDULE_CUSTOMER_COPY.title} className="lg:text-left lg:text-[26px] lg:font-bold lg:tracking-[-0.4px]" />
        <span className="text-[13px] text-sich-label">{SCHEDULE_CUSTOMER_COPY.subtitle}</span>
      </header>

      <div className="grid grid-cols-[minmax(0,1fr)_360px] items-start gap-6 pt-6">
        <div className="flex flex-col gap-4.5">
          <SlideToggle
            variant="outline"
            className="h-12 w-60 rounded-[14px] text-[13px]"
            selectedIndex={selectedTab}
            onSelectedIndexChange={setSelectedTab}
            options={TAB_OPTIONS}
            aria-label="Alternar entre próximos e histórico"
          />
          <CustomerAppointmentList appointments={appointments} loaded={loaded} tab={tab} now={now} variant="row" dayFilter={dayFilter} />
          {tab === "upcoming" && <RecentHistoryCard state={state} />}
        </div>

        <div className="flex flex-col gap-6">
          <WeekCard state={state} />
          <MonthSummaryCard state={state} />
        </div>
      </div>
    </section>
  )
}

export default ScheduleCustomerDesktop
