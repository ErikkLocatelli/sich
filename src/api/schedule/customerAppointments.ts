import { API_URL } from "../api"

export type CustomerAppointmentRequest = {
  providerId: number
  /** Local "yyyy-MM-ddTHH:mm", one of the provider's availability start times */
  startAt: string
  productIds: number[]
  notes: string | null
}

export const CUSTOMER_APPOINTMENT_POST = (token: string, body: CustomerAppointmentRequest) => {
  return {
    url: API_URL + "/customers/me/appointments",
    options: {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    }
  }
}
