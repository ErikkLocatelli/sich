import { useState } from "react"

import { PRODUCT_DELETE, PRODUCT_STATUS_PUT } from "@/api/product/product"
import { toast } from "@/components/ui/toast"
import { filterCatalog } from "@/services/product/productStats"

import useFetch from "../useFetch"
import usePreviousRoute from "../usePreviousRoute"
import { useProducts } from "./useProducts"

/** State, data and actions shared by the mobile and desktop products screens. */
export const useProductsPage = () => {
  const previousRoute = usePreviousRoute()
  const { request } = useFetch()
  const [catalogFilter, setCatalogFilter] = useState(0)
  const { products, removeProduct, updateProductStatus } = useProducts()

  const handleDeleteProduct = async (id: number) => {
    const token = window.localStorage.getItem("token")
    if (!token) return

    const { url, options } = PRODUCT_DELETE(token, id)
    const { response, json } = await request(url, options)

    if (!response?.ok) {
      toast.add({ type: "error", description: json?.message || "Erro ao excluir produto" })
      return
    }

    removeProduct(id)
    toast.add({ type: "success", description: "Produto excluído com sucesso" })
  }

  const handleStatus = async (id: number, active: boolean) => {
    const token = window.localStorage.getItem("token")
    if (!token) return

    const { url, options } = PRODUCT_STATUS_PUT(token, id, active)
    const { response, json } = await request(url, options)

    if (!response?.ok) {
      toast.add({ type: "error", description: json?.message || "Erro ao atualizar status do produto" })
      return
    }

    updateProductStatus(id, !active)
    toast.add({ type: "success", description: "Status do produto atualizado com sucesso" })
  }

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
