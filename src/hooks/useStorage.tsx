import type { ReactNode } from "react"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { GET_USER } from "../api/user/user"
import type { UserData } from "../models/userData"

import useFetch from "../hooks/useFetch"
import { userContext } from "../services/userContext"

export const UserStorage = ({ children }: { children: ReactNode }) => {
    
    const [login, setLogin] = useState(false)
    const [data, setData] = useState<UserData | null>(null)
    const { request } = useFetch()
    const navigate = useNavigate()

    const userLogout = useCallback(() => {
        setData(null)
        setLogin(false)
        window.localStorage.removeItem("token")
        navigate("/login", { replace: true })
    }, [navigate])

    useEffect(() => {
        if (login) return

        const autoLogin = async () => {
            const token = window.localStorage.getItem("token")
            if (!token) return

            const { url, options } = GET_USER(token)
            const { json, response } = await request(url, options)

            if (response?.ok) {
                setData(json)
                setLogin(true)

                if (window.location.pathname === "/login" || window.location.pathname === "/register") {
                    navigate("/", { replace: true })
                }
            } else {
                userLogout()
            }
        }

        autoLogin()
    }, [login, request, userLogout, navigate])
    
    return (
        <userContext.Provider value={{login, data, userLogout}}>
            {children}
        </userContext.Provider>
    )
}