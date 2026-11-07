import { Link } from "react-router-dom"

import type { ProductsPageState } from "@/hooks/product/useProductsPage"

import Title from "../../components/commons/Title"
import ProductPerformance from "../../components/pages/products/ProductPerformance"
import ProductDisplay from "../../components/pages/products/ProductDisplay"
import ProductEmpty from "../../components/pages/products/ProductEmpty"

import { Button } from "../../components/ui/button"

const ProductsMobile = ({ state }: { state: ProductsPageState }) => {
  const { animationClass, products, hasProducts, filteredProducts, catalogFilter, setCatalogFilter, handleDeleteProduct, handleStatus } = state

  return (
    <div className={`w-full px-6 pb-4 ${animationClass}`}>
      <Title text="Serviços e preços" className="mt-6"/>

      {hasProducts ? (
        <ProductPerformance products={products}/>
      ) : (
        <ProductEmpty />
      )}

      <div className="flex justify-center mt-6">
        <Button className="text-[12px] font-semibold py-5 px-8 shadow-sich-button">
          <Link to="/products/new">+ Novo produto</Link>
        </Button>
      </div>

      {hasProducts && (
        <ProductDisplay
          products={filteredProducts}
          catalogFilter={catalogFilter}
          onCatalogFilterChange={setCatalogFilter}
          onDelete={handleDeleteProduct}
          onStatus={handleStatus}
        />
      )}
    </div>
  )
}

export default ProductsMobile
