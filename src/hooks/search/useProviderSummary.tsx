import { useEffect, useState } from "react"

import { PROVIDER_GET, type ProviderSummaryResponse } from "@/api/provider/provider"
import { toast } from "@/components/ui/toast"

import useFetch from "../useFetch"

export const useProviderSummary = (providerId: number | null) => {
  const { request } = useFetch()
  const [provider, setProvider] = useState<ProviderSummaryResponse | null>(null)

  useEffect(() => {
    if (providerId === null) return

    const loadProvider = async () => {
      const token = window.localStorage.getItem("token")
      if (!token) return

      const { url, options } = PROVIDER_GET(token, providerId)
      const { response, json } = await request(url, options)

      if (!response?.ok) {
        toast.add({ type: "error", description: json?.message || "Erro ao carregar profissional" })
        return
      }

      setProvider(json as ProviderSummaryResponse)
    }

    loadProvider()
  }, [request, providerId])

  return { provider }
}
