import type { ProfileBody } from "@/api/user/profile"
import type { AnyUserData } from "@/models/userData"
import { formatCpfCnpj, formatPhone } from "@/services/profile/profileFormat"
import { validateFields } from "@/services/validators/validateFields"
import { validateCpfCnpjDigits } from "@/services/validators/validatorCpnjCpf"

import useForm from "../useForm"

/**
 * "Meus dados": name and phone can't be empty (the API answers 422). The document is
 * optional for customers (empty clears it) and required for providers, who signed up with it.
 */
export const useProfileDataForm = (initial: AnyUserData) => {
  const documentRequired = initial.userType === "PROVIDER"

  const name = useForm({
    initialValue: initial.name ?? "",
    validator: (value) => value.trim().length > 0 || "Informe seu nome",
  })
  const phone = useForm({ type: "phone", initialValue: initial.phone ? formatPhone(initial.phone) : "" })
  const cnpjCpf = useForm({
    initialValue: initial.cnpjCpf ? formatCpfCnpj(initial.cnpjCpf) : "",
    required: documentRequired,
    validator: (value) => (!documentRequired && value.trim() === "") || validateCpfCnpjDigits(value),
  })

  const fields = { name, phone, cnpjCpf }

  const toBody = (): ProfileBody => ({
    name: name.value.trim(),
    phone: phone.value.replace(/\D/g, ""),
    cnpjCpf: cnpjCpf.value.trim(),
  })

  return { fields, documentRequired, validateForm: () => validateFields(fields), toBody }
}
