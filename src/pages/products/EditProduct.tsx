import { useParams } from 'react-router-dom'

import useHead from '../../hooks/useHead'
import { useIsDesktop } from '@/hooks/useMedia'
import { useEditProductPage } from '@/hooks/product/useEditProductPage'

import { Toaster } from '../../components/ui/toast'

import ProductFormDesktop from './ProductFormDesktop'
import ProductFormMobile from './ProductFormMobile'

const EditProduct = () => {
  const { id } = useParams()
  useHead(`Editar produto ${id}`, "Edite seu produto na SICH")
  const isDesktop = useIsDesktop()
  const state = useEditProductPage(id)

  return (
    <>
      {isDesktop ? <ProductFormDesktop state={state} /> : <ProductFormMobile state={state} />}
      <Toaster />
    </>
  )
}

export default EditProduct
