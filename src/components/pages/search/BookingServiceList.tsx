import type { ProductResponse } from "@/api/product/product"
import ProductCard from "@/components/pages/products/ProductCard"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { formatCurrency, formatDuration } from "@/services/schedule/formatters"

type BookingServiceListProps = {
  products: ProductResponse[]
  loaded: boolean
  selectedId: number | null
  onSelect: (id: number) => void
  className?: string
}

const BookingServiceListSkeleton = ({ className }: { className?: string }) => (
  <div className={cn("flex flex-col gap-3", className)} aria-busy="true" aria-label="Carregando serviços">
    {Array.from({ length: 2 }, (_, index) => (
      <Skeleton key={index} className="aspect-[16/12] w-full rounded-[14px]" />
    ))}
  </div>
)

const BookingServiceList = ({ products, loaded, selectedId, onSelect, className }: BookingServiceListProps) => {
  if (!loaded) return <BookingServiceListSkeleton className={className} />
  if (products.length === 0) {
    return <p className="py-6 text-center text-[12px] text-sich-label">Este profissional ainda não tem serviços disponíveis.</p>
  }

  return (
    <div role="radiogroup" aria-label="Escolha o serviço" className={cn("flex flex-col gap-3", className)}>
      {products.map((product) => {
        const selected = product.id === selectedId
        return (
          <button
            key={product.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onSelect(product.id)}
            className="cursor-pointer rounded-[14px] text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <ProductCard
              name={product.name}
              details={`${formatCurrency(product.price)} · ${formatDuration(product.durationMinutes)}`}
              coverUrl={product.images[0]?.image}
              categoryName={product.categoryName}
              description={product.description ?? undefined}
              className={cn("bg-white transition-colors", selected && "border-primary bg-primary/5 shadow-sich-button")}
            />
          </button>
        )
      })}
    </div>
  )
}

export default BookingServiceList
