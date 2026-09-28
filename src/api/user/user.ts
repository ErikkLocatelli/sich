import { API_URL } from "../api"

export type LoginBody = {
  email: string
  password: string
}

type BaseRegisterBody = {
  name: string
  email: string
  phone: string
  city: string
  password: string
}

export type CustomerRegisterBody = BaseRegisterBody & {
  userType: "CUSTOMER"
}

export type ProfessionalRegisterBody = BaseRegisterBody & {
  cep: string
  state: string
  street: string
  numberAdress: string
  cnpjCpf: string
  userType: "PROVIDER"
}

export type RegisterBody =  CustomerRegisterBody | ProfessionalRegisterBody


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