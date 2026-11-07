import { Link } from "react-router-dom"

import type { ProductsPageState } from "@/hooks/product/useProductsPage"

import Card from "@/components/commons/Card"
import Title from "@/components/commons/Title"
import CatalogHeader from "@/components/pages/products/CatalogHeader"
import ProductEmpty from "@/components/pages/products/ProductEmpty"
import ProductPerformance from "@/components/pages/products/ProductPerformance"
import ProductTable from "@/components/pages/products/ProductTable"
import { Button } from "@/components/ui/button"

const ProductsDesktop = ({ state }: { state: ProductsPageState }) => {
  const { animationClass, products, hasProducts, filteredProducts, catalogFilter, setCatalogFilter, handleDeleteProduct, handleStatus } = state

  return (
    <section className={`flex w-full flex-col gap-6 px-10 py-8 ${animationClass}`}>
      <header className="flex items-center justify-between gap-4">
        <Title text="Serviços e preços" className="lg:text-left lg:text-[26px] lg:font-bold lg:tracking-[-0.4px]" />
        <Button
          render={<Link to="/products/new" />}
          nativeButton={false}
          className="h-12 rounded-[14px] bg-sich-gradient px-6 text-[14px] font-semibold shadow-sich-button"
        >
          + Novo produto
        </Button>
      </header>

      {hasProducts ? (
        <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-start gap-6">
          <Card className="flex flex-col gap-4 p-5">
            <CatalogHeader
              catalogFilter={catalogFilter}
              onCatalogFilterChange={setCatalogFilter}
              className="justify-between gap-4"
              toggleClassName="max-w-72"
            />
            <ProductTable products={filteredProducts} onDelete={handleDeleteProduct} onStatus={handleStatus} />
          </Card>

          <ProductPerformance products={products} className="mt-0 p-5" />
        </div>
      ) : (
        <ProductEmpty className="mt-0 max-w-2xl" />
      )}
    </section>
  )
}

export default ProductsDesktop
