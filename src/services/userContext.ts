import { createContext } from "react"
import type { UserData } from "../models/userData"

export type UserContextType = {
    login: boolean,
    data: UserData | null,
    userLogout: () => void
}

export const userContext = createContext<UserContextType>({ login: false, data: null, userLogout: () => {} })