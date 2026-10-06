import type { ChangeEvent } from "react"
import Input, { type InputProps } from "./Input"

const formatCpfCnpj = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 14)

  if (digits.length > 11) {
    return digits
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4')
      .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5')
  }

  return digits
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
}

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
