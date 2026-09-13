import { API_URL } from "../api"

export type LoginBody = {
  email: string
  password: string
}

export type RegisterBody = {
  name: string
  email: string
  phone: string
  city: string
  cnpjCpf?: string
  password: string
  userType: "CUSTOMER" | "PROVIDER"
}

export const GET_USER = (token: string) => {
    return {
        url: API_URL + "/auth/me",
        options: {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    }
}

export const LOGIN_POST = (body: LoginBody) => {
    return {
        url: API_URL + "/auth/login",
        options: {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

export const REGISTER_POST = (body: RegisterBody) => {
    return {
        url: API_URL + "/auth/register",
        options: {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}