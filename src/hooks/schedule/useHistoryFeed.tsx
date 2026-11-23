import { useCallback, useMemo } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"

import { historyFeedQuery } from "../../api/schedule/scheduleQueries"

/**
 * Paginated history limited to appointments that started on or after `since`
 * ("yyyy-MM-dd"). The API returns newest first, so the first item older than the
 * cutoff means there is nothing else to load.
 */
export const useHistoryFeed = (since: string, pageSize: number) => {
  const { data, hasNextPage, isError, isFetching, isFetchingNextPage, isPending, fetchNextPage } =
    useInfiniteQuery(historyFeedQuery(since, pageSize))

  const appointments = useMemo(
    () => (data?.pages ?? [])
      .flatMap((page) => page.content)
      .filter((appointment) => appointment.startAt.slice(0, 10) >= since),
    [data, since]
  )

  // A failed page stops the feed, otherwise the scroll sentinel would retry it in a loop
  const hasMore = hasNextPage && !isError

  const loadMore = useCallback(() => {
    if (!hasMore || isFetchingNextPage) return
    // Two calls before a re-render would otherwise cancel and restart the same page
    fetchNextPage({ cancelRefetch: false })
  }, [hasMore, isFetchingNextPage, fetchNextPage])

  return { appointments, hasMore, loading: isFetching, loaded: !isPending, loadMore }
}
