export type PriceRange = [min: number, max: number]

/** Filters of the customer search; also applied to the provider's products on the booking screen. */
export type SearchFilters = {
  categoryIds: number[]
  /** null = no price restriction */
  priceRange: PriceRange | null
  neighborhoods: string[]
}
