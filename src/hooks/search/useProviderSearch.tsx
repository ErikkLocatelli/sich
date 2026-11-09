import { useEffect, useState } from "react"

import { PROVIDERS_SEARCH_GET, type ProviderSummaryResponse } from "@/api/provider/provider"
import { toast } from "@/components/ui/toast"

import useFetch from "../useFetch"

const SEARCH_DEBOUNCE_MS = 300

export const useProviderSearch = (query: string, categoryIds: number[]) => {
  const { request } = useFetch()
  const [providers, setProviders] = useState<ProviderSummaryResponse[]>([])
  // Search whose result is in state; a different key means it's still loading
  const [loadedKey, setLoadedKey] = useState<string | null>(null)

  const term = query.trim()
  const categoryKey = categoryIds.join(",")
  const key = `${term}|${categoryKey}`

  useEffect(() => {
    let ignore = false

    const timeout = window.setTimeout(async () => {
      const token = window.localStorage.getItem("token")
      if (!token) return

      const ids = categoryKey ? categoryKey.split(",").map(Number) : []
      const { url, options } = PROVIDERS_SEARCH_GET(token, term, ids)
      const { response, json } = await request(url, options)

      // A newer search started while this one was in flight
      if (ignore) return

      if (!response?.ok) {
        toast.add({ type: "error", description: json?.message || "Erro ao buscar profissionais" })
        setProviders([])
      } else {
        setProviders(json as ProviderSummaryResponse[])
      }
      setLoadedKey(`${term}|${categoryKey}`)
    }, SEARCH_DEBOUNCE_MS)

    return () => {
      ignore = true
      window.clearTimeout(timeout)
    }
  }, [request, term, categoryKey])

  return { providers, loaded: loadedKey === key }
}
