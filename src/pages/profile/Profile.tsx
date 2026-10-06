import { useContext } from "react"

import { userContext } from "../../services/userContext"
import useHead from "../../hooks/useHead"

import ProfileCustomer from "./ProfileCustomer"
import ProfileProvider from "./ProfileProvider"

const Profile = () => {
    useHead("Perfil", 'Gerencie suas informações na SICH')
    const { data, userLogout } = useContext(userContext)
    const { userType } = data || {}

    if(!data) return null

    if (userType === "CUSTOMER") {
        return <ProfileCustomer userLogout={userLogout} />
    } else {
        return <ProfileProvider userLogout={userLogout} />
    }
}

export default Profile
