import { useQuery } from "@tanstack/react-query"

import { categoriesQuery } from "@/api/product/productQueries"
import type { CategoryResponse } from "@/api/product/product"

const NO_CATEGORIES: CategoryResponse[] = []

export const useCategories = () => {
  const { data, isFetching, isPending, error } = useQuery(categoriesQuery())

  return {
    categories: data ?? NO_CATEGORIES,
    loading: isFetching,
    // True once the request has finished, successfully or not
    loaded: !isPending,
    error: error?.message ?? null,
  }
}
