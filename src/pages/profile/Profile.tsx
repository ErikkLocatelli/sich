import { useContext } from "react"

import type { AnyUserData } from "../../models/userData"
import { userContext } from "../../services/userContext"
import useHead from "../../hooks/useHead"
import { useIsDesktop } from "../../hooks/useMedia"
import { useProfile } from "../../hooks/profile/useProfile"

import ProfileDesktop from "./ProfileDesktop"
import ProfileMobile from "./ProfileMobile"

const ProfileScreen = ({ data, userLogout }: { data: AnyUserData; userLogout: () => void }) => {
    const isDesktop = useIsDesktop()
    const state = useProfile(data, userLogout)

    return isDesktop ? <ProfileDesktop state={state} /> : <ProfileMobile state={state} />
}

const Profile = () => {
    useHead("Perfil", 'Gerencie suas informações na SICH')
    const { data, userLogout } = useContext(userContext)

    if (!data) return null

    return <ProfileScreen data={data} userLogout={userLogout} />
}

export default Profile
