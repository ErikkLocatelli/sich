import { useMutation, useQueryClient } from "@tanstack/react-query"

import { apiFetch, requireToken } from "@/api/client"
import { queryKeys } from "@/api/queryKeys"
import {
  ADDRESS_PATCH,
  PASSWORD_PUT,
  PHOTO_DELETE,
  PHOTO_PUT,
  PROFILE_PATCH,
  type AddressBody,
  type PasswordBody,
  type ProfileBody,
} from "@/api/user/profile"
import { toast } from "@/components/ui/toast"
import type { AnyUserData } from "@/models/userData"

/**
 * Every `/users/me` edit returns the updated profile: it replaces the `me` cache, so
 * the context, sidebar and profile header update without another request.
 */
const useProfileEdit = <TBody,>(
  request: (token: string, body: TBody) => ReturnType<typeof PROFILE_PATCH>,
  messages: { success: string; error: string },
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: TBody) => apiFetch<AnyUserData>(request(requireToken(), body)),
    meta: { errorMessage: messages.error },
    onSuccess: (profile) => {
      queryClient.setQueryData(queryKeys.me, profile)
      toast.add({ type: "success", description: messages.success })
    },
  })
}

export const useUpdateProfile = () =>
  useProfileEdit<ProfileBody>(PROFILE_PATCH, { success: "Dados atualizados com sucesso", error: "Erro ao salvar seus dados" })

export const useUpdateAddress = () =>
  useProfileEdit<AddressBody>(ADDRESS_PATCH, { success: "Endereço atualizado com sucesso", error: "Erro ao salvar o endereço" })

export const useUpdatePhoto = () =>
  useProfileEdit<string>(PHOTO_PUT, { success: "Foto atualizada com sucesso", error: "Erro ao enviar a foto" })

export const useDeletePhoto = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => apiFetch<null>(PHOTO_DELETE(requireToken())),
    meta: { errorMessage: "Erro ao remover a foto" },
    onSuccess: () => {
      // 204 without a body: clear the photo in place
      queryClient.setQueryData<AnyUserData>(queryKeys.me, (profile) => profile && { ...profile, photo: null })
      toast.add({ type: "success", description: "Foto removida" })
    },
  })
}

/** The current token stays valid, so nothing else in the cache changes. */
export const useChangePassword = () =>
  useMutation({
    mutationFn: (body: PasswordBody) => apiFetch<null>(PASSWORD_PUT(requireToken(), body)),
    meta: { errorMessage: "Erro ao alterar a senha" },
    onSuccess: () => toast.add({ type: "success", description: "Senha alterada com sucesso" }),
  })
