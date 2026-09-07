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
      <InputGroup className="h-[51px] rounded-[16px] border-sich-border bg-white px-2" data-invalid={!!field.error}>
        <InputGroupAddon>
          <Lock className="size-4" />
        </InputGroupAddon>
        <InputGroupInput
          type={showPassword ? "text" : "password"}
          className="h-full flex-1 rounded-none border-0 bg-transparent px-2.5 py-0 text-[11px] placeholder:text-[11px] autofill-fix"
          placeholder={placeholder || "Digite sua senha"}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          aria-invalid={!!field.error}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="ghost" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      {field.error && <Error className="animateDown" message={field.error} />}
      {link && <LabelLink className="mt-1 w-full text-right text-[11px] font-medium" label="Esqueci minha senha" href="/" />}
    </Field>
  )
}

export default InputPassword