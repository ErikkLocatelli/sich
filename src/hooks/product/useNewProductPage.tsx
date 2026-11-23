import type { FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { apiFetch, requireToken, withFallback } from "@/api/client"
import { IMAGE_POST, PRODUCT_POST, type ProductRequest, type ProductResponse } from "@/api/product/product"
import { queryKeys } from "@/api/queryKeys"
import { toast } from "@/components/ui/toast"
import type { NewImage } from "@/models/image"

import useProductImages from "../useProductImages"
import { useCategories } from "./useCategories"
import { useNewProduct } from "./useNewProduct"
import type { ProductFormPageState } from "./productFormPage"

type NewProductInput = {
  body: ProductRequest
  images: NewImage[]
}

export const useNewProductPage = (): ProductFormPageState => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { fields, isFormValid, validateForm, getPayload } = useNewProduct()
  const images = useProductImages([])
  const { categories } = useCategories()

  const create = useMutation({
    mutationFn: async ({ body, images: newImages }: NewProductInput) => {
      const token = requireToken()
      const product = await withFallback(
        apiFetch<ProductResponse>(PRODUCT_POST(token, body)),
        "Não foi possível cadastrar o produto."
      )

      for (const newImage of newImages) {
        const dataUrl = await images.fileToDataUrl(newImage.file)
        await withFallback(
          apiFetch<unknown>(IMAGE_POST(token, product.id, dataUrl)),
          "Não foi possível cadastrar uma das imagens."
        )
      }
    },
    onError: (error) => toast.add({ type: "error", description: error.message }),
    onSuccess: () => toast.add({ type: "success", description: "O produto e suas imagens foram cadastrados com sucesso." }),
    // Even a partial failure (product saved, image not) changed the catalog
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.provider.products.all }),
  })

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const isValid = await validateForm()
    if (!isValid) return

    create.mutate({ body: getPayload(), images: images.newImages })
  }

  return {
    title: "Cadastrar produto",
    submitLabel: "Cadastrar produto",
    fields,
    images,
    categories,
    isFormValid,
    loading: create.isPending,
    handleSubmit,
    onCancel: () => navigate("/products"),
  }
}
