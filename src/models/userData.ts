/** `GET /auth/me` (and every `/users/me` edit, which returns the updated profile). */
type BaseUserData = {
    email: string,
    name: string,
    phone: string | null,
    cnpjCpf: string | null,
    city: string | null,
    state: string | null,
    street: string | null,
    complementAdress: string | null,
    neighborhood: string | null,
    cep: string | null,
    numberAdress: string | null,
    /** Profile photo as a data URL, null without one */
    photo: string | null,
    /** ISO instant of the sign-up ("Cliente desde") */
    createdAt: string,
}

export type UserData = BaseUserData & {
    userType: "CUSTOMER"
}

export type UserDataProvider = BaseUserData & {
    userType: "PROVIDER"
}

export type AnyUserData = UserData | UserDataProvider
