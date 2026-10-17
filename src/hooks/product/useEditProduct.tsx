import useForm from "../../hooks/useForm"
import { validateFields } from "../../services/validators/validateFields"
import type { Product } from "../../models/products"

export const useEditProduct = (product: Product) => {
    const name = useForm({ required: true, initialValue: product.name })
    const description = useForm({ required: true, initialValue: product.description })
    const price = useForm({ required: true, initialValue: (product.price).toString() })
    const category = useForm({ required: true, initialValue: product.category })
    const duration = useForm({ required: true, initialValue: product.duration })
    const status = useForm({ required: true })
    const images = useForm({ required: true })
  
     const validateForm = async () => {
       return await validateFields({ name, description, price, category, duration, status, images })
    }

    const isFormValid =
        !!name.value &&
        !!description.value &&
        !!price.value &&
        !!category.value &&
        !!duration.value &&
        // !!status.value &&
        // !!images.value && 
        !name.error &&
        !description.error &&
        !price.error &&
        !category.error &&
        !duration.error
        // !status.error &&
        // !images.error

    return {
        fields: {
            name,
            description,
            price,
            category,
            duration,
            status,
            images
        }, 
        validateForm,
        isFormValid
    }
}
