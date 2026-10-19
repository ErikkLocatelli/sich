import { useEffect, useState } from "react"

import useFetch from "../useFetch"
import { PRODUCTS_GET, type ProductResponse } from "../../api/product/product"

export const useProducts = () => {
  const { request, loading, error } = useFetch()
  const [products, setProducts] = useState<ProductResponse[]>([])

  const removeProduct = (id: number) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id))
  }

  const updateProductStatus = (id: number, newStatus: boolean) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === id) {
          return { ...product, active: newStatus }
        }
        return product
      })
    )
  }

  useEffect(() => {
    const loadProducts = async () => {
      const token = window.localStorage.getItem("token")

      if (!token) {
        return
      }

      const { url, options } = PRODUCTS_GET(token)
      const { json, response } = await request(url, options)

      if (response?.ok) {
        setProducts(json as ProductResponse[])
      }
    }

    loadProducts()
  }, [request])

  return { products, loading, error, removeProduct, updateProductStatus }
}