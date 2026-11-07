import { useEffect, useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"

import { IMAGE_DELETE, IMAGE_POST, PRODUCT_GET, PRODUCT_PUT, type ProductResponse } from "@/api/product/product"
import { toast } from "@/components/ui/toast"

import useFetch from "../useFetch"
import useProductImages from "../useProductImages"
import { useCategories } from "./useCategories"
import { useEditProduct } from "./useEditProduct"
import type { ProductFormPageState } from "./productFormPage"

export const useEditProductPage = (id: string | undefined): ProductFormPageState => {
  const navigate = useNavigate()
  const [product, setProduct] = useState<ProductResponse | null>(null)
  const { fields, isFormValid, getPayload, validateForm } = useEditProduct(product)
  const images = useProductImages([])
  const { setInitialImages } = images
  const { categories } = useCategories()
  const { request, loading } = useFetch()

  useEffect(() => {
    const loadProduct = async () => {
      const token = window.localStorage.getItem("token")
      const productId = Number(id)

      if (!token || !Number.isInteger(productId)) return

      const { url, options } = PRODUCT_GET(token, productId)
      const { response, json } = await request(url, options)

      if (!response?.ok) {
        toast.add({ type: "error", description: json?.message ?? "Não foi possível carregar o produto." })
        return
      }

      const loadedProduct = json as ProductResponse
      setProduct(loadedProduct)
      setInitialImages(loadedProduct.images.map((image) => ({ id: image.id, url: image.image })))
    }

    loadProduct()
  }, [id, request, setInitialImages])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const token = window.localStorage.getItem("token")
    if (!token || !product) return

    const isValid = await validateForm()
    if (!isValid) return

    const { url, options } = PRODUCT_PUT(token, product.id, getPayload())
    const { response, json } = await request(url, options)

    if (!response?.ok) {
      toast.add({ type: "error", description: json?.message ?? "Não foi possível atualizar o produto." })
      return
    }

    for (const imageId of images.removedImages) {
      const imageRequest = IMAGE_DELETE(token, product.id, imageId)
      const imageResult = await request(imageRequest.url, imageRequest.options)

      if (!imageResult.response?.ok) {
        toast.add({ type: "error", description: imageResult.json?.message ?? "O produto foi atualizado, mas não foi possível remover uma imagem." })
        return
      }
    }

    for (const newImage of images.newImages) {
      const dataUrl = await images.fileToDataUrl(newImage.file)
      const imageRequest = IMAGE_POST(token, product.id, dataUrl)
      const imageResult = await request(imageRequest.url, imageRequest.options)

      if (!imageResult.response?.ok) {
        toast.add({ type: "error", description: imageResult.json?.message ?? "O produto foi atualizado, mas não foi possível adicionar uma imagem." })
        return
      }
    }

    toast.add({ type: "success", description: "As alterações foram salvas." })
  }

  return {
    title: "Editar produto",
    submitLabel: "Salvar alterações",
    fields,
    images,
    categories,
    isFormValid,
    loading,
    handleSubmit,
    onCancel: () => navigate("/products"),
  }
}
