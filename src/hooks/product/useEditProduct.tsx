import { useEffect } from "react"

import useForm from "../../hooks/useForm"
import { validateFields } from "../../services/validators/validateFields"
import type { ProductRequest, ProductResponse } from "../../api/product/product"

export const useEditProduct = (product: ProductResponse | null) => {
    const name = useForm({ required: true })
    const description = useForm({ required: false })
    const price = useForm({ required: true })
    const category = useForm({ required: true })
    const duration = useForm({ required: true })
    const status = useForm({ required: true })
    const images = useForm({ required: true })
    const { setValue: setName } = name
    const { setValue: setDescription } = description
    const { setValue: setPrice } = price
    const { setValue: setCategory } = category
    const { setValue: setDuration } = duration

    useEffect(() => {
       if (!product) return

       setName(product.name)
       setDescription(product.description ?? "")
       setPrice(product.price.toString())
       setCategory(product.categoryId.toString())
       setDuration(product.duration)
    }, [
       product,
       setName,
       setDescription,
       setPrice,
       setCategory,
       setDuration
    ])
  
    const validateForm = async () => {
      return await validateFields({ name, description, price, category, duration })
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
        duration: duration.value
        })

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
        isFormValid,
        getPayload
    }
}
