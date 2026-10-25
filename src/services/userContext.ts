import { createContext } from "react"
import type { UserData, UserDataProvider } from "../models/userData"

export type UserContextType = {
    login: boolean,
    authReady: boolean,
    data: UserData | UserDataProvider | null,
    userLogout: () => void
}

export const userContext = createContext<UserContextType>({ login: false, authReady: false, data: null, userLogout: () => {} })