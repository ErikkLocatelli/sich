import type { FormEvent } from "react"
import { useNavigate } from "react-router-dom"

import { IMAGE_POST, PRODUCT_POST } from "@/api/product/product"
import { toast } from "@/components/ui/toast"

import useFetch from "../useFetch"
import useProductImages from "../useProductImages"
import { useCategories } from "./useCategories"
import { useNewProduct } from "./useNewProduct"
import type { ProductFormPageState } from "./productFormPage"

export const useNewProductPage = (): ProductFormPageState => {
  const navigate = useNavigate()
  const { fields, isFormValid, validateForm, getPayload } = useNewProduct()
  const images = useProductImages([])
  const { categories } = useCategories()
  const { loading, request } = useFetch()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const token = window.localStorage.getItem("token")
    if (!token) return

    const isValid = await validateForm()
    if (!isValid) return

    const { url, options } = PRODUCT_POST(token, getPayload())
    const { response, json } = await request(url, options)

    if (!response?.ok) {
      toast.add({ type: "error", description: json?.message ?? "Não foi possível cadastrar o produto." })
      return
    }

    for (const newImage of images.newImages) {
      const dataUrl = await images.fileToDataUrl(newImage.file)
      const imageRequest = IMAGE_POST(token, json.id, dataUrl)
      const imageResult = await request(imageRequest.url, imageRequest.options)

      if (!imageResult.response?.ok) {
        toast.add({ type: "error", description: imageResult.json?.message ?? "Não foi possível cadastrar uma das imagens." })
        return
      }
    }

    toast.add({ type: "success", description: "O produto e suas imagens foram cadastrados com sucesso." })
  }

  return {
    title: "Cadastrar produto",
    submitLabel: "Cadastrar produto",
    fields,
    images,
    categories,
    isFormValid,
    loading,
    handleSubmit,
    onCancel: () => navigate("/products"),
  }
}
