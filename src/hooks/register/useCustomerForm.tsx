import useForm from "../../hooks/useForm"
import { validateFields } from "../../services/validators/validateFields"
import type { CustomerRegisterBody } from "../../api/user/user"

export const useCustomerForm = () => {
    const email = useForm({ type: 'email', required: true })
    const name = useForm({ required: true })
    const phone = useForm({ type: 'phone', required: true })
    const password = useForm({ type: 'password', required: true })
    const city = useForm({ required: true })
    const passwordConfirm = useForm({required: true, validator: (value) => value === password.value || "As senhas não coincidem" })
    const terms = useForm({ isCheckbox: true, required: true })

    const isFormValid =
        !!name.value &&
        !!email.value &&
        !!phone.value &&
        !!city.value &&
        !!password.value &&
        !!passwordConfirm.value &&
        password.value === passwordConfirm.value &&
        terms.value === 'true' &&
        !name.error &&
        !email.error &&
        !phone.error &&
        !city.error &&
        !password.error &&
        !passwordConfirm.error 

    const validateForm = async () => {
       return await validateFields({ email, name, phone, city, password, passwordConfirm, terms })
    }

    const getPayload = (): CustomerRegisterBody => ({
        name: name.value,
        email: email.value,
        phone: phone.value.replace(/\D/g, ''),
        city: city.value,
        password: password.value,
        userType: "CUSTOMER"
    })

    return {
        fields: {
            email,
            name,
            phone,
            password,
            city,
            passwordConfirm,
            terms
        },
        isFormValid, 
        validateForm, 
        getPayload
    }
}   
