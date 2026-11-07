import PageHeader from "@/components/commons/PageHeader"
import ProductFormActions from "@/components/pages/products/ProductFormActions"
import type { ProductFormPageState } from "@/hooks/product/productFormPage"

import ProductForm from "./ProductForm"

const ProductFormMobile = ({ state }: { state: ProductFormPageState }) => {
  const { title, submitLabel, fields, images, categories, isFormValid, loading, handleSubmit, onCancel } = state

  return (
    <div className="w-full animateRight">
      <PageHeader text={title} />

      <form className="mt-3.5 mb-3.5 flex flex-col gap-5" onSubmit={handleSubmit}>
        <ProductForm fields={fields} categories={categories} images={images} />
        <ProductFormActions submitLabel={submitLabel} isFormValid={isFormValid} loading={loading} onCancel={onCancel} className="*:flex-1 px-5" />
      </form>
    </div>
  )
}

export default ProductFormMobile
