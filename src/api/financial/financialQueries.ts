import { queryOptions } from "@tanstack/react-query"

import { apiFetch, requireToken } from "../client"
import { queryKeys } from "../queryKeys"
import { FINANCIAL_GET, type FinancialSummaryResponse } from "./financial"

export const financialQuery = (from: string, to: string) =>
  queryOptions({
    queryKey: queryKeys.provider.financial(from, to),
    queryFn: () => apiFetch<FinancialSummaryResponse>(FINANCIAL_GET(requireToken(), from, to)),
    meta: { errorMessage: "Não foi possível carregar seu faturamento." },
  })
