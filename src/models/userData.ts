export type UserData = {
    city: string, 
    cnpjCpf: string,
    complementAdress: string,
    email: string,
    name: string, 
    phone: string, 
    state: string,
    street: string, 
    userType: "CUSTOMER"
}

export type UserDataProvider = {
    city: string, 
    cnpjCpf: string,
    complementAdress: string,
    email: string,
    name: string,
    phone: string,
    state: string,
    street: string, 
    userType: "PROVIDER"
}