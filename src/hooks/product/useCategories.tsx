import { useEffect, useState } from "react"

import useFetch from "../useFetch"
import { CATEGORIES_GET, type CategoryResponse } from "../../api/product/product"

export const useCategories = () => {
  const { request, loading, error } = useFetch()
  const [categories, setCategories] = useState<CategoryResponse[]>([])
  // True once the request has finished, successfully or not
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const loadCategories = async () => {
      const token = window.localStorage.getItem("token")

      if (!token) {
        return
      }

      const { url, options } = CATEGORIES_GET(token)
      const { json, response } = await request(url, options)

      if (response?.ok) {
        setCategories(json as CategoryResponse[])
      }
      setLoaded(true)
    }

    loadCategories()
  }, [request])

  return { categories, loading, loaded, error }
}
