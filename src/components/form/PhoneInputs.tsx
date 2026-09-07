import IMask from "imask"
import type { FactoryArg } from "imask"

import type { ChangeEvent } from "react"
import Input, { type InputProps } from "./Input"

interface PhoneInputProps extends Omit<InputProps, "onChange"> {
  onChange: (value: string) => void
}

const maskOptions = {
  mask:  "(00) 00000-0000" 
}

const PhoneInput = ({ value, onChange, ...props }: PhoneInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(IMask.pipe(e.target.value, maskOptions as FactoryArg))
  }

  return <Input {...props} value={value} onChange={handleChange} />
}

export default PhoneInput