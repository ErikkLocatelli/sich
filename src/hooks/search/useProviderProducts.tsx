import { useEffect, useState } from "react"

import type { ProductResponse } from "@/api/product/product"
import { PROVIDER_PRODUCTS_GET } from "@/api/provider/provider"
import { toast } from "@/components/ui/toast"

import useFetch from "../useFetch"

/** Active products of a provider, as seen by a customer. */
export const useProviderProducts = (providerId: number | null) => {
  const { request } = useFetch()
  const [products, setProducts] = useState<ProductResponse[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (providerId === null) return

    const loadProducts = async () => {
      const token = window.localStorage.getItem("token")
      if (!token) return

      const { url, options } = PROVIDER_PRODUCTS_GET(token, providerId)
      const { response, json } = await request(url, options)

      if (!response?.ok) {
        toast.add({ type: "error", description: json?.message || "Erro ao carregar serviços" })
      } else {
        setProducts(json as ProductResponse[])
      }
      setLoaded(true)
    }

    loadProducts()
  }, [request, providerId])

  return { products, loaded }
}
