import { useMutation, useQueryClient } from "@tanstack/react-query"

import { apiFetch, requireToken } from "@/api/client"
import { PRODUCT_DELETE, PRODUCT_STATUS_PUT, type ProductResponse } from "@/api/product/product"
import { queryKeys } from "@/api/queryKeys"
import { toast } from "@/components/ui/toast"

type CatalogSnapshot = { previous: ProductResponse[] | undefined }

const LIST_KEY = queryKeys.provider.products.list

/**
 * Optimistic catalog changes: the list updates at once and is restored if the
 * request fails.
 */
const useOptimisticCatalog = () => {
  const queryClient = useQueryClient()

  const apply = async (update: (products: ProductResponse[]) => ProductResponse[]): Promise<CatalogSnapshot> => {
    // A refetch landing after the optimistic write would undo it
    await queryClient.cancelQueries({ queryKey: LIST_KEY })
    const previous = queryClient.getQueryData<ProductResponse[]>(LIST_KEY)
    queryClient.setQueryData<ProductResponse[]>(LIST_KEY, (products) => products && update(products))
    return { previous }
  }

  const rollback = (snapshot: CatalogSnapshot | undefined) => {
    if (snapshot) queryClient.setQueryData(LIST_KEY, snapshot.previous)
  }

  return { queryClient, apply, rollback }
}

export const useDeleteProduct = () => {
  const { queryClient, apply, rollback } = useOptimisticCatalog()

  return useMutation({
    mutationFn: (id: number) => apiFetch<unknown>(PRODUCT_DELETE(requireToken(), id)),
    meta: { errorMessage: "Erro ao excluir produto" },
    onMutate: (id) => apply((products) => products.filter((product) => product.id !== id)),
    onError: (_error, _id, snapshot) => rollback(snapshot),
    onSuccess: (_response, id) => {
      queryClient.removeQueries({ queryKey: queryKeys.provider.products.detail(id) })
      toast.add({ type: "success", description: "Produto excluído com sucesso" })
    },
  })
}

type StatusChange = { id: number; active: boolean }

export const useToggleProductStatus = () => {
  const { queryClient, apply, rollback } = useOptimisticCatalog()

  return useMutation({
    // Same contract as before the migration: sends the current status, shows the opposite one
    mutationFn: ({ id, active }: StatusChange) => apiFetch<unknown>(PRODUCT_STATUS_PUT(requireToken(), id, active)),
    meta: { errorMessage: "Erro ao atualizar status do produto" },
    onMutate: ({ id, active }) =>
      apply((products) => products.map((product) => (product.id === id ? { ...product, active: !active } : product))),
    onError: (_error, _change, snapshot) => rollback(snapshot),
    onSuccess: (_response, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.provider.products.detail(id) })
      toast.add({ type: "success", description: "Status do produto atualizado com sucesso" })
    },
  })
}
