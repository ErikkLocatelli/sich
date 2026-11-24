import { useContext, type MouseEvent } from "react"
import { Heart } from "lucide-react"

import { useToggleFavorite } from "@/hooks/favorite/useToggleFavorite"
import { cn } from "@/lib/utils"
import { userContext } from "@/services/userContext"

type FavoriteButtonProps = {
  providerId: number
  providerName: string
  favorite: boolean
  className?: string
}

/** Heart toggle for a provider; renders nothing for anyone who isn't a customer. */
const FavoriteButton = ({ providerId, providerName, favorite, className }: FavoriteButtonProps) => {
  const { data } = useContext(userContext)
  const { mutate, isPending } = useToggleFavorite()

  if (data?.userType !== "CUSTOMER") return null

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    // The button may sit over a card link
    event.preventDefault()
    event.stopPropagation()
    mutate({ providerId, favorite: !favorite })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-pressed={favorite}
      aria-label={favorite ? `Remover ${providerName} dos favoritos` : `Favoritar ${providerName}`}
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full bg-white/90 text-sich-magenta transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-sich-magenta disabled:opacity-60",
        className,
      )}
    >
      <Heart aria-hidden="true" className={cn("size-4", favorite && "fill-current")} />
    </button>
  )
}

export default FavoriteButton
