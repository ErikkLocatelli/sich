import useForm from "../../hooks/useForm"

import { validateCpfCnpjDigits } from "../../services/validators/validatorCpnjCpf"
import { createCepValidator } from "../../services/validators/validatorCep"
import { validateFields } from "../../services/validators/validateFields"
import type { ProfessionalRegisterBody } from "../../api/user/user"

export const useProfessionalForm = () => {
    const email = useForm({ type: 'email', required: true })
    const name = useForm({ required: true })
    const phone = useForm({ type: 'phone', required: true })
    const password = useForm({ type: 'password', required: true })
    const passwordConfirm = useForm({required: true, validator: (value) => value === password.value || "As senhas não coincidem" })
    const cnpjCpf = useForm({ required: true, validator: validateCpfCnpjDigits })
    const city = useForm({ required: true })
    const state = useForm({ required: true })
    const street = useForm({ required: true })
    const numberAddress = useForm({ required: true })
    const cep = useForm({
        required: true,
        validator: createCepValidator((address) => {
            street.setValue(address.street)
            city.setValue(address.city)
            state.setValue(address.state)
        })
    })
    const terms = useForm({ isCheckbox: true, required: true })

    const isFormValid =
        !!name.value &&
        !!email.value &&
        !!phone.value &&
        !!city.value &&
        !!state.value &&
        !!street.value &&
        !!numberAddress.value &&
        !!cep.value &&
        !!cnpjCpf.value &&
        !!password.value &&
        !!passwordConfirm.value && 
        password.value === passwordConfirm.value &&
        terms.value === 'true' &&
        !name.error &&
        !email.error &&
        !phone.error &&
        !city.error &&
        !state.error &&
        !street.error &&
        !numberAddress.error &&
        !cep.error &&
        !cnpjCpf.error &&
        !password.error &&
        !passwordConfirm.error

    const validateForm = async () => {
        return await validateFields({ email, name, phone, city, state, street, numberAddress, cep, cnpjCpf, password, passwordConfirm, terms })
    }

    const getPayload = (): ProfessionalRegisterBody => ({
        name: name.value,
        email: email.value,
        phone: phone.value.replace(/\D/g, ''),
        city: city.value,
        state: state.value,
        street: street.value,
        numberAdress: numberAddress.value,
        cep: cep.value,
        cnpjCpf: cnpjCpf.value,
        password: password.value,
        userType: "PROVIDER"
    })

    return {
        fields: {
            email,
            name,
            phone,
            password,
            passwordConfirm,
            cnpjCpf,
            cep,
            city,
            state,
            street,
            numberAddress,
            terms
        },
        isFormValid, 
        validateForm, 
        getPayload
    }
}