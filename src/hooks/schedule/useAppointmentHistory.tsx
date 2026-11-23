import { useQuery } from "@tanstack/react-query"

import type { AppointmentResponse, PageResponse } from "../../api/schedule/appointments"
import { appointmentHistoryQuery } from "../../api/schedule/scheduleQueries"

const NO_APPOINTMENTS: AppointmentResponse[] = []

const pageContent = (page: PageResponse<AppointmentResponse>) => page.content

/** Most recent appointments that already started, canceled ones included. */
export const useAppointmentHistory = (size: number) => {
  const { data, isFetching, isPending } = useQuery({ ...appointmentHistoryQuery(size), select: pageContent })

  return { appointments: data ?? NO_APPOINTMENTS, loading: isFetching, loaded: !isPending }
}
