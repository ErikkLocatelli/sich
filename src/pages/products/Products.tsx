import { useState } from "react"
import { Link } from "react-router-dom"

import useHead from "../../hooks/useHead"
import usePreviousRoute from "../../hooks/usePreviousRoute"

import SichText from "../../components/commons/SichText"
import Title from "../../components/commons/Title"
import SubTitle from "../../components/commons/SubTitle"
import Card from "../../components/commons/Card"
import { SlideToggle } from "../../components/form/SlideToggle"
import ProductInfoCard from "../../components/pages/products/ProductInfoCard"

import { Button } from "../../components/ui/button"

import { products } from "../../models/products"

const Products = () => {
  useHead("Produtos", "Gerencie seus produtos na SICH")
  const previousRoute = usePreviousRoute()
  const [catalogFilter, setCatalogFilter] = useState(0)

  const filteredProducts = products.filter((product) => {
    if (catalogFilter === 1) return product.status === "active"
    if (catalogFilter === 2) return product.status === "paused"
    return true
  })

  return (
    <div className={`w-full px-6 ${previousRoute === '/' || previousRoute === '/schedule' ? 'animateRight' : 'animateLeft'}`}>
      <div className="mt-6">
        <Title text="Produtos e preços"/>
      </div>
      <Card className="mt-4 p-4">
        <SubTitle text="Desempenho" />

        <div className="mt-4 flex flex-row items-center">
          <div className="flex flex-1 flex-col items-center">
            <SichText text="6" />
            <span className="text-[9px] text-(--label-text)">Produtos</span>
          </div>

          <div className="h-10 w-px bg-gray-300" />

          <div className="flex flex-1 flex-col items-center">
            <SichText text="R$ 128" />
            <span className="text-[9px] text-(--label-text)">Ticket Médio</span>
          </div>

          <div className="h-10 w-px bg-gray-300" />

          <div className="flex flex-1 flex-col items-center">
            <SichText text="1h32" />
            <span className="text-[9px] text-(--label-text)">Duração Média</span>
          </div>
        </div>
      </Card>

      <div className="flex justify-center mt-6">
        <Button className="text-[12px] font-semibold py-5 px-8 shadow-sich-button">
          <Link to="/products/new">+ Novo produto</Link>
        </Button>
      </div>

      <Card className="mt-6 p-4">
        <div className="flex flex-row items-center gap-2">
          <SubTitle text="Catálogo ativo" />
          <SlideToggle
            className="rounded-lg flex-1 bg-sich-surface"
            selectedIndex={catalogFilter}
            onSelectedIndexChange={setCatalogFilter}
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
          {filteredProducts.map((product) => (
            <ProductInfoCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              duration={product.duration}
              status={product.status}
            />
          ))}
        </div>
      </Card>
    </div>
  )
}

export default Products
