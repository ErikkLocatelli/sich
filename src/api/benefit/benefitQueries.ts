import { queryOptions } from "@tanstack/react-query"

import { apiFetch, requireToken } from "../client"
import { queryKeys } from "../queryKeys"
import { BENEFITS_GET, type CustomerBenefitsResponse } from "./benefit"

export const benefitsQuery = () =>
  queryOptions({
    queryKey: queryKeys.customer.benefits,
    queryFn: () => apiFetch<CustomerBenefitsResponse>(BENEFITS_GET(requireToken())),
    meta: { errorMessage: "Não foi possível carregar seus benefícios." },
  })
