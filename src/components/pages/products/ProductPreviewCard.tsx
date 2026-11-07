import { ImageIcon } from "lucide-react"

import type { CategoryResponse } from "@/api/product/product"
import Card from "@/components/commons/Card"
import SubTitle from "@/components/commons/SubTitle"
import type { ProductFormFields } from "@/hooks/product/productFormPage"
import type { ProductImageItem } from "@/hooks/useProductImages"
import { durationPreviewLabel, pricePreviewLabel } from "@/services/product/productForm"

type ProductPreviewCardProps = {
  fields: ProductFormFields
  categories: CategoryResponse[]
  images: ProductImageItem[]
}

/** Live preview built from the form state; no extra data is fetched. */
const ProductPreviewCard = ({ fields, categories, images }: ProductPreviewCardProps) => {
  const cover = images[0]
  const category = categories.find((item) => item.id.toString() === fields.category.value)
  const name = fields.name.value.trim()
  const description = fields.description.value.trim()

  return (
    <Card className="flex flex-col gap-4 p-5">
      <SubTitle text="Pré-visualização" />

      <div className="flex flex-col gap-3 rounded-[14px] border border-sich-border p-3">
        {cover ? (
          <img src={cover.url} alt="" className="aspect-video w-full rounded-[10px] object-cover" />
        ) : (
          <div className="flex aspect-video w-full items-center justify-center rounded-[10px] bg-sich-surface text-sich-label">
            <ImageIcon className="size-6" />
          </div>
        )}

        <div className="flex flex-col gap-0.5">
          {category && <span className="text-[10px] font-bold tracking-[0.5px] text-sich-magenta uppercase">{category.name}</span>}
          <p className={name ? "text-[14px] font-semibold text-sich-heading wrap-anywhere" : "text-[14px] font-semibold text-sich-label"}>
            {name || "Nome do produto"}
          </p>
          <span className="text-[12px] text-sich-label">
            {pricePreviewLabel(fields.price.value)} · {durationPreviewLabel(fields.duration.value)}
          </span>
        </div>

        {description && <p className="line-clamp-3 text-[11px] text-sich-label wrap-anywhere">{description}</p>}
      </div>
    </Card>
  )
}

export default ProductPreviewCard
