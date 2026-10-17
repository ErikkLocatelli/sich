import useHead from '../../hooks/useHead'
import { useNewProduct } from '../../hooks/product/useNewProduct'
import useProductImages from '../../hooks/useProductImages'

import ArrowBack from '../../components/commons/ArrowBack'
import SichText from '@/components/commons/SichText'
import ProductForm from './ProductForm'

import { Button } from '../../components/ui/button'
import { Field  } from '../../components/ui/field'
import { toast, Toaster } from '../../components/ui/toast'

const NewProduct = () => {
  useHead("Cadastrar produto", "Cadastre seu produto na SICH")

  const { fields, isFormValid } = useNewProduct()
  const images = useProductImages([])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    toast.add({
      type: "success",
      description: "O produto foi cadastrado com sucesso."
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
              <Button className="text-[12px] font-semibold py-5 px-8 shadow-sich-button" type="submit" disabled={!isFormValid}>Cadastrar produto</Button>
          </Field>
      </form>
      
      <Toaster />
    </div>
  )
}

export default NewProduct
