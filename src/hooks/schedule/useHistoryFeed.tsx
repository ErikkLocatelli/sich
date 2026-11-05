import { useCallback, useEffect, useRef, useState } from "react"

import useFetch from "../useFetch"
import { toast } from "../../components/ui/toast"
import { APPOINTMENTS_HISTORY_GET, type AppointmentResponse, type PageResponse } from "../../api/schedule/appointments"

/**
 * Paginated history limited to appointments that started on or after `since`
 * ("yyyy-MM-dd"). The API returns newest first, so the first item older than the
 * cutoff means there is nothing else to load.
 */
export const useHistoryFeed = (since: string, pageSize: number) => {
  const { request, loading } = useFetch()
  const [appointments, setAppointments] = useState<AppointmentResponse[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [loaded, setLoaded] = useState(false)
  const nextPage = useRef(0)
  const inFlight = useRef(false)

  const loadMore = useCallback(async () => {
    if (inFlight.current || !hasMore) return

    const token = window.localStorage.getItem("token")
    if (!token) return

    inFlight.current = true
    const { url, options } = APPOINTMENTS_HISTORY_GET(token, nextPage.current, pageSize)
    const { json, response } = await request(url, options)
    inFlight.current = false

    if (!response?.ok) {
      setHasMore(false)
      toast.add({
        type: "error",
        description: json?.message ?? "Não foi possível carregar o histórico."
      })
      return
    }

    const page = json as PageResponse<AppointmentResponse>
    const recent = page.content.filter((appointment) => appointment.startAt.slice(0, 10) >= since)
    const reachedCutoff = recent.length < page.content.length

    nextPage.current = page.page + 1
    setAppointments((previous) => [...previous, ...recent])
    setHasMore(!reachedCutoff && nextPage.current < page.totalPages)
    setLoaded(true)
  }, [hasMore, pageSize, request, since])

  // First page only; the next ones come from the scroll sentinel.
  useEffect(() => {
    if (!loaded) loadMore()
  }, [loaded, loadMore])

  return { appointments, hasMore, loading, loaded, loadMore }
}
