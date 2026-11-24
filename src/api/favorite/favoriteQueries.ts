import { queryOptions } from "@tanstack/react-query"

import type { ProviderSummaryResponse } from "../provider/provider"
import { apiFetch, requireToken } from "../client"
import { queryKeys } from "../queryKeys"
import { FAVORITES_GET } from "./favorite"

/** Newest favorite first. */
export const favoritesQuery = () =>
  queryOptions({
    queryKey: queryKeys.customer.favorites,
    queryFn: () => apiFetch<ProviderSummaryResponse[]>(FAVORITES_GET(requireToken())),
    meta: { errorMessage: "Não foi possível carregar seus favoritos." },
  })
