import { useEffect, useRef, useState, type ChangeEvent, type FocusEvent } from "react"
import Input, { type InputProps } from "./Input"

interface MoneyInputProps extends Omit<InputProps, "onChange"> {
  onChange: (value: string) => void
}

const formatCurrency = (value: string | undefined) => {
  if (!value) return ""

  const normalized = value
    .replace(/^R\$\s?/, "")
    .replace(/\./g, "")
    .replace(",", ".")
  const amount = Number(normalized)
  if (!Number.isFinite(amount)) return ""

  return `R$ ${amount.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

const MoneyInput = ({ value, onChange, ...props }: MoneyInputProps) => {
  const [displayValue, setDisplayValue] = useState(() => formatCurrency(value))
  const isEditing = useRef(false)

  useEffect(() => {
    if (isEditing.current) return
    setDisplayValue(formatCurrency(value))
  }, [value])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    isEditing.current = true
    const rawValue = e.target.value
      .replace(/[^\d,]/g, "")
      .replace(/(,.*),/g, "$1")

    setDisplayValue(rawValue)
    onChange(rawValue)
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const formattedValue = formatCurrency(displayValue)
    isEditing.current = false
    setDisplayValue(formattedValue)
    onChange(formattedValue)
    props.onBlur?.(event)
  }

  return (
    <Input
      {...props}
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  )
}

export default MoneyInput