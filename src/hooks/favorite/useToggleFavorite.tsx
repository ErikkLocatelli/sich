import { useMutation, useQueryClient, type QueryKey } from "@tanstack/react-query"

import { apiFetch, requireToken } from "@/api/client"
import { FAVORITE_DELETE, FAVORITE_PUT } from "@/api/favorite/favorite"
import type { ProviderSummaryResponse } from "@/api/provider/provider"
import { queryKeys } from "@/api/queryKeys"
import { toast } from "@/components/ui/toast"

export type FavoriteChange = { providerId: number; favorite: boolean }

type Snapshot = Array<[QueryKey, unknown]>

const isProviderCard = (value: unknown): value is ProviderSummaryResponse =>
  typeof value === "object" && value !== null && "id" in value && "favorite" in value

/**
 * Flips `favorite` of one provider inside any cached value under `providers`: search
 * lists (arrays of cards) and the detail (a single card). Products and availability
 * share the prefix but aren't cards, so they are returned untouched.
 */
export const withFavorite = (data: unknown, { providerId, favorite }: FavoriteChange): unknown => {
  if (Array.isArray(data)) {
    if (!data.some((item) => isProviderCard(item) && item.id === providerId)) return data
    return data.map((item) => (isProviderCard(item) && item.id === providerId ? { ...item, favorite } : item))
  }
  if (isProviderCard(data) && data.id === providerId) return { ...data, favorite }
  return data
}

/**
 * Favorites or unfavorites a provider (customers only). The heart changes at once on
 * every screen showing the provider and is restored if the request fails; the toast
 * only shows once the API confirms.
 */
export const useToggleFavorite = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ providerId, favorite }: FavoriteChange) =>
      apiFetch<unknown>(favorite ? FAVORITE_PUT(requireToken(), providerId) : FAVORITE_DELETE(requireToken(), providerId)),
    meta: { errorMessage: "Não foi possível atualizar seus favoritos" },
    onMutate: async (change): Promise<Snapshot> => {
      // A refetch landing after the optimistic write would undo it
      await Promise.all([
        queryClient.cancelQueries({ queryKey: queryKeys.providers.all }),
        queryClient.cancelQueries({ queryKey: queryKeys.customer.favorites }),
      ])
      const snapshot: Snapshot = [
        ...queryClient.getQueriesData({ queryKey: queryKeys.providers.all }),
        ...queryClient.getQueriesData({ queryKey: queryKeys.customer.favorites }),
      ]

      queryClient.setQueriesData({ queryKey: queryKeys.providers.all }, (data: unknown) => withFavorite(data, change))
      if (!change.favorite) {
        queryClient.setQueryData<ProviderSummaryResponse[]>(queryKeys.customer.favorites, (favorites) =>
          favorites?.filter((provider) => provider.id !== change.providerId))
      }
      return snapshot
    },
    onError: (_error, _change, snapshot) => {
      snapshot?.forEach(([key, data]) => queryClient.setQueryData(key, data))
    },
    onSuccess: (_response, { favorite }) => {
      toast.add({
        type: "success",
        description: favorite ? "Profissional adicionado aos favoritos" : "Profissional removido dos favoritos",
      })
    },
    // The favorites list is ordered by the server (newest first)
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.customer.favorites }),
  })
}
