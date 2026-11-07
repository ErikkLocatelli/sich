import { Link } from "react-router-dom"

import type { ProductResponse } from "@/api/product/product"
import Badge from "@/components/commons/Badge"
import { Button } from "@/components/ui/button"
import { formatCurrency, formatDuration } from "@/services/schedule/formatters"

import ProductActions from "./ProductActions"

type ProductTableProps = {
  products: ProductResponse[]
  onDelete: (id: number) => void
  onStatus: (id: number, active: boolean) => void
}

const HEADERS = ["Serviço", "Duração", "Preço", "Status"]

const ProductTable = ({ products, onDelete, onStatus }: ProductTableProps) => {
  if (products.length === 0) {
    return <p className="py-6 text-center text-[13px] text-sich-label">Nenhum produto neste filtro.</p>
  }

  return (
    <table className="w-full border-collapse text-left">
      <thead>
        <tr className="border-b border-sich-border">
          {HEADERS.map((header) => (
            <th key={header} className="px-3 py-2.5 text-[11px] font-bold tracking-[0.5px] text-sich-label uppercase">{header}</th>
          ))}
          <th aria-label="Ações" />
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className="border-b border-sich-border last:border-b-0">
            <td className="px-3 py-4">
              <p className="text-[13px] font-bold text-sich-heading">{product.name}</p>
              {product.description && <p className="line-clamp-2 text-[11px] text-sich-label">{product.description}</p>}
            </td>
            <td className="px-3 py-4 text-[13px] whitespace-nowrap text-sich-heading">{formatDuration(product.durationMinutes)}</td>
            <td className="px-3 py-4 text-[13px] font-bold whitespace-nowrap text-sich-heading">{formatCurrency(product.price)}</td>
            <td className="px-3 py-4"><Badge status={product.active} /></td>
            <td className="px-3 py-4">
              <div className="flex items-center justify-end gap-1">
                <Button
                  render={<Link to={`/products/edit/${product.id}`} />}
                  nativeButton={false}
                  variant="outline"
                  className="h-10 rounded-full border-sich-border bg-white px-4 text-[13px]"
                >
                  Editar
                </Button>
                <ProductActions id={product.id} status={product.active} onDelete={onDelete} onStatus={onStatus} showEdit={false} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ProductTable
