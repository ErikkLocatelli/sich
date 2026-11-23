import { useQuery } from "@tanstack/react-query"

import type { ProductResponse } from "../../api/product/product"
import { providerProductsQuery } from "../../api/product/productQueries"

const NO_PRODUCTS: ProductResponse[] = []

export const useProducts = () => {
  const { data, isFetching, error } = useQuery(providerProductsQuery())

  return { products: data ?? NO_PRODUCTS, loading: isFetching, error: error?.message ?? null }
}
