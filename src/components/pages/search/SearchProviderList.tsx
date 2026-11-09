import { SearchX } from "lucide-react"

import type { ProviderSummaryResponse } from "@/api/provider/provider"
import ProfessionalInfoCard from "@/components/commons/ProfessionalInfoCard"
import { Skeleton } from "@/components/ui/skeleton"
import { providerSubtitle } from "@/services/search/searchFilters"

type SearchProviderListVariant = "list" | "grid"

type SearchProviderListProps = {
  providers: ProviderSummaryResponse[]
  loaded: boolean
  providerHref: (providerId: number) => string
  variant?: SearchProviderListVariant
  countLabel?: string
}

const CONTAINER_CLASSES: Record<SearchProviderListVariant, string> = {
  list: "flex flex-col gap-3",
  grid: "grid grid-cols-2 items-start gap-4.5",
}

const SearchProviderListSkeleton = ({ variant }: { variant: SearchProviderListVariant }) => (
  <div className={CONTAINER_CLASSES[variant]} aria-busy="true" aria-label="Carregando profissionais">
    {Array.from({ length: 4 }, (_, index) => (
      <div key={index} className="flex items-center gap-3 rounded-[16px] border border-sich-border bg-white p-3">
        <Skeleton className="size-14 shrink-0 rounded-[16px]" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-3.5 w-32" />
          <Skeleton className="h-2.5 w-24" />
          <Skeleton className="h-2.5 w-16" />
        </div>
        <Skeleton className="h-5 w-10" />
      </div>
    ))}
  </div>
)

const SearchProviderEmpty = () => (
  <div className="flex flex-col items-center gap-2 py-10 text-center text-sich-label">
    <SearchX className="size-8" />
    <span className="text-[13px] font-medium text-sich-heading">Nenhum profissional encontrado</span>
    <span className="text-[11px]">Tente outro nome ou ajuste os filtros.</span>
  </div>
)

const SearchProviderList = ({ providers, loaded, providerHref, variant = "list", countLabel }: SearchProviderListProps) => {
  if (!loaded) return <SearchProviderListSkeleton variant={variant} />
  if (providers.length === 0) return <SearchProviderEmpty />

  return (
    <div className="flex flex-col gap-3">
      {countLabel && <span className="text-[11px] text-sich-label">{countLabel}</span>}
      <div className={CONTAINER_CLASSES[variant]}>
        {providers.map((provider) => (
          <ProfessionalInfoCard
            key={provider.id}
            layout={variant === "grid" ? "stacked" : "row"}
            name={provider.name}
            subtitle={providerSubtitle(provider)}
            neighborhood={provider.neighborhood}
            minPrice={provider.minPrice}
            href={providerHref(provider.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default SearchProviderList
