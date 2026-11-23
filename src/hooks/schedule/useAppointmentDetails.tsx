import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { apiFetch, requireToken } from "../../api/client"
import { queryKeys } from "../../api/queryKeys"
import { APPOINTMENT_CANCEL_PATCH, type AppointmentResponse } from "../../api/schedule/appointments"
import { appointmentQuery } from "../../api/schedule/scheduleQueries"
import { toast } from "../../components/ui/toast"

export const useAppointmentDetails = (appointmentId: number) => {
  const queryClient = useQueryClient()
  const validId = Number.isInteger(appointmentId)
  const { data, isPending, isError } = useQuery(appointmentQuery(queryClient, appointmentId))

  const cancelMutation = useMutation({
    mutationFn: (id: number) => apiFetch<AppointmentResponse>(APPOINTMENT_CANCEL_PATCH(requireToken(), id)),
    meta: { errorMessage: "Não foi possível cancelar o atendimento." },
    onSuccess: (appointment) => {
      queryClient.setQueryData(queryKeys.provider.appointments.detail(appointment.id), appointment)
      // Lists, summaries and history change; the detail itself is already up to date
      queryClient.invalidateQueries({
        queryKey: queryKeys.provider.appointments.all,
        predicate: (query) => query.queryKey[2] !== queryKeys.provider.appointments.details[2],
      })
      toast.add({ type: "success", description: "Atendimento cancelado. O horário foi liberado na sua agenda." })
    },
  })

  const cancel = () => {
    if (!data) return
    cancelMutation.mutate(data.id)
  }

  return {
    appointment: data ?? null,
    loading: validId && isPending,
    notFound: !validId || isError,
    canceling: cancelMutation.isPending,
    cancel,
  }
}
