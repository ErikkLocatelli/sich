import { ImageIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type ProductCardProps = {
  name: string
  details: string
  coverUrl?: string
  categoryName?: string
  description?: string
  namePlaceholder?: boolean
  className?: string
}

const ProductCard = ({ name, details, coverUrl, categoryName, description, namePlaceholder, className }: ProductCardProps) => {
  return (
    <div className={cn("flex flex-col gap-3 rounded-[14px] border border-sich-border p-3", className)}>
      {coverUrl ? (
        <img src={coverUrl} alt="" className="aspect-video w-full rounded-[10px] object-cover" />
      ) : (
        <div className="flex aspect-video w-full items-center justify-center rounded-[10px] bg-sich-surface text-sich-label">
          <ImageIcon className="size-6" />
        </div>
      )}

      <div className="flex flex-col gap-0.5">
        {categoryName && <span className="text-[10px] font-bold tracking-[0.5px] text-sich-magenta uppercase">{categoryName}</span>}
        <p className={cn("text-[14px] font-semibold wrap-anywhere", namePlaceholder ? "text-sich-label" : "text-sich-heading")}>{name}</p>
        <span className="text-[12px] text-sich-label">{details}</span>
      </div>

      {description && <p className="line-clamp-3 text-[11px] text-sich-label wrap-anywhere">{description}</p>}
    </div>
  )
}

export default ProductCard
