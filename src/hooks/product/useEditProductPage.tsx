import { useEffect, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { apiFetch, requireToken, withFallback } from "@/api/client"
import { IMAGE_DELETE, IMAGE_POST, PRODUCT_PUT, type ProductRequest } from "@/api/product/product"
import { providerProductQuery } from "@/api/product/productQueries"
import { queryKeys } from "@/api/queryKeys"
import { toast } from "@/components/ui/toast"
import type { NewImage } from "@/models/image"

import useProductImages from "../useProductImages"
import { useCategories } from "./useCategories"
import { useEditProduct } from "./useEditProduct"
import type { ProductFormPageState } from "./productFormPage"

type EditProductInput = {
  productId: number
  body: ProductRequest
  removedImages: number[]
  newImages: NewImage[]
}

export const useEditProductPage = (id: string | undefined): ProductFormPageState => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const productId = Number(id)
  // Opening from the catalog is served from the list already in cache
  const { data: product, isPending } = useQuery(providerProductQuery(queryClient, productId))
  const { fields, isFormValid, getPayload, validateForm } = useEditProduct(product ?? null)
  const images = useProductImages([])
  const { setInitialImages } = images
  const { categories } = useCategories()

  // Structural sharing keeps `product` stable across identical refetches, so edits aren't reset
  useEffect(() => {
    if (!product) return
    setInitialImages(product.images.map((image) => ({ id: image.id, url: image.image })))
  }, [product, setInitialImages])

  const update = useMutation({
    mutationFn: async ({ productId: targetId, body, removedImages, newImages }: EditProductInput) => {
      const token = requireToken()
      await withFallback(apiFetch<unknown>(PRODUCT_PUT(token, targetId, body)), "Não foi possível atualizar o produto.")

      for (const imageId of removedImages) {
        await withFallback(
          apiFetch<unknown>(IMAGE_DELETE(token, targetId, imageId)),
          "O produto foi atualizado, mas não foi possível remover uma imagem."
        )
      }

      for (const newImage of newImages) {
        const dataUrl = await images.fileToDataUrl(newImage.file)
        await withFallback(
          apiFetch<unknown>(IMAGE_POST(token, targetId, dataUrl)),
          "O produto foi atualizado, mas não foi possível adicionar uma imagem."
        )
      }
    },
    onError: (error) => toast.add({ type: "error", description: error.message }),
    onSuccess: () => toast.add({ type: "success", description: "As alterações foram salvas." }),
    // Even a partial failure (product saved, image not) changed the catalog
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.provider.products.all }),
  })

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!product) return

    const isValid = await validateForm()
    if (!isValid) return

    update.mutate({
      productId: product.id,
      body: getPayload(),
      removedImages: images.removedImages,
      newImages: images.newImages,
    })
  }

  return {
    title: "Editar produto",
    submitLabel: "Salvar alterações",
    fields,
    images,
    categories,
    isFormValid,
    loading: update.isPending || (Number.isInteger(productId) && isPending),
    handleSubmit,
    onCancel: () => navigate("/products"),
  }
}
