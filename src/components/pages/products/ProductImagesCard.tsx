import { ImageUp, Trash } from "lucide-react"

import Card from "@/components/commons/Card"
import SubTitle from "@/components/commons/SubTitle"
import { Button } from "@/components/ui/button"
import type useProductImages from "@/hooks/useProductImages"
import { ACCEPTED_IMAGE_TYPES, MAX_PRODUCT_IMAGES, PRODUCT_IMAGES_TIP } from "@/services/product/productForm"

/** Desktop image manager: every image visible at once, with an upload tile while slots remain. */
const ProductImagesCard = ({ images }: { images: ReturnType<typeof useProductImages> }) => (
  <Card className="flex flex-col gap-4 p-5">
    <div className="flex items-center justify-between">
      <SubTitle text="Imagens" tip={PRODUCT_IMAGES_TIP} />
      <span className="text-[12px] text-sich-label">{images.items.length}/{MAX_PRODUCT_IMAGES}</span>
    </div>

    <div className="grid grid-cols-3 gap-3">
      {images.items.map((image) => (
        <div key={image.key} className="group relative aspect-square overflow-hidden rounded-[14px] bg-sich-surface animateLeft">
          <img src={image.url} alt="Imagem do produto" className="size-full object-cover transition duration-300 group-hover:brightness-50" />
          <Button
            type="button"
            size="icon"
            variant="outline"
            aria-label="Remover imagem"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100"
            onClick={image.onRemove}
          >
            <Trash className="size-4" />
          </Button>
        </div>
      ))}

      {images.canAddImages && (
        <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-[14px] border border-dashed border-sich-border text-sich-label transition hover:border-sich-magenta hover:text-sich-magenta focus-within:border-sich-magenta">
          <ImageUp className="size-5" />
          <span className="text-[11px]">Adicionar</span>
          <input
            type="file"
            multiple
            accept={ACCEPTED_IMAGE_TYPES}
            className="sr-only"
            onChange={(event) => {
              if (event.target.files) images.addImages(event.target.files)
              event.target.value = ""
            }}
          />
        </label>
      )}
    </div>
  </Card>
)

export default ProductImagesCard
