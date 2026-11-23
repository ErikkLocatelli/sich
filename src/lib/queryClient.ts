import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query"

import { ApiError, errorMessage } from "@/api/client"
import { toast } from "@/components/ui/toast"

declare module "@tanstack/react-query" {
  interface Register {
    queryMeta: { errorMessage?: string }
    mutationMeta: { errorMessage?: string }
  }
}

const MAX_RETRIES = 1

/** Client errors (4xx) won't change on retry; network failures and 5xx get one more try. */
export const shouldRetry = (failureCount: number, error: unknown) => {
  if (failureCount >= MAX_RETRIES) return false
  if (!(error instanceof ApiError)) return false
  return error.status === 0 || error.status >= 500
}

const showError = (error: unknown, fallback: string | undefined) => {
  if (!fallback) return
  toast.add({ type: "error", description: errorMessage(error, fallback) })
}

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        gcTime: 10 * 60_000,
        retry: shouldRetry,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: false,
      },
    },
    // One toast per failed fetch, no matter how many components observe the query
    queryCache: new QueryCache({
      onError: (error, query) => showError(error, query.meta?.errorMessage),
    }),
    mutationCache: new MutationCache({
      onError: (error, _variables, _context, mutation) => showError(error, mutation.meta?.errorMessage),
    }),
  })

export const queryClient = createQueryClient()
