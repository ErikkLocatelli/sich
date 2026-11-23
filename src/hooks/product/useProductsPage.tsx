import { useState } from "react"

import { filterCatalog } from "@/services/product/productStats"

import usePreviousRoute from "../usePreviousRoute"
import { useDeleteProduct, useToggleProductStatus } from "./useProductMutations"
import { useProducts } from "./useProducts"

/** State, data and actions shared by the mobile and desktop products screens. */
export const useProductsPage = () => {
  const previousRoute = usePreviousRoute()
  const [catalogFilter, setCatalogFilter] = useState(0)
  const { products } = useProducts()
  const deleteProduct = useDeleteProduct()
  const toggleStatus = useToggleProductStatus()

  const handleDeleteProduct = (id: number) => deleteProduct.mutate(id)

  const handleStatus = (id: number, active: boolean) => toggleStatus.mutate({ id, active })

  return {
    animationClass: previousRoute === "/" || previousRoute === "/schedule" ? "animateRight" : "animateLeft",
    products,
    hasProducts: products.length > 0,
    filteredProducts: filterCatalog(products, catalogFilter),
    catalogFilter,
    setCatalogFilter,
    handleDeleteProduct,
    handleStatus,
  }
}

export type ProductsPageState = ReturnType<typeof useProductsPage>
