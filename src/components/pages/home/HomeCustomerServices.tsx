import type { CategoryResponse } from "@/api/product/product"
import ProductInfoCard from "@/components/commons/ProductInfoCard"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { categoryHref, HOME_CATEGORY_LIMIT } from "@/services/home/customerHome"

type HomeCustomerServicesProps = {
  categories: CategoryResponse[]
  loaded: boolean
  className?: string
}

const GRID_CLASSES = "grid grid-cols-3 auto-rows-fr gap-3"

const HomeCustomerServicesSkeleton = ({ className }: { className?: string }) => (
  <div className={cn(GRID_CLASSES, className)} aria-busy="true" aria-label="Carregando serviços">
    {Array.from({ length: HOME_CATEGORY_LIMIT }, (_, index) => (
      <Skeleton key={index} className="h-24 rounded-[16px]" />
    ))}
  </div>
)

/** Service categories grid; each card opens the search filtered by that category. */
const HomeCustomerServices = ({ categories, loaded, className }: HomeCustomerServicesProps) => {
  if (!loaded) return <HomeCustomerServicesSkeleton className={className} />

  return (
    <div className={cn(GRID_CLASSES, className)}>
      {categories.map((category) => (
        <ProductInfoCard key={category.id} product={category.name} href={categoryHref(category.id)} />
      ))}
    </div>
  )
}

export default HomeCustomerServices
