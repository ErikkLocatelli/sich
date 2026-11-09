import type { ProviderSummaryResponse } from "@/api/provider/provider"
import ProfessionalInfoCard from "@/components/commons/ProfessionalInfoCard"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { HOME_PROVIDER_LIMIT, providerHref } from "@/services/home/customerHome"
import { providerSubtitle } from "@/services/search/searchFilters"

type HomeCustomerProvidersVariant = "list" | "grid"

type HomeCustomerProvidersProps = {
  providers: ProviderSummaryResponse[]
  loaded: boolean
  variant?: HomeCustomerProvidersVariant
  className?: string
}

const CONTAINER_CLASSES: Record<HomeCustomerProvidersVariant, string> = {
  list: "flex flex-col gap-3",
  grid: "grid grid-cols-2 items-start gap-4.5",
}

const HomeCustomerProvidersSkeleton = ({ variant, className }: { variant: HomeCustomerProvidersVariant; className?: string }) => (
  <div className={cn(CONTAINER_CLASSES[variant], className)} aria-busy="true" aria-label="Carregando profissionais">
    {Array.from({ length: HOME_PROVIDER_LIMIT }, (_, index) => (
      <div key={index} className="flex items-center gap-3 rounded-[16px] border border-sich-border bg-white p-3">
        <Skeleton className="size-14 shrink-0 rounded-[16px]" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-3.5 w-32" />
          <Skeleton className="h-2.5 w-24" />
          <Skeleton className="h-2.5 w-full" />
        </div>
      </div>
    ))}
  </div>
)

// TODO(backend): rating and badge ("Top SICH", "Premium") are not in ProviderSummaryResponse yet
const HomeCustomerProviders = ({ providers, loaded, variant = "list", className }: HomeCustomerProvidersProps) => {
  if (!loaded) return <HomeCustomerProvidersSkeleton variant={variant} className={className} />

  return (
    <div className={cn(CONTAINER_CLASSES[variant], className)}>
      {providers.map((provider) => (
        <ProfessionalInfoCard
          key={provider.id}
          layout={variant === "grid" ? "stacked" : "compact"}
          name={provider.name}
          subtitle={providerSubtitle(provider)}
          neighborhood={provider.neighborhood}
          minPrice={provider.minPrice}
          href={providerHref(provider.id)}
        />
      ))}
    </div>
  )
}

export default HomeCustomerProviders
