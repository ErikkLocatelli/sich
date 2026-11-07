import Card from "@/components/commons/Card"
import PageHeader from "@/components/commons/PageHeader"
import SubTitle from "@/components/commons/SubTitle"
import ProductDetailsFields from "@/components/pages/products/ProductDetailsFields"
import ProductFormActions from "@/components/pages/products/ProductFormActions"
import ProductImagesCard from "@/components/pages/products/ProductImagesCard"
import ProductPreviewCard from "@/components/pages/products/ProductPreviewCard"
import type { ProductFormPageState } from "@/hooks/product/productFormPage"

const ProductFormDesktop = ({ state }: { state: ProductFormPageState }) => {
  const { title, submitLabel, fields, images, categories, isFormValid, loading, handleSubmit, onCancel } = state

  return (
    <section className="flex w-full flex-col gap-6 pb-8 animateRight">
      <PageHeader text={title} backTo="/products" className="px-10" />

      <form onSubmit={handleSubmit} className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-start gap-6 px-10">
        <Card className="flex flex-col gap-6 p-5">
          <SubTitle text="Dados do produto" />
          <ProductDetailsFields fields={fields} categories={categories} layout="columns" />
          <ProductFormActions submitLabel={submitLabel} isFormValid={isFormValid} loading={loading} onCancel={onCancel} className="justify-end" />
        </Card>

        <div className="flex flex-col gap-6">
          <ProductImagesCard images={images} />
          <ProductPreviewCard fields={fields} categories={categories} images={images.items} />
        </div>
      </form>
    </section>
  )
}

export default ProductFormDesktop
