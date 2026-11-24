import type { AnyUserData } from "@/models/userData"
import { contactLine, sinceYear } from "@/services/profile/profileFormat"

import { useProfileStats } from "./useProfileStats"

export const useProfile = (data: AnyUserData, userLogout: () => void) => {
  const isCustomer = data.userType === "CUSTOMER"
  const stats = useProfileStats(data.userType)
  const year = sinceYear(data.createdAt)

  return {
    isCustomer,
    stats,
    userLogout,
    ariaLabel: isCustomer ? "Perfil do cliente" : "Perfil do profissional",
    header: {
      name: data.name,
      contact: contactLine(data.email, data.phone),
      photo: data.photo,
      sinceLabel: year ? `${isCustomer ? "Cliente desde" : "Profissional desde"} ${year}` : null,
    },
  }
}

export type ProfileState = ReturnType<typeof useProfile>
