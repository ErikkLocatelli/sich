import { queryOptions } from "@tanstack/react-query"

import type { UserData, UserDataProvider } from "@/models/userData"

import { apiFetch } from "../client"
import { queryKeys } from "../queryKeys"
import { GET_USER } from "./user"

export type LoginResponse = {
  token: string
}

/** The token is not part of the key: the cache is cleared on login and logout. */
export const meQuery = (token: string | null) =>
  queryOptions({
    queryKey: queryKeys.me,
    queryFn: () => apiFetch<UserData | UserDataProvider>(GET_USER(token ?? "")),
    enabled: !!token,
    staleTime: 5 * 60_000,
  })
