import type { ProductResponse } from "@/api/product/product"
import Card from "@/components/commons/Card"
import SubTitle from "@/components/commons/SubTitle"
import { SlideToggle } from "@/components/form/SlideToggle"
import ProductInfoCard from "./ProductInfoCard"

type ProductDisplayProps = {
  products: ProductResponse[]
  catalogFilter: number
  onCatalogFilterChange: (index: number) => void
  onDelete: (id: number) => void
  onStatus: (id: number, active: boolean) => void
}

const ProductDisplay = ({ products, catalogFilter, onCatalogFilterChange, onDelete, onStatus }: ProductDisplayProps) => {
  return (
    <Card className="mt-4 p-4">
      <div className="flex flex-row items-center gap-2">
        <SubTitle text="Catálogo ativo" />
        <SlideToggle
          className="rounded-lg flex-1 bg-sich-surface"
          selectedIndex={catalogFilter}
          onSelectedIndexChange={onCatalogFilterChange}
          options={[
            { children: "Todos" },
            { children: "Ativos" },
            { children: "Inativos" },
          ]}
          aria-label="Filtrar catálogo"
        />
      </div>

      <p className="text-[11px] text-(--label-text) font-bold mt-3">PRODUTOS</p>

      <div className="mt-4 flex flex-col gap-4">
        {products.map((product) => (
          <ProductInfoCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            duration={product.duration}
            status={product.active}
            onDelete={onDelete}
            onStatus={onStatus}
          />
        ))}
      </div>
    </Card>
  )
}

export default ProductDisplay