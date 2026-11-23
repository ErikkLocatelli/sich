import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { providerSearchQuery } from "@/api/provider/providerQueries"
import type { ProviderSummaryResponse } from "@/api/provider/provider"

import { useDebouncedValue } from "../useDebouncedValue"

const SEARCH_DEBOUNCE_MS = 300
const NO_PROVIDERS: ProviderSummaryResponse[] = []

export const useProviderSearch = (query: string, categoryIds: number[]) => {
  // Serialized so a new array with the same ids doesn't restart the debounce
  const searchKey = JSON.stringify([query.trim(), categoryIds])
  const debouncedKey = useDebouncedValue(searchKey, SEARCH_DEBOUNCE_MS)
  const [term, ids] = JSON.parse(debouncedKey) as [string, number[]]

  // Previous results stay on screen while the next search loads
  const { data, isPending, isPlaceholderData } = useQuery({
    ...providerSearchQuery(term, ids),
    placeholderData: keepPreviousData,
  })

  return {
    providers: data ?? NO_PROVIDERS,
    loaded: debouncedKey === searchKey && !isPending && !isPlaceholderData,
  }
}
