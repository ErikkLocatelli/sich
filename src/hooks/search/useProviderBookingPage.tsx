import { useMemo, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"

import { CUSTOMER_APPOINTMENT_POST } from "@/api/schedule/customerAppointments"
import { toast } from "@/components/ui/toast"
import { BOOKING_DAYS, bookingDateTimeLabel, bookingStartAt, bookingStripStart } from "@/services/search/booking"
import { filterProducts, filtersFromSearch, providerSubtitle } from "@/services/search/searchFilters"
import { monthYearLabel, nextDays, shortDateLabel, toIsoDate } from "@/services/schedule/agendaDates"

import useFetch from "../useFetch"
import usePreviousRoute from "../usePreviousRoute"
import { useAvailability } from "./useAvailability"
import { useProviderProducts } from "./useProviderProducts"
import { useProviderSummary } from "./useProviderSummary"

const parseProviderId = (value: string | undefined) => {
  const id = Number(value)
  return Number.isInteger(id) && id > 0 ? id : null
}

export const useProviderBookingPage = () => {
  const previousRoute = usePreviousRoute()
  const navigate = useNavigate()
  const { request } = useFetch()
  const params = useParams()
  const [searchParams] = useSearchParams()

  const providerId = parseProviderId(params.providerId)
  const filters = useMemo(() => filtersFromSearch(searchParams), [searchParams])
  const [today] = useState(() => new Date())

  const [pickedProductId, setPickedProductId] = useState<number | null>(null)
  const [weekOffset, setWeekOffset] = useState(0)
  const [selectedDate, setSelectedDate] = useState(() => toIsoDate(today))
  const [pickedTime, setPickedTime] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const { provider } = useProviderSummary(providerId)
  const { products, loaded: productsLoaded } = useProviderProducts(providerId)
  const visibleProducts = filterProducts(products, filters)
  const selectedProduct = visibleProducts.find((product) => product.id === pickedProductId) ?? visibleProducts[0] ?? null

  const days = nextDays(bookingStripStart(today, weekOffset), BOOKING_DAYS)
  const { startTimes, loaded: timesLoaded, reload: reloadTimes } = useAvailability(providerId, selectedDate, selectedProduct?.id ?? null)
  const selectedTime = pickedTime && startTimes.includes(pickedTime) ? pickedTime : null

  const selectProduct = (id: number) => {
    setPickedProductId(id)
    setPickedTime(null)
  }

  const selectDate = (date: string) => {
    setSelectedDate(date)
    setPickedTime(null)
  }

  const changeWeek = (offset: number) => {
    if (offset < 0) return
    setWeekOffset(offset)
    selectDate(toIsoDate(bookingStripStart(today, offset)))
  }

  const confirm = async () => {
    if (!providerId || !selectedProduct || !selectedTime || submitting) return

    const token = window.localStorage.getItem("token")
    if (!token) return

    setSubmitting(true)
    const { url, options } = CUSTOMER_APPOINTMENT_POST(token, {
      providerId,
      startAt: bookingStartAt(selectedDate, selectedTime),
      productIds: [selectedProduct.id],
      notes: null,
    })
    const { response, json } = await request(url, options)
    setSubmitting(false)

    if (!response?.ok) {
      toast.add({ type: "error", description: json?.message || "Erro ao confirmar agendamento" })
      // The slot may have been taken in the meantime
      reloadTimes()
      return
    }

    toast.add({ type: "success", description: "Agendamento confirmado" })
    navigate("/schedule")
  }

  return {
    animationClass: previousRoute?.startsWith("/search") ? "animateLeft" : "animateRight",
    validProvider: providerId !== null,
    providerName: provider?.name ?? "",
    providerSubtitle: provider ? providerSubtitle(provider) : "",
    products: visibleProducts,
    productsLoaded,
    selectedProduct,
    selectProduct,
    monthLabel: monthYearLabel(days[0].value),
    days,
    weekOffset,
    canGoBackWeek: weekOffset > 0,
    changeWeek,
    selectedDate,
    selectDate,
    startTimes,
    timesLoaded,
    selectedTime,
    selectTime: setPickedTime,
    dateTimeLabel: selectedTime ? bookingDateTimeLabel(selectedDate, selectedTime) : "—",
    dateLabel: shortDateLabel(selectedDate),
    timeLabel: selectedTime ?? "—",
    submitting,
    canConfirm: !!selectedProduct && !!selectedTime && !submitting,
    confirm,
  }
}

export type ProviderBookingState = ReturnType<typeof useProviderBookingPage>
