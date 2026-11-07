import type { CategoryResponse } from '@/api/product/product'
import type { ProductFormFields } from '@/hooks/product/productFormPage'
import type useProductImages from '@/hooks/useProductImages'
import { ACCEPTED_IMAGE_TYPES, PRODUCT_IMAGES_TIP } from '@/services/product/productForm'

import Card from '../../components/commons/Card'
import Input from '../../components/form/Input'
import ProductDetailsFields from '@/components/pages/products/ProductDetailsFields'

import { Button } from '../../components/ui/button'
import { Field } from '../../components/ui/field'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

import { ImageUp, Trash } from 'lucide-react';

type ProductFormProps = {
  fields: ProductFormFields
  categories: CategoryResponse[]
  images: ReturnType<typeof useProductImages>
}

/** Mobile form: stacked fields, file input and an image carousel. */
const ProductForm = ({ fields, categories, images }: ProductFormProps) => {
  return (
     <Field className="mt-3.5 mb-3.5 flex flex-col gap-5 px-5">
        <ProductDetailsFields fields={fields} categories={categories} />

        <Input
            label="Imagens"
            placeholder="Selecione imagens para o produto"
            type="file"
            icon={ImageUp}
            accept={ACCEPTED_IMAGE_TYPES}
            disabled={!images.canAddImages}
            onChange={(event) => {
                if (event.target.files) {
                images.addImages(event.target.files)
                event.target.value = ''
                }
            }}
            tip={PRODUCT_IMAGES_TIP}
            />

        {images.items.length > 0 && (
         <Carousel opts={{ loop: true, }} className="w-full max-w-50 m-auto animateLeft">
            <CarouselContent>
                {images.items.map(image => (
                    <CarouselItem key={image.key} className="basis-1/1">
                        <Card className="relative overflow-hidden group">
                            <img
                            src={image.url}
                            alt="Imagem do produto"
                            className="block aspect-square w-full object-cover transition duration-300 group-hover:brightness-50 group-hover:blur-[2px]"
                            />
                            <Button
                                type="button"
                                size="icon"
                                variant="outline"
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                onClick={image.onRemove}
                                >
                            <Trash className="size-4" />
                            </Button>
                        </Card>
                    </CarouselItem>
                ))}
                </CarouselContent>
            {images.items.length > 1 && <CarouselPrevious className="animateLeft" />}
            {images.items.length > 1 && <CarouselNext className="animateRight" />}
        </Carousel>
        )}
    </Field>
  )
}

export default ProductForm
