import { useRef, useState, type ChangeEvent } from "react"

import { toast } from "@/components/ui/toast"
import { PhotoError, preparePhoto } from "@/services/profile/profilePhoto"

import { useDeletePhoto, useUpdatePhoto } from "./useProfileMutations"

/** Picks, reduces and uploads the profile photo; client-side failures show a toast without calling the API. */
export const useProfilePhoto = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preparing, setPreparing] = useState(false)
  const update = useUpdatePhoto()
  const remove = useDeletePhoto()

  const pick = () => inputRef.current?.click()

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    // Lets the same file be picked again after an error
    event.target.value = ""
    if (!file) return

    setPreparing(true)
    try {
      update.mutate(await preparePhoto(file))
    } catch (error) {
      const description = error instanceof PhotoError ? error.message : "Não foi possível ler a imagem."
      toast.add({ type: "error", description })
    } finally {
      setPreparing(false)
    }
  }

  return {
    inputRef,
    pick,
    handleFile,
    remove: () => remove.mutate(),
    busy: preparing || update.isPending || remove.isPending,
  }
}
