import SubTitle from "@/components/commons/SubTitle"
import { SlideToggle } from "@/components/form/SlideToggle"
import { cn } from "@/lib/utils"
import { CATALOG_FILTER_OPTIONS } from "@/services/product/productStats"

type CatalogHeaderProps = {
  catalogFilter: number
  onCatalogFilterChange: (index: number) => void
  className?: string
  toggleClassName?: string
}

const CatalogHeader = ({ catalogFilter, onCatalogFilterChange, className, toggleClassName }: CatalogHeaderProps) => (
  <div className={cn("flex flex-row items-center gap-2", className)}>
    <SubTitle text="Catálogo ativo" />
    <SlideToggle
      className={cn("rounded-lg flex-1 bg-sich-surface", toggleClassName)}
      selectedIndex={catalogFilter}
      onSelectedIndexChange={onCatalogFilterChange}
      options={CATALOG_FILTER_OPTIONS}
      aria-label="Filtrar catálogo"
    />
  </div>
)

export default CatalogHeader
