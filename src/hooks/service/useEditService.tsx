import useForm from "../../hooks/useForm"
import { validateFields } from "../../services/validators/validateFields"
import type { Service } from "../../models/services"

export const useEditService = (service: Service) => {
    const name = useForm({ required: true, initialValue: service.name })
    const description = useForm({ required: true, initialValue: service.description })
    const price = useForm({ required: true, initialValue: (service.price).toString() })
    const category = useForm({ required: true, initialValue: service.category })
    const duration = useForm({ required: true, initialValue: service.duration })
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
