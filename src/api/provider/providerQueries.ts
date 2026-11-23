import { queryOptions, type QueryClient } from "@tanstack/react-query"

import type { ProductResponse } from "../product/product"
import { apiFetch, requireToken } from "../client"
import { queryKeys } from "../queryKeys"
import {
  PROVIDER_AVAILABILITY_GET,
  PROVIDER_GET,
  PROVIDER_PRODUCTS_GET,
  PROVIDERS_SEARCH_GET,
  type AvailabilityResponse,
  type ProviderSummaryResponse
} from "./provider"

export const providerSearchQuery = (term: string, categoryIds: number[]) =>
  queryOptions({
    queryKey: queryKeys.providers.search(term, categoryIds),
    queryFn: () => apiFetch<ProviderSummaryResponse[]>(PROVIDERS_SEARCH_GET(requireToken(), term, categoryIds)),
    meta: { errorMessage: "Erro ao buscar profissionais" },
  })

/** The search results have the same shape, so a provider picked from a list opens without a request. */
const providerFromSearches = (queryClient: QueryClient, providerId: number | null) => {
  if (providerId === null) return undefined
  let newest: { provider: ProviderSummaryResponse; updatedAt: number } | undefined

  for (const query of queryClient.getQueryCache().findAll({ queryKey: queryKeys.providers.searchAll })) {
    const provider = (query.state.data as ProviderSummaryResponse[] | undefined)?.find((item) => item.id === providerId)
    if (provider && (!newest || query.state.dataUpdatedAt > newest.updatedAt)) {
      newest = { provider, updatedAt: query.state.dataUpdatedAt }
    }
  }

  return newest
}

export const providerQuery = (queryClient: QueryClient, providerId: number | null) =>
  queryOptions({
    queryKey: queryKeys.providers.detail(providerId ?? 0),
    queryFn: () => apiFetch<ProviderSummaryResponse>(PROVIDER_GET(requireToken(), providerId ?? 0)),
    enabled: providerId !== null,
    initialData: () => providerFromSearches(queryClient, providerId)?.provider,
    initialDataUpdatedAt: () => providerFromSearches(queryClient, providerId)?.updatedAt,
    meta: { errorMessage: "Erro ao carregar profissional" },
  })

export const providerCatalogQuery = (providerId: number | null) =>
  queryOptions({
    queryKey: queryKeys.providers.products(providerId ?? 0),
    queryFn: () => apiFetch<ProductResponse[]>(PROVIDER_PRODUCTS_GET(requireToken(), providerId ?? 0)),
    enabled: providerId !== null,
    staleTime: 5 * 60_000,
    meta: { errorMessage: "Erro ao carregar serviços" },
  })

/** Free slots change as other customers book, so they go stale quickly. */
export const availabilityQuery = (providerId: number | null, date: string, productId: number | null) =>
  queryOptions({
    queryKey: queryKeys.providers.availability(providerId ?? 0, date, productId === null ? [] : [productId]),
    queryFn: () =>
      apiFetch<AvailabilityResponse>(PROVIDER_AVAILABILITY_GET(requireToken(), providerId ?? 0, date, productId === null ? [] : [productId])),
    enabled: providerId !== null && productId !== null,
    staleTime: 15_000,
    meta: { errorMessage: "Erro ao carregar horários" },
  })
