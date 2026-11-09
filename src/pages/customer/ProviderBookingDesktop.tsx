import type { ReactNode } from "react"
import { Check } from "lucide-react"

import type { ProviderBookingState } from "@/hooks/search/useProviderBookingPage"

import Card from "@/components/commons/Card"
import PageHeader from "@/components/commons/PageHeader"
import BookingDatePicker from "@/components/pages/search/BookingDatePicker"
import BookingServiceList from "@/components/pages/search/BookingServiceList"
import BookingSummary from "@/components/pages/search/BookingSummary"
import BookingTimeSlots from "@/components/pages/search/BookingTimeSlots"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"

const BookingStep = ({ title, children }: { title: string; children: ReactNode }) => (
  <Card className="flex flex-col gap-4 p-5">
    <h2 className="text-[16px] font-semibold text-sich-heading">{title}</h2>
    {children}
  </Card>
)

const ProviderBookingDesktop = ({ state }: { state: ProviderBookingState }) => {
  const {
    animationClass, providerName, providerSubtitle, products, productsLoaded, selectedProduct, selectProduct, monthLabel, days,
    weekOffset, canGoBackWeek, changeWeek, selectedDate, selectDate, startTimes, timesLoaded, selectedTime, selectTime,
    dateLabel, timeLabel, submitting, canConfirm, confirm,
  } = state

  return (
    <section className={`flex w-full flex-col gap-6 pb-8 ${animationClass}`}>
      <div className="flex flex-col gap-1">
        <PageHeader text="Agendar atendimento" backTo="/search" backLabel="Voltar para a busca" className="px-10" />
        <div className="pl-24 pr-10">
          {providerName ? (
            <span className="text-[13px] text-sich-label">
              com {providerName}{providerSubtitle && ` · ${providerSubtitle}`}
            </span>
          ) : (
            <Skeleton className="h-3.5 w-56" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_360px] items-start gap-6 px-10">
        <div className="flex flex-col gap-6">
          <BookingStep title="1. Escolha o serviço">
            <BookingServiceList
              products={products}
              loaded={productsLoaded}
              selectedId={selectedProduct?.id ?? null}
              onSelect={selectProduct}
              className="grid grid-cols-3 items-start gap-4"
            />
          </BookingStep>

          {selectedProduct && (
            <>
              <Card className="p-5">
                <BookingDatePicker
                  title="2. Escolha a data"
                  monthLabel={monthLabel}
                  days={days}
                  weekOffset={weekOffset}
                  canGoBack={canGoBackWeek}
                  onWeekChange={changeWeek}
                  selectedDate={selectedDate}
                  onSelectedDateChange={selectDate}
                />
              </Card>

              <BookingStep title="3. Escolha o horário">
                <BookingTimeSlots
                  times={startTimes}
                  loaded={timesLoaded}
                  selectedTime={selectedTime}
                  onSelect={selectTime}
                  className="grid-cols-6"
                />
              </BookingStep>
            </>
          )}
        </div>

        <Card className="sticky top-24 flex flex-col gap-5 p-5">
          {selectedProduct ? (
            <>
              <BookingSummary
                className="bg-transparent p-0"
                rows={[
                  { label: "Profissional", value: providerName },
                  { label: "Serviço", value: selectedProduct.name },
                  { label: "Data", value: dateLabel },
                  { label: "Horário", value: timeLabel },
                ]}
                total={selectedProduct.price}
              />
              <Button
                onClick={confirm}
                disabled={!canConfirm}
                className="h-12 w-full rounded-[14px] bg-sich-gradient text-[14px] font-semibold shadow-sich-button"
              >
                {submitting ? <Spinner /> : <Check />}
                Confirmar agendamento
              </Button>
            </>
          ) : (
            <>
              <h2 className="text-[16px] font-semibold text-sich-heading">Resumo</h2>
              <p className="text-[12px] text-sich-label">Escolha um serviço para ver o resumo.</p>
            </>
          )}
        </Card>
      </div>
    </section>
  )
}

export default ProviderBookingDesktop
