import type { ReactNode } from "react"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import { getToken } from "../api/client"
import { meQuery } from "../api/user/userQueries"
import { userContext } from "../services/userContext"

const PUBLIC_PATHS = ["/login", "/register"]

export const UserStorage = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState(getToken)
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { data, isSuccess, isError, isPending } = useQuery(meQuery(token))

    const userLogin = useCallback((newToken: string) => {
        // Nothing cached for a previous account may leak into the new session
        queryClient.clear()
        window.localStorage.setItem("token", newToken)
        setToken(newToken)
    }, [queryClient])

    const userLogout = useCallback(() => {
        window.localStorage.removeItem("token")
        setToken(null)
        queryClient.clear()
        navigate("/login", { replace: true })
    }, [navigate, queryClient])

    useEffect(() => {
        if (isError) userLogout()
    }, [isError, userLogout])

    useEffect(() => {
        if (isSuccess && PUBLIC_PATHS.includes(window.location.pathname)) {
            navigate("/", { replace: true })
        }
    }, [isSuccess, navigate])

    const login = !!token && isSuccess

    return (
        <userContext.Provider value={{ login, authReady: !token || !isPending, data: login ? data : null, userLogin, userLogout }}>
            {children}
        </userContext.Provider>
    )
}
