import type { ReactNode } from "react"
import { MemoryRouter } from "react-router-dom"
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query"
import { renderHook } from "@testing-library/react"

import { createQueryClient } from "@/lib/queryClient"

/** Same client as the app (meta toasts, keys, stale times) but without retries, so failures surface at once. */
export const createTestQueryClient = () => {
  const client = createQueryClient()
  client.setDefaultOptions({
    ...client.getDefaultOptions(),
    queries: { ...client.getDefaultOptions().queries, retry: false },
  })
  return client
}

export const createWrapper = (client: QueryClient, initialPath = "/") =>
  ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[initialPath]}>{children}</MemoryRouter>
    </QueryClientProvider>
  )

export const renderWithClient = <T,>(hook: () => T, client = createTestQueryClient(), initialPath = "/") => ({
  client,
  ...renderHook(hook, { wrapper: createWrapper(client, initialPath) }),
})
