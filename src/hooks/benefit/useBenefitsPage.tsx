import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

import { benefitsHistoryQuery, benefitsQuery } from "@/api/benefit/benefitQueries"
import { cashbackSteps, percentLabel } from "@/services/benefit/cashback"
import { formatCurrency } from "@/services/schedule/formatters"

import usePreviousRoute from "../usePreviousRoute"

export const HISTORY_PAGE_SIZE = 10

export const useBenefitsPage = () => {
  const previousRoute = usePreviousRoute()
  const { data: benefits } = useQuery(benefitsQuery())
  const history = useInfiniteQuery(benefitsHistoryQuery(HISTORY_PAGE_SIZE))

  return {
    animationClass: previousRoute === "/profile" ? "animateLeft" : "animateRight",
    /** null while loading */
    wallet: benefits
      ? {
          balance: formatCurrency(benefits.cashbackBalance),
          pending: formatCurrency(benefits.cashbackPending),
          hasPending: benefits.cashbackPending > 0,
          usageHint: `Use até ${percentLabel(benefits.maxCashbackUsageRate)} do valor do agendamento`,
          earnHint: `Você ganha ${percentLabel(benefits.cashbackRate)} de volta em cada atendimento`,
        }
      : null,
    loyalty: benefits?.loyalty ?? null,
    /** null while loading; empty when the program gives no cashback */
    howItWorks: benefits ? cashbackSteps(benefits) : null,
    statement: {
      movements: history.data?.pages.flatMap((page) => page.content) ?? [],
      loaded: !history.isPending,
      hasMore: history.hasNextPage,
      loadingMore: history.isFetchingNextPage,
      loadMore: () => history.fetchNextPage(),
    },
  }
}

export type BenefitsPageState = ReturnType<typeof useBenefitsPage>
