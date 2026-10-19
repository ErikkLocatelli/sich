import { useState } from "react"
import { Link } from "react-router-dom"

import { PRODUCT_DELETE, PRODUCT_STATUS_PUT } from "@/api/product/product"

import useHead from "../../hooks/useHead"
import usePreviousRoute from "../../hooks/usePreviousRoute"
import { useProducts } from "../../hooks/product/useProducts"
import useFetch from "../../hooks/useFetch"

import Title from "../../components/commons/Title"
import ProductPerformance from "../../components/pages/products/ProductPerformance"
import ProductDisplay from "../../components/pages/products/ProductDisplay"
import ProductEmpty from "../../components/pages/products/ProductEmpty"

import { toast, Toaster } from "@/components/ui/toast"
import { Button } from "../../components/ui/button"

const Products = () => {
  useHead("Produtos", "Gerencie seus produtos na SICH")
  const previousRoute = usePreviousRoute()
  const { request } = useFetch()
  const [catalogFilter, setCatalogFilter] = useState(0)
  const { products, removeProduct, updateProductStatus } = useProducts()

  const filteredProducts = products.filter((product) => {
    if (catalogFilter === 1) return product.active === true
    if (catalogFilter === 2) return product.active === false
    return true
  })

  const handleDeleteProduct = async (id: number) => {
    const token = window.localStorage.getItem("token")

    if (!token) return

    const { url, options } = PRODUCT_DELETE( token, id)
    const {response, json } = await request(url, options)

    if(!response?.ok) {
      toast.add({
        type: "error",
        description: json?.message || "Erro ao excluir produto",
      })
      return
    }

    removeProduct(id)
    toast.add({
      type: "success",
      description: "Produto excluído com sucesso",
    })
  }

  const handleStatus =  async ( id: number, active: boolean ) => {
    const token = window.localStorage.getItem("token")

    if (!token) return

    const { url, options } = PRODUCT_STATUS_PUT(token, id, active)
    const { response, json } = await request(url, options)

    if (!response?.ok) {
      toast.add({
        type: "error",
        description: json?.message || "Erro ao atualizar status do produto",
      })
      return
    }

    updateProductStatus(id, !active)
    toast.add({
      type: "success",
      description: "Status do produto atualizado com sucesso",
    })
  }

  return (
    <div className={`w-full px-6 pb-4 ${previousRoute === '/' || previousRoute === '/schedule' ? 'animateRight' : 'animateLeft'}`}>
      <Title text="Serviços e preços" className="mt-6"/>

      {products.length > 0 ? (
        <ProductPerformance products={products}/>
      ) : (
        <ProductEmpty />
      )}

      <div className="flex justify-center mt-6">
        <Button className="text-[12px] font-semibold py-5 px-8 shadow-sich-button">
          <Link to="/products/new">+ Novo produto</Link>
        </Button>
      </div>

      {products.length > 0 && (
        <ProductDisplay
          products={filteredProducts}
          catalogFilter={catalogFilter}
          onCatalogFilterChange={setCatalogFilter}
          onDelete={handleDeleteProduct}
          onStatus={handleStatus}
        />
      )}

      <Toaster />
    </div>
  )
}

export default Products
