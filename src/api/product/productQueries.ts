import { queryOptions, type QueryClient } from "@tanstack/react-query"

import { apiFetch, requireToken } from "../client"
import { queryKeys } from "../queryKeys"
import { CATEGORIES_GET, PRODUCT_GET, PRODUCTS_GET, type CategoryResponse, type ProductResponse } from "./product"

export const categoriesQuery = () =>
  queryOptions({
    queryKey: queryKeys.categories,
    queryFn: () => apiFetch<CategoryResponse[]>(CATEGORIES_GET(requireToken())),
    // Reference data, practically static during a session
    staleTime: Infinity,
    meta: { errorMessage: "Não foi possível carregar os serviços." },
  })

export const providerProductsQuery = () =>
  queryOptions({
    queryKey: queryKeys.provider.products.list,
    queryFn: () => apiFetch<ProductResponse[]>(PRODUCTS_GET(requireToken())),
    staleTime: 5 * 60_000,
    meta: { errorMessage: "Não foi possível carregar seus produtos." },
  })

/** Seeds the product from the catalog already in cache, so opening "edit" from the list costs no request. */
export const providerProductQuery = (queryClient: QueryClient, productId: number) =>
  queryOptions({
    queryKey: queryKeys.provider.products.detail(productId),
    queryFn: () => apiFetch<ProductResponse>(PRODUCT_GET(requireToken(), productId)),
    enabled: Number.isInteger(productId),
    staleTime: 5 * 60_000,
    initialData: () =>
      queryClient
        .getQueryData<ProductResponse[]>(queryKeys.provider.products.list)
        ?.find((product) => product.id === productId),
    initialDataUpdatedAt: () => queryClient.getQueryState(queryKeys.provider.products.list)?.dataUpdatedAt,
    meta: { errorMessage: "Não foi possível carregar o produto." },
  })
