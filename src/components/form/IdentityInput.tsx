import type { ChangeEvent } from "react"
import Input, { type InputProps } from "./Input"
import { formatCpfCnpj } from "../../services/profile/profileFormat"

interface IdentityInputProps extends Omit<InputProps, "onChange"> {
  value: string
  onChange: (value: string) => void
}

const IdentityInput = ({value, onChange, ...props}: IdentityInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCpfCnpj(e.target.value)
    onChange(formattedValue)
  }

    return <Input {...props} value={value} onChange={handleChange} />
}

export default IdentityInput
