import { useCustomerForm } from "../../../hooks/register/useCustomerForm"

import  Input  from "../../form/Input"
import  InputPassword  from "../../form/InputPassword"
import  PhoneInput  from "../../form/PhoneInputs"
import  Select  from "../../form/Select"
import LabelLink from "../../commons/LabelLink"
import { cities } from "../../../models/cities"

import { Checkbox } from "../../ui/checkbox"
import { Field, FieldGroup } from "../../ui/field"

import { User, Mail, Phone, Lock, Building2 } from "lucide-react"

type CustomerFormProps = {
    form : ReturnType<typeof useCustomerForm>
}

const CustomerForm = ({form}: CustomerFormProps) => {
 
  const { fields } = form

  return (
    <Field className="mt-3.5 flex flex-col gap-2.5 animateRight">
        <Input label="Nome Completo" placeholder="Nome Sobrenome" value={fields.name.value} onChange={fields.name.onChange} onBlur={fields.name.onBlur} error={fields.name.error} icon={User} />
        
        <Input label="Email" placeholder="email@exemplo.com" value={fields.email.value} onChange={fields.email.onChange} onBlur={fields.email.onBlur} error={fields.email.error} icon={Mail} />
        
        <div className="flex flex-row gap-2.5 lg:gap-4">
            <PhoneInput label="Telefone" placeholder="(99) 99999-9999" type="tel" value={fields.phone.value} onChange={fields.phone.setValue} onBlur={fields.phone.onBlur} error={fields.phone.error} icon={Phone} />
            
            <Select label="Cidade" id="city" data={cities} placeholder="Selecione uma cidade" insideLabel="Cidades" icon={Building2} value={fields.city.value} onValueChange={fields.city.setValue} error={fields.city.error} getKey={(item) => item.name} getValue={(item) => item.name} getLabel={(item) => item.name} />
        </div>
        
          <Input label={"Senha"} type="password" placeholder="Crie uma senha" value={fields.password.value} onChange={fields.password.onChange} onBlur={fields.password.onBlur} error={fields.password.error} icon={Lock} />

          <InputPassword field={fields.passwordConfirm} placeholder="Confirme sua senha" label="Confirmar Senha" />

        <FieldGroup className="mt-2 flex flex-row gap-2">
            <Checkbox id="terms" checked={fields.terms.value === 'true'} onCheckedChange={(checked) => fields.terms.setValue(String(checked === true))} />
            <label className="text-[11px] text-(--label-text)" htmlFor='terms'>
            Concordo com os <LabelLink label="Termos" className="font-bold" /> e a <LabelLink label="Política de privacidade" className="font-bold"/>.
            </label>
        </FieldGroup>
    </Field>
  )
}

export default CustomerForm
