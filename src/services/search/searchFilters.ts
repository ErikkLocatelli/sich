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

/** Slider bounds from the server results, snapped to PRICE_STEP; null when there is nothing to range over. */
export const priceBounds = (providers: ProviderSummaryResponse[]): PriceRange | null => {
  const prices = providers.map((provider) => provider.minPrice).filter((price): price is number => price !== null)
  if (prices.length === 0) return null

  const min = Math.floor(Math.min(...prices) / PRICE_STEP) * PRICE_STEP
  const max = Math.ceil(Math.max(...prices) / PRICE_STEP) * PRICE_STEP
  return min === max ? null : [min, max]
}

/** Distinct neighborhoods of the results, alphabetically. */
export const neighborhoodOptions = (providers: ProviderSummaryResponse[]) => {
  const names = providers.map((provider) => provider.neighborhood?.trim()).filter((name): name is string => !!name)
  return [...new Set(names)].sort((a, b) => a.localeCompare(b, "pt-BR"))
}

/** Client-side filters the API doesn't support (price and neighborhood); categories are filtered by the server. */
export const filterProviders = (providers: ProviderSummaryResponse[], filters: SearchFilters) =>
  providers.filter((provider) => {
    if (!inRange(provider.minPrice, filters.priceRange)) return false
    if (filters.neighborhoods.length === 0) return true
    return !!provider.neighborhood && filters.neighborhoods.includes(provider.neighborhood.trim())
  })

/** Products matching the search filters; with no filter (or nothing matching) every product is shown. */
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

/** Filters that matter for the booking screen, as a query string ("" when empty). */
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

/** Inverse of `filtersToSearch`; invalid values are ignored. */
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
