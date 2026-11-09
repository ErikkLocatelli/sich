import type { ProductResponse } from "@/api/product/product"
import type { ProviderSummaryResponse } from "@/api/provider/provider"
import type { PriceRange, SearchFilters } from "@/models/searchFilters"

export const PRICE_STEP = 5

export const EMPTY_FILTERS: SearchFilters = {
  categoryIds: [],
  priceRange: null,
  neighborhoods: [],
}

const PARAM_CATEGORIES = "categoryIds"
const PARAM_MIN_PRICE = "minPrice"
const PARAM_MAX_PRICE = "maxPrice"

const inRange = (value: number | null, range: PriceRange | null) => {
  if (!range) return true
  if (value === null) return false
  return value >= range[0] && value <= range[1]
}

export const hasActiveFilters = (filters: SearchFilters) =>
  filters.categoryIds.length > 0 || filters.priceRange !== null || filters.neighborhoods.length > 0

export const priceBounds = (providers: ProviderSummaryResponse[]): PriceRange | null => {
  const prices = providers.map((provider) => provider.minPrice).filter((price): price is number => price !== null)
  if (prices.length === 0) return null

  const min = Math.floor(Math.min(...prices) / PRICE_STEP) * PRICE_STEP
  const max = Math.ceil(Math.max(...prices) / PRICE_STEP) * PRICE_STEP
  return min === max ? null : [min, max]
}

export const neighborhoodOptions = (providers: ProviderSummaryResponse[]) => {
  const names = providers.map((provider) => provider.neighborhood?.trim()).filter((name): name is string => !!name)
  return [...new Set(names)].sort((a, b) => a.localeCompare(b, "pt-BR"))
}

// Price and neighborhood are filtered here because the API only filters by text and category
export const filterProviders = (providers: ProviderSummaryResponse[], filters: SearchFilters) =>
  providers.filter((provider) => {
    if (!inRange(provider.minPrice, filters.priceRange)) return false
    if (filters.neighborhoods.length === 0) return true
    return !!provider.neighborhood && filters.neighborhoods.includes(provider.neighborhood.trim())
  })

// Falls back to every product when no filter is set or nothing matches
export const filterProducts = (products: ProductResponse[], filters: SearchFilters) => {
  const filtered = products.filter((product) => {
    if (filters.categoryIds.length > 0 && !filters.categoryIds.includes(product.categoryId)) return false
    return inRange(product.price, filters.priceRange)
  })
  return filtered.length > 0 ? filtered : products
}

export const providerCountLabel = (count: number) =>
  count === 1 ? "1 profissional encontrado" : `${count} profissionais encontrados`

export const providerSubtitle = (provider: ProviderSummaryResponse) => provider.categories.join(" & ")

export const filtersToSearch = (filters: SearchFilters) => {
  const params = new URLSearchParams()
  if (filters.categoryIds.length > 0) params.set(PARAM_CATEGORIES, filters.categoryIds.join(","))
  if (filters.priceRange) {
    params.set(PARAM_MIN_PRICE, String(filters.priceRange[0]))
    params.set(PARAM_MAX_PRICE, String(filters.priceRange[1]))
  }
  const search = params.toString()
  return search ? `?${search}` : ""
}

export const filtersFromSearch = (params: URLSearchParams): SearchFilters => {
  const categoryIds = (params.get(PARAM_CATEGORIES) ?? "")
    .split(",")
    .map(Number)
    .filter((id) => Number.isInteger(id) && id > 0)

  const min = Number(params.get(PARAM_MIN_PRICE))
  const max = Number(params.get(PARAM_MAX_PRICE))
  const hasRange = params.has(PARAM_MIN_PRICE) && params.has(PARAM_MAX_PRICE) && Number.isFinite(min) && Number.isFinite(max) && min <= max

  return { categoryIds, priceRange: hasRange ? [min, max] : null, neighborhoods: [] }
}
