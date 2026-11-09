import type { CategoryResponse } from "@/api/product/product"
import Card from "@/components/commons/Card"
import SubTitle from "@/components/commons/SubTitle"
import type { ProductFormFields } from "@/hooks/product/productFormPage"
import type { ProductImageItem } from "@/hooks/useProductImages"
import { durationPreviewLabel, pricePreviewLabel } from "@/services/product/productForm"

import ProductCard from "./ProductCard"

type ProductPreviewCardProps = {
  fields: ProductFormFields
  categories: CategoryResponse[]
  images: ProductImageItem[]
}

/** Live preview built from the form state; no extra data is fetched. */
const ProductPreviewCard = ({ fields, categories, images }: ProductPreviewCardProps) => {
  const category = categories.find((item) => item.id.toString() === fields.category.value)
  const name = fields.name.value.trim()

  return (
    <Card className="flex flex-col gap-4 p-5">
      <SubTitle text="Pré-visualização" />

      <ProductCard
        name={name || "Nome do produto"}
        namePlaceholder={!name}
        details={`${pricePreviewLabel(fields.price.value)} · ${durationPreviewLabel(fields.duration.value)}`}
        coverUrl={images[0]?.url}
        categoryName={category?.name}
        description={fields.description.value.trim()}
      />
    </Card>
  )
}

export default ProductPreviewCard
