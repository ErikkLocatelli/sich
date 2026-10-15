import IMask from "imask"
import type { FactoryArg } from "imask"

import type { ChangeEvent } from "react"
import Input, { type InputProps } from "./Input"

interface MoneyInputProps extends Omit<InputProps, "onChange"> {
  onChange: (value: string) => void
}

const maskOptions = {
  mask: "R$ num",
  blocks: {
    num: {
      mask: Number,
      scale: 2,
      thousandsSeparator: ".",
      radix: ",",
      normalizeZeros: true,
    },
  },
}

const MoneyInput = ({ value, onChange, ...props }: MoneyInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(IMask.pipe(e.target.value, maskOptions as FactoryArg))
  }

  return <Input {...props} value={value} onChange={handleChange} />
}

export default MoneyInput