import { createContext } from "react"
import type { UserData, UserDataProvider } from "../models/userData"

export type UserContextType = {
    login: boolean,
    authReady: boolean,
    data: UserData | UserDataProvider | null,
    userLogin: (token: string) => void,
    userLogout: () => void
}

export const userContext = createContext<UserContextType>({ login: false, authReady: false, data: null, userLogin: () => {}, userLogout: () => {} })
