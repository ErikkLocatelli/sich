import { useQuery } from "@tanstack/react-query"

import type { ProductResponse } from "@/api/product/product"
import { providerCatalogQuery } from "@/api/provider/providerQueries"

const NO_PRODUCTS: ProductResponse[] = []

export const useProviderProducts = (providerId: number | null) => {
  const { data, isPending } = useQuery(providerCatalogQuery(providerId))

  return { products: data ?? NO_PRODUCTS, loaded: !isPending }
}
