import useHead from '../../hooks/useHead'
import { useIsDesktop } from '@/hooks/useMedia'
import { useNewProductPage } from '@/hooks/product/useNewProductPage'

import { Toaster } from '../../components/ui/toast'

import ProductFormDesktop from './ProductFormDesktop'
import ProductFormMobile from './ProductFormMobile'

const NewProduct = () => {
  useHead("Cadastrar produto", "Cadastre seu produto na SICH")
  const isDesktop = useIsDesktop()
  const state = useNewProductPage()

  return (
    <>
      {isDesktop ? <ProductFormDesktop state={state} /> : <ProductFormMobile state={state} />}
      <Toaster />
    </>
  )
}

export default NewProduct
