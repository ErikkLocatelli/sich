import { Check } from "lucide-react"

import type { ProviderBookingState } from "@/hooks/search/useProviderBookingPage"

import ArrowBack from "@/components/commons/ArrowBack"
import BookingDatePicker from "@/components/pages/search/BookingDatePicker"
import BookingServiceList from "@/components/pages/search/BookingServiceList"
import BookingSummary from "@/components/pages/search/BookingSummary"
import BookingTimeSlots from "@/components/pages/search/BookingTimeSlots"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"

const ProviderBookingMobile = ({ state }: { state: ProviderBookingState }) => {
  const {
    animationClass, providerName, products, productsLoaded, selectedProduct, selectProduct, monthLabel, days, weekOffset,
    canGoBackWeek, changeWeek, selectedDate, selectDate, startTimes, timesLoaded, selectedTime, selectTime, dateTimeLabel,
    submitting, canConfirm, confirm,
  } = state

  return (
    <div className={`w-full ${animationClass}`}>
      <header className="flex items-center gap-3 bg-white px-6 py-4">
        <ArrowBack to="/search" label="Voltar para a busca" />
        <div className="flex min-w-0 flex-col">
          <span className="text-[11px] text-sich-label">Agendamento</span>
          {providerName ? (
            <h1 className="truncate text-[18px] font-semibold text-sich-heading">{providerName}</h1>
          ) : (
            <Skeleton className="mt-1 h-4 w-32" />
          )}
        </div>
      </header>

      <div className="flex flex-col gap-6 px-6 py-5">
        <section className="flex flex-col gap-3">
          <h2 className="text-[14px] font-semibold text-sich-heading">Escolha o serviço</h2>
          <BookingServiceList products={products} loaded={productsLoaded} selectedId={selectedProduct?.id ?? null} onSelect={selectProduct} />
        </section>

        {selectedProduct && (
          <>
            <BookingDatePicker
              monthLabel={monthLabel}
              days={days}
              weekOffset={weekOffset}
              canGoBack={canGoBackWeek}
              onWeekChange={changeWeek}
              selectedDate={selectedDate}
              onSelectedDateChange={selectDate}
            />

            <section className="flex flex-col gap-3">
              <h2 className="text-[14px] font-semibold text-sich-heading">Horário</h2>
              <BookingTimeSlots times={startTimes} loaded={timesLoaded} selectedTime={selectedTime} onSelect={selectTime} />
            </section>

            <BookingSummary
              serviceName={selectedProduct.name}
              providerName={providerName}
              dateTimeLabel={dateTimeLabel}
              total={selectedProduct.price}
            />

            <Button
              onClick={confirm}
              disabled={!canConfirm}
              className="h-12 w-full rounded-[16px] bg-sich-gradient text-[14px] font-semibold shadow-sich-button"
            >
              {submitting ? <Spinner /> : <Check />}
              Confirmar agendamento
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default ProviderBookingMobile
