import useHead from "../../hooks/useHead"
import { useIsDesktop } from "@/hooks/useMedia"
import { useProductsPage } from "@/hooks/product/useProductsPage"

import { Toaster } from "@/components/ui/toast"

import ProductsDesktop from "./ProductsDesktop"
import ProductsMobile from "./ProductsMobile"

const Products = () => {
  useHead("Produtos", "Gerencie seus produtos na SICH")
  const isDesktop = useIsDesktop()
  const state = useProductsPage()

  return (
    <>
      {isDesktop ? <ProductsDesktop state={state} /> : <ProductsMobile state={state} />}
      <Toaster />
    </>
  )
}

export default Products
