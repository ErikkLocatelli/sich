import { useEffect, useState } from "react"

import useFetch from "../useFetch"
import { toast } from "../../components/ui/toast"
import { APPOINTMENTS_HISTORY_GET, type AppointmentResponse, type PageResponse } from "../../api/schedule/appointments"

/** Most recent appointments that already started, canceled ones included. */
export const useAppointmentHistory = (size: number) => {
  const { request, loading } = useFetch()
  const [appointments, setAppointments] = useState<AppointmentResponse[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const loadHistory = async () => {
      const token = window.localStorage.getItem("token")
      if (!token) return

      const { url, options } = APPOINTMENTS_HISTORY_GET(token, 0, size)
      const { json, response } = await request(url, options)
      setLoaded(true)

      if (!response?.ok) {
        toast.add({
          type: "error",
          description: json?.message ?? "Não foi possível carregar o histórico."
        })
        return
      }

      setAppointments((json as PageResponse<AppointmentResponse>).content)
    }

    loadHistory()
  }, [request, size])

  return { appointments, loading, loaded }
}
