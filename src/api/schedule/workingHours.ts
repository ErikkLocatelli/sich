import { API_URL } from "../api"

export type WorkingInterval = {
  weekday: number
  start: string
  end: string
}

export type WorkingHoursRequest = {
  intervals: WorkingInterval[]
}

export const WORKING_HOURS_GET = (token: string) => {
  return {
    url: API_URL + "/providers/me/working-hours",
    options: {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  }
}

export const WORKING_HOURS_PUT = (token: string, body: WorkingHoursRequest) => {
  return {
    url: API_URL + "/providers/me/working-hours",
    options: {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    }
  }
}
