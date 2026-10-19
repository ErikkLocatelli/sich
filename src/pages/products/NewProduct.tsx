import useHead from '../../hooks/useHead'
import { useNewProduct } from '../../hooks/product/useNewProduct'
import useProductImages from '../../hooks/useProductImages'
import useFetch from '@/hooks/useFetch'

import { PRODUCT_POST, IMAGE_POST } from '../../api/product/product'

import ArrowBack from '../../components/commons/ArrowBack'
import SichText from '@/components/commons/SichText'
import ProductForm from './ProductForm'

import { Button } from '../../components/ui/button'
import { Field  } from '../../components/ui/field'
import { toast, Toaster } from '../../components/ui/toast'
import { Spinner } from '@/components/ui/spinner'

const NewProduct = () => {
  useHead("Cadastrar produto", "Cadastre seu produto na SICH")

  const { fields, isFormValid, validateForm, getPayload } = useNewProduct()
  const images = useProductImages([])
  const { loading, request } = useFetch()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const token = window.localStorage.getItem("token")
    if (!token) return
    
    const isValid = await validateForm()
    if(!isValid) return

    const payload = getPayload()

    const { url, options } = PRODUCT_POST( token,payload)
    const { response, json } = await request(url, options)
    if(!response?.ok) {
      toast.add({
        type: "error",
        description: json?.message ?? "Não foi possível cadastrar o produto."
      })
      return
    }

    for (const newImage of images.newImages) {
      const dataUrl = await images.fileToDataUrl(newImage.file)
      const imageRequest = IMAGE_POST(token, json.id, dataUrl)
      const imageResult = await request(
        imageRequest.url,
        imageRequest.options
      )

      if (!imageResult.response?.ok) {
        toast.add({
          type: "error",
          description: imageResult.json?.message ??
            "Não foi possível cadastrar uma das imagens."
        })
        return
      }
    }

    toast.add({
      type: "success",
      description: "O produto e suas imagens foram cadastrados com sucesso."
    })
  }
  
  return (
    <div className="w-full animateRight">
      <div className="flex items-center gap-3 bg-white p-5">
          <ArrowBack />
          <SichText text="Cadastrar produto" />
      </div>
      
      <form className="mt-3.5 mb-3.5 flex flex-col gap-5" onSubmit={handleSubmit}>
          <ProductForm form={{ fields }} images={images} />

          <Field className="flex flex-row items-center gap-4 *:flex-1 px-5">
              <Button className="text-[12px] font-semibold py-5 px-8 text-sich-magenta shadow-sich-small bg-white hover:bg-white">Cancelar</Button>
              <Button className="text-[12px] font-semibold py-5 px-8 shadow-sich-button" type="submit" disabled={!isFormValid || loading}>
                {loading && <Spinner data-icon="inline-start"  /> }
                Cadastrar produto
              </Button>
          </Field>
      </form>
      
      <Toaster />
    </div>
  )
}

export default NewProduct
