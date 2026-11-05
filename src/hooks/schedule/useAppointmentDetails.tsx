import { useEffect, useState } from "react"

import useFetch from "../useFetch"
import { toast } from "../../components/ui/toast"
import { APPOINTMENT_CANCEL_PATCH, APPOINTMENT_GET, type AppointmentResponse } from "../../api/schedule/appointments"

export const useAppointmentDetails = (appointmentId: number) => {
  const { request, loading } = useFetch()
  const { request: requestCancel, loading: canceling } = useFetch()
  const [appointment, setAppointment] = useState<AppointmentResponse | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const loadAppointment = async () => {
      const token = window.localStorage.getItem("token")

      if (!token || !Number.isInteger(appointmentId)) {
        setNotFound(true)
        return
      }

      const { url, options } = APPOINTMENT_GET(token, appointmentId)
      const { json, response } = await request(url, options)

      if (!response?.ok) {
        setNotFound(true)
        toast.add({
          type: "error",
          description: json?.message ?? "Não foi possível carregar o atendimento."
        })
        return
      }

      setAppointment(json as AppointmentResponse)
    }

    loadAppointment()
  }, [request, appointmentId])

  const cancel = async () => {
    const token = window.localStorage.getItem("token")
    if (!token || !appointment) return

    const { url, options } = APPOINTMENT_CANCEL_PATCH(token, appointment.id)
    const { json, response } = await requestCancel(url, options)

    if (!response?.ok) {
      toast.add({
        type: "error",
        description: json?.message ?? "Não foi possível cancelar o atendimento."
      })
      return
    }

    setAppointment(json as AppointmentResponse)
    toast.add({
      type: "success",
      description: "Atendimento cancelado. O horário foi liberado na sua agenda."
    })
  }

  return { appointment, loading, notFound, canceling, cancel }
}
