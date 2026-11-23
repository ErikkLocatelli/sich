/**
 * Hierarchical keys: invalidating a prefix (e.g. `queryKeys.provider.appointments.all`)
 * reaches every query below it.
 */
export const queryKeys = {
  me: ["me"] as const,
  categories: ["categories"] as const,
  providers: {
    all: ["providers"] as const,
    search: (term: string, categoryIds: number[]) => ["providers", "search", term, categoryIds] as const,
    searchAll: ["providers", "search"] as const,
    detail: (providerId: number) => ["providers", providerId] as const,
    products: (providerId: number) => ["providers", providerId, "products"] as const,
    availabilityAll: (providerId: number) => ["providers", providerId, "availability"] as const,
    availability: (providerId: number, date: string, productIds: number[]) =>
      ["providers", providerId, "availability", date, productIds] as const,
  },
  provider: {
    workingHours: ["provider", "working-hours"] as const,
    products: {
      all: ["provider", "products"] as const,
      list: ["provider", "products", "list"] as const,
      detail: (productId: number) => ["provider", "products", "detail", productId] as const,
    },
    appointments: {
      all: ["provider", "appointments"] as const,
      lists: ["provider", "appointments", "list"] as const,
      list: (from: string, to: string) => ["provider", "appointments", "list", from, to] as const,
      summaries: ["provider", "appointments", "summary"] as const,
      summary: (from: string, to: string) => ["provider", "appointments", "summary", from, to] as const,
      details: ["provider", "appointments", "detail"] as const,
      detail: (appointmentId: number) => ["provider", "appointments", "detail", appointmentId] as const,
      histories: ["provider", "appointments", "history"] as const,
      history: (size: number) => ["provider", "appointments", "history", "recent", size] as const,
      feed: (since: string, pageSize: number) => ["provider", "appointments", "history", "feed", since, pageSize] as const,
    },
  },
  customer: {
    appointments: {
      all: ["customer", "appointments"] as const,
      list: (from: string, to: string) => ["customer", "appointments", "list", from, to] as const,
      summary: ["customer", "appointments", "summary"] as const,
    },
  },
}
