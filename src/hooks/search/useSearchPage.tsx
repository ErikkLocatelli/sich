import { useState } from "react"

import type { PriceRange, SearchFilters } from "@/models/searchFilters"
import {
  EMPTY_FILTERS,
  filterProviders,
  filtersToSearch,
  hasActiveFilters,
  neighborhoodOptions,
  priceBounds,
  providerCountLabel,
} from "@/services/search/searchFilters"

import usePreviousRoute from "../usePreviousRoute"
import { useCategories } from "../product/useCategories"
import { useProviderSearch } from "./useProviderSearch"

const toggle = <T,>(list: T[], item: T) => list.includes(item) ? list.filter((current) => current !== item) : [...list, item]

const clampRange = (range: PriceRange, bounds: PriceRange): PriceRange => [
  Math.max(range[0], bounds[0]),
  Math.min(range[1], bounds[1]),
]

/** State, data and actions of the customer search (chips apply at once; the filter popover edits a draft). */
export const useSearchPage = () => {
  const previousRoute = usePreviousRoute()
  const [query, setQuery] = useState("")
  const [filters, setFilters] = useState<SearchFilters>(EMPTY_FILTERS)
  const [draft, setDraft] = useState<SearchFilters>(EMPTY_FILTERS)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const { categories } = useCategories()
  const { providers, loaded } = useProviderSearch(query, filters.categoryIds)

  const bounds = priceBounds(providers)
  const visibleProviders = filterProviders(providers, filters)
  // Keep selected neighborhoods listed even if a new search no longer returns them, so they can be unchecked
  const neighborhoods = [...new Set([...neighborhoodOptions(providers), ...draft.neighborhoods])]

  const handleFiltersOpenChange = (open: boolean) => {
    if (open) setDraft(filters)
    setFiltersOpen(open)
  }

  const setChipCategories = (values: string[]) => {
    setFilters((current) => ({ ...current, categoryIds: values.map(Number) }))
  }

  const toggleDraftCategory = (id: number) => {
    setDraft((current) => ({ ...current, categoryIds: toggle(current.categoryIds, id) }))
  }

  const toggleDraftNeighborhood = (name: string) => {
    setDraft((current) => ({ ...current, neighborhoods: toggle(current.neighborhoods, name) }))
  }

  const setDraftPriceRange = (range: PriceRange) => {
    if (!bounds) return
    // The full range means "no price filter"
    const isFullRange = range[0] <= bounds[0] && range[1] >= bounds[1]
    setDraft((current) => ({ ...current, priceRange: isFullRange ? null : range }))
  }

  const applyFilters = () => {
    setFilters(draft)
    setFiltersOpen(false)
  }

  const clearFilters = () => {
    setDraft(EMPTY_FILTERS)
    setFilters(EMPTY_FILTERS)
  }

  return {
    animationClass: previousRoute === "/" ? "animateRight" : "animateLeft",
    query,
    setQuery,
    categories,
    selectedCategoryValues: filters.categoryIds.map(String),
    setChipCategories,
    providers: visibleProviders,
    loaded,
    countLabel: providerCountLabel(visibleProviders.length),
    hasActiveFilters: hasActiveFilters(filters),
    providerHref: (providerId: number) => `/search/${providerId}${filtersToSearch(filters)}`,
    filtersOpen,
    handleFiltersOpenChange,
    draft,
    priceBounds: bounds,
    draftPriceRange: bounds ? clampRange(draft.priceRange ?? bounds, bounds) : null,
    neighborhoods,
    toggleDraftCategory,
    toggleDraftNeighborhood,
    setDraftPriceRange,
    applyFilters,
    clearFilters,
  }
}

export type SearchPageState = ReturnType<typeof useSearchPage>
