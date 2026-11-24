import { useMemo, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { benefitsQuery } from "@/api/benefit/benefitQueries"
import { apiFetch, requireToken } from "@/api/client"
import { queryKeys } from "@/api/queryKeys"
import type { AppointmentResponse } from "@/api/schedule/appointments"
import { CUSTOMER_APPOINTMENT_POST, type CustomerAppointmentRequest } from "@/api/schedule/customerAppointments"
import { toast } from "@/components/ui/toast"
import { cashbackDiscount } from "@/services/benefit/cashback"
import { BOOKING_DAYS, bookingDateTimeLabel, bookingStartAt, bookingStripStart } from "@/services/search/booking"
import { filterProducts, filtersFromSearch, providerSubtitle } from "@/services/search/searchFilters"
import { monthYearLabel, nextDays, shortDateLabel, toIsoDate } from "@/services/schedule/agendaDates"

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
  const queryClient = useQueryClient()
  const params = useParams()
  const [searchParams] = useSearchParams()

  const providerId = parseProviderId(params.providerId)
  const filters = useMemo(() => filtersFromSearch(searchParams), [searchParams])
  const [today] = useState(() => new Date())

  const [pickedProductId, setPickedProductId] = useState<number | null>(null)
  const [weekOffset, setWeekOffset] = useState(0)
  const [selectedDate, setSelectedDate] = useState(() => toIsoDate(today))
  const [pickedTime, setPickedTime] = useState<string | null>(null)
  const [wantsCashback, setWantsCashback] = useState(false)

  const { provider } = useProviderSummary(providerId)
  const { products, loaded: productsLoaded } = useProviderProducts(providerId)
  const visibleProducts = filterProducts(products, filters)
  const selectedProduct = visibleProducts.find((product) => product.id === pickedProductId) ?? visibleProducts[0] ?? null

  const days = nextDays(bookingStripStart(today, weekOffset), BOOKING_DAYS)
  const { startTimes, loaded: timesLoaded, reload: reloadTimes } = useAvailability(providerId, selectedDate, selectedProduct?.id ?? null)
  const selectedTime = pickedTime && startTimes.includes(pickedTime) ? pickedTime : null

  const { data: benefits } = useQuery(benefitsQuery())
  const price = selectedProduct?.price ?? 0
  const cashbackBalance = benefits?.cashbackBalance ?? 0
  const availableDiscount = benefits ? cashbackDiscount(price, cashbackBalance, benefits.maxCashbackUsageRate) : 0
  const cashbackApplied = wantsCashback && availableDiscount > 0
  const discount = cashbackApplied ? availableDiscount : 0

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

  const booking = useMutation({
    mutationFn: (body: CustomerAppointmentRequest) =>
      apiFetch<AppointmentResponse>(CUSTOMER_APPOINTMENT_POST(requireToken(), body)),
    meta: { errorMessage: "Erro ao confirmar agendamento" },
    onSuccess: (_appointment, body) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.customer.appointments.all })
      // Balance (discount used) and pending cashback changed
      queryClient.invalidateQueries({ queryKey: queryKeys.customer.benefits })
      queryClient.invalidateQueries({ queryKey: queryKeys.providers.availabilityAll(body.providerId) })
      toast.add({ type: "success", description: "Agendamento confirmado" })
      navigate("/schedule")
    },
    // The slot may have been taken in the meantime
    onError: () => reloadTimes(),
  })
  const submitting = booking.isPending

  const confirm = () => {
    if (!providerId || !selectedProduct || !selectedTime || submitting) return

    booking.mutate({
      providerId,
      startAt: bookingStartAt(selectedDate, selectedTime),
      productIds: [selectedProduct.id],
      notes: null,
      useCashback: cashbackApplied,
    })
  }

  return {
    animationClass: previousRoute?.startsWith("/search") ? "animateLeft" : "animateRight",
    validProvider: providerId !== null,
    providerId,
    providerName: provider?.name ?? "",
    providerPhoto: provider?.photo ?? null,
    providerFavorite: provider?.favorite ?? false,
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
    price,
    cashback: {
      /** Hidden when there is nothing to use on this booking */
      visible: availableDiscount > 0,
      balance: cashbackBalance,
      availableDiscount,
      enabled: cashbackApplied,
      toggle: setWantsCashback,
    },
    discount,
    totalToPay: Math.round((price - discount) * 100) / 100,
    submitting,
    canConfirm: !!selectedProduct && !!selectedTime && !submitting,
    confirm,
  }
}

export type ProviderBookingState = ReturnType<typeof useProviderBookingPage>
