import type { FormEvent } from "react"

import type { CategoryResponse } from "@/api/product/product"
import type { UseFormReturn } from "../useForm"
import type useProductImages from "../useProductImages"

export type ProductFormFields = {
  name: UseFormReturn
  category: UseFormReturn
  duration: UseFormReturn
  price: UseFormReturn
  description: UseFormReturn
}

/** Shape shared by the create and edit product screens, consumed by both views. */
export type ProductFormPageState = {
  title: string
  submitLabel: string
  fields: ProductFormFields
  images: ReturnType<typeof useProductImages>
  categories: CategoryResponse[]
  isFormValid: boolean
  loading: boolean
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>
  onCancel: () => void
}
