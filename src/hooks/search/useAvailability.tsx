import { useQuery } from "@tanstack/react-query"

import type { AvailabilityResponse } from "@/api/provider/provider"
import { availabilityQuery } from "@/api/provider/providerQueries"

const NO_TIMES: string[] = []

const toStartTimes = (availability: AvailabilityResponse) => availability.startTimes.map((time) => time.slice(0, 5))

export const useAvailability = (providerId: number | null, date: string, productId: number | null) => {
  const { data, isPending, isRefetching, refetch } = useQuery({
    ...availabilityQuery(providerId, date, productId),
    select: toStartTimes,
  })

  return {
    startTimes: data ?? NO_TIMES,
    // A reload after a failed booking hides the outdated slots until it finishes
    loaded: !isPending && !isRefetching,
    reload: refetch,
  }
}
