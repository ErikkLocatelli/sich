export type PriceRange = [min: number, max: number]

export type SearchFilters = {
  categoryIds: number[]
  /** null = no price restriction */
  priceRange: PriceRange | null
  neighborhoods: string[]
}
