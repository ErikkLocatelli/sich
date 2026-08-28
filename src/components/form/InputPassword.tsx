import { useState } from "react"

import { Field, FieldLabel } from "../../components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { Lock, Eye, EyeOff } from "lucide-react"

import LabelLink from "../commons/LabelLink"
import Error from "../commons/Error"

import type { UseFormReturn } from "../../hooks/useForm"

interface InputPasswordProps {
  field: UseFormReturn, 
  link?: boolean,
  placeholder?: string,
  label?: string
}

const InputPassword = ({ field, placeholder, link, label }: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Field className="flex flex-col gap-1">
      <FieldLabel className="text-[11px]" htmlFor="password">{label || "Senha"}</FieldLabel>
      <InputGroup className="py-5 px-2 bg-background" data-invalid={!!field.error}>
        <InputGroupAddon>
          <Lock />
        </InputGroupAddon>
        <InputGroupInput
          type={showPassword ? "text" : "password"}
          className="text-[11px] placeholder:text-[11px] flex-1"
          placeholder={placeholder || "Digite sua senha"}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          aria-invalid={!!field.error}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="ghost" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <Eye /> : <EyeOff />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      {field.error && <Error className="animateDown" message={field.error} />}
      {link && <LabelLink className="mt-1 w-full text-right" label="Esqueci minha senha" href="/" />}
    </Field>
  )
}

export default InputPassword