import { useCallback, useEffect, useState } from "react"

import { PROVIDER_AVAILABILITY_GET, type AvailabilityResponse } from "@/api/provider/provider"
import { toast } from "@/components/ui/toast"

import useFetch from "../useFetch"

/** Free start times of the provider on `date` for one product; empty until a product is chosen. */
export const useAvailability = (providerId: number | null, date: string, productId: number | null) => {
  const { request } = useFetch()
  const [startTimes, setStartTimes] = useState<string[]>([])
  const [loadedKey, setLoadedKey] = useState<string | null>(null)
  const [version, setVersion] = useState(0)

  const key = `${providerId}|${date}|${productId}|${version}`

  useEffect(() => {
    if (providerId === null || productId === null) return
    let ignore = false

    const loadAvailability = async () => {
      const token = window.localStorage.getItem("token")
      if (!token) return

      const { url, options } = PROVIDER_AVAILABILITY_GET(token, providerId, date, [productId])
      const { response, json } = await request(url, options)

      // The date or product changed while this request was in flight
      if (ignore) return

      if (!response?.ok) {
        toast.add({ type: "error", description: json?.message || "Erro ao carregar horários" })
        setStartTimes([])
      } else {
        setStartTimes((json as AvailabilityResponse).startTimes.map((time) => time.slice(0, 5)))
      }
      setLoadedKey(`${providerId}|${date}|${productId}|${version}`)
    }

    loadAvailability()

    return () => {
      ignore = true
    }
  }, [request, providerId, date, productId, version])

  const reload = useCallback(() => setVersion((current) => current + 1), [])

  return { startTimes, loaded: loadedKey === key, reload }
}
