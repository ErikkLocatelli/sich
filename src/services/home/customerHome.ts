import type { CategoryResponse } from "@/api/product/product"
import type { ProviderSummaryResponse } from "@/api/provider/provider"
import { filtersToSearch, EMPTY_FILTERS } from "@/services/search/searchFilters"

export const HOME_CATEGORY_LIMIT = 6
export const HOME_PROVIDER_LIMIT = 3

/** Search page pre-filtered by one category. */
export const categoryHref = (categoryId: number) =>
  `/search${filtersToSearch({ ...EMPTY_FILTERS, categoryIds: [categoryId] })}`

export const providerHref = (providerId: number) => `/search/${providerId}`

// TODO(backend): no "trending" ranking yet; the first providers returned by the search stand in
export const homeProviders = (providers: ProviderSummaryResponse[]) => providers.slice(0, HOME_PROVIDER_LIMIT)

export const homeCategories = (categories: CategoryResponse[]) => categories.slice(0, HOME_CATEGORY_LIMIT)
