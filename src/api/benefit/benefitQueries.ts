import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query"

import { apiFetch, requireToken } from "../client"
import { queryKeys } from "../queryKeys"
import { BENEFITS_GET, BENEFITS_HISTORY_GET, type CashbackHistoryPage, type CustomerBenefitsResponse } from "./benefit"

export const benefitsQuery = () =>
  queryOptions({
    queryKey: queryKeys.customer.benefits,
    queryFn: () => apiFetch<CustomerBenefitsResponse>(BENEFITS_GET(requireToken())),
    meta: { errorMessage: "Não foi possível carregar seus benefícios." },
  })

export const benefitsHistoryQuery = (pageSize: number) =>
  infiniteQueryOptions({
    queryKey: queryKeys.customer.benefitsHistory(pageSize),
    queryFn: ({ pageParam }) => apiFetch<CashbackHistoryPage>(BENEFITS_HISTORY_GET(requireToken(), pageParam, pageSize)),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const next = lastPage.page + 1
      return next < lastPage.totalPages ? next : undefined
    },
    meta: { errorMessage: "Não foi possível carregar o extrato." },
  })
