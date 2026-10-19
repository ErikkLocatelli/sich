import useForm from "../../hooks/useForm"
import { validateFields } from "../../services/validators/validateFields"
import type { ProductRequest } from "../../api/product/product"

export const useNewProduct = () => {
    const name = useForm({ required: true })
    const description = useForm({ required: true })
    const price = useForm({ required: true })
    const category = useForm({ required: true})
    const duration = useForm({ required: true })
    const status = useForm({ required: true })
  
     const validateForm = async () => {
       return await validateFields({ name, description, price, category, duration })
    }

    const isFormValid =
        !!name.value &&
        !!description.value &&
        !!price.value &&
        !!category.value &&
        !!duration.value &&
        !name.error &&
        !description.error &&
        !price.error &&
        !category.error &&
        !duration.error

    const getPayload = (): ProductRequest => ({
        name: name.value.trim(),
        description: description.value.trim() || null,
        price: Number(
            price.value
                .replace("R$ ", "")
                .replace(/\./g, "")
                .replace(",", ".")
        ),
        categoryId: Number(category.value),
        duration: duration.value,
    })

    return {
        fields: {
            name,
            description,
            price,
            category,
            duration,
            status,
        }, 
        validateForm,
        isFormValid, 
        getPayload
    }
}
