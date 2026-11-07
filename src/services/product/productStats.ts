import type { ProductResponse } from "@/api/product/product"
import { formatDuration } from "@/services/schedule/formatters"

type CatalogItem = Pick<ProductResponse, "durationMinutes" | "price">

const average = (values: number[]) => {
  if (values.length === 0) return 0
  return values.reduce((acc, value) => acc + value, 0) / values.length
}

/** 92.4 -> "1h32", 45 -> "45min" */
export const averageDurationLabel = (products: CatalogItem[]) =>
  formatDuration(Math.round(average(products.map((product) => product.durationMinutes))))

export const averageTicketLabel = (products: CatalogItem[]) =>
  `R$ ${average(products.map((product) => product.price)).toFixed(0)}`

export const CATALOG_FILTER_OPTIONS = [
  { children: "Todos" },
  { children: "Ativos" },
  { children: "Inativos" },
] as const

/** 0 = all, 1 = active only, 2 = inactive only */
export const filterCatalog = <T extends Pick<ProductResponse, "active">>(products: T[], filter: number) => {
  if (filter === 1) return products.filter((product) => product.active)
  if (filter === 2) return products.filter((product) => !product.active)
  return products
}
