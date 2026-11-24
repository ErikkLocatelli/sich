import { useContext } from "react"

import { userContext } from "../../services/userContext"
import useHead from "../../hooks/useHead"

import ProfileCustomer from "./ProfileCustomer"
import ProfileProvider from "./ProfileProvider"

const Profile = () => {
    useHead("Perfil", 'Gerencie suas informações na SICH')
    const { data, userLogout } = useContext(userContext)

    if (!data) return null

    if (data.userType === "CUSTOMER") return <ProfileCustomer data={data} userLogout={userLogout} />

    return <ProfileProvider data={data} userLogout={userLogout} />
}

export default Profile
