import useForm from "../../hooks/useForm"
import { validateFields } from "../../services/validators/validateFields"

export const useNewService = () => {
    const name = useForm({ required: true })
    const description = useForm({ required: true })
    const price = useForm({ required: true })
    const category = useForm({ required: true})
    const duration = useForm({ required: true })
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
