import { useQuery, useQueryClient } from "@tanstack/react-query"

import { providerQuery } from "@/api/provider/providerQueries"

export const useProviderSummary = (providerId: number | null) => {
  const queryClient = useQueryClient()
  const { data } = useQuery(providerQuery(queryClient, providerId))

  return { provider: data ?? null }
}
