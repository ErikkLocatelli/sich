import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import useHead from '../../hooks/useHead'
import { useEditProduct } from '../../hooks/product/useEditProduct'
import useProductImages from '../../hooks/useProductImages'
import useFetch from '../../hooks/useFetch'

import { IMAGE_DELETE, IMAGE_POST, PRODUCT_GET, PRODUCT_PUT } from '@/api/product/product'
import type { ProductResponse } from '@/api/product/product'

import ProductForm from './ProductForm'
import PageHeader from '../../components/commons/PageHeader'

import { Button } from '../../components/ui/button'
import { Field  } from '../../components/ui/field'
import { toast, Toaster } from '../../components/ui/toast'
import { Spinner } from "@/components/ui/spinner"

const EditProduct = () => {
  const { id } = useParams()
  const [product, setProduct] = useState<ProductResponse | null>(null)
  const { fields, isFormValid, getPayload, validateForm } = useEditProduct(product)
  const images = useProductImages([])
  const { setInitialImages } = images
  const { request, loading } = useFetch()

  useHead(`Editar produto ${id}`, "Edite seu produto na SICH")

  useEffect(() => {

    const loadProduct = async () => {
      const token = window.localStorage.getItem("token")
      const productId = Number(id)

      if (!token || !Number.isInteger(productId)) return

      const { url, options } = PRODUCT_GET(token, productId)
      const {response, json } = await request(url, options)
      if(!response?.ok) {
        toast.add({
          type: "error",
          description: json?.message ?? "Não foi possível carregar o produto."
        })
        return
      }

      const loadedProduct = json as ProductResponse
      setProduct(loadedProduct)
      setInitialImages(
        loadedProduct.images.map((image) => ({
          id: image.id,
          url: image.image
        }))
      )
    }

    loadProduct()
  }, [id, request, setInitialImages])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const token = window.localStorage.getItem("token")

    if (!token || !product) return

    const isValid = validateForm()

    if (!isValid) return

    const payload = getPayload()
    const { url, options } = PRODUCT_PUT(token, product.id, payload)
    const { response, json } = await request(url, options)

    if (!response?.ok) {
      toast.add({
        type: "error",
        description: json?.message ?? "Não foi possível atualizar o produto."
      })
      return
    }

    for (const imageId of images.removedImages) {
      const imageRequest = IMAGE_DELETE(token, product.id, imageId)
      const imageResult = await request(
        imageRequest.url,
        imageRequest.options
      )

      if (!imageResult.response?.ok) {
        toast.add({
          type: "error",
          description: imageResult.json?.message ??
            "O produto foi atualizado, mas não foi possível remover uma imagem."
        })
        return
      }
    }

    for (const newImage of images.newImages) {
      const dataUrl = await images.fileToDataUrl(newImage.file)
      const imageRequest = IMAGE_POST(token, product.id, dataUrl)
      const imageResult = await request(
        imageRequest.url,
        imageRequest.options
      )

      if (!imageResult.response?.ok) {
        toast.add({
          type: "error",
          description: imageResult.json?.message ??
            "O produto foi atualizado, mas não foi possível adicionar uma imagem."
        })
        return
      }
    }
    
    toast.add({
     type: "success",
     description: "As alterações foram salvas."
    })
  }

  return (
    <div className="w-full animateRight">
        <PageHeader text="Editar produto" />

        <form className="mt-3.5 mb-3.5 flex flex-col gap-5" onSubmit={handleSubmit}>
            <ProductForm form={{ fields }} images={images} />

            <Field className="flex flex-row items-center gap-4 *:flex-1 px-5">
                <Button className="text-[12px] font-semibold py-5 px-8 text-sich-magenta shadow-sich-small bg-white hover:bg-white">Cancelar</Button>
                <Button className="text-[12px] font-semibold py-5 px-8 shadow-sich-button" type="submit" disabled={!isFormValid || loading}>
                  {loading && <Spinner data-icon="inline-start"  /> }
                  Salvar alterações
                </Button>
            </Field>
        </form>

        <Toaster />
    </div>
  )
}

export default EditProduct
