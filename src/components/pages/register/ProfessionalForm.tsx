import { useProfessionalForm } from "../../../hooks/register/useProfessionalForm"

import Input  from "../../form/Input"
import InputPassword  from "../../form/InputPassword"
import PhoneInput  from "../../form/PhoneInputs"
import IdentityInput from "../../form/IdentityInput"
import LabelLink from "../../commons/LabelLink"

import { Checkbox } from "../../ui/checkbox"
import { Field, FieldGroup } from "../../ui/field"

import { User, Mail, Phone, Lock, Building2, House, Road, MapPinHouse, Map } from "lucide-react"

const ProfessionalForm = ({form}: {form : ReturnType<typeof useProfessionalForm>}) => {
  const { fields } = form 

    return (
       <Field className="mt-3.5 flex flex-col gap-2.5 animateLeft">
         <Input label="Nome Completo" placeholder="Nome Sobrenome" value={fields.name.value} onChange={fields.name.onChange} onBlur={fields.name.onBlur} error={fields.name.error} icon={User} />
        
        <Input label="Email" placeholder="email@exemplo.com" value={fields.email.value} onChange={fields.email.onChange} onBlur={fields.email.onBlur} error={fields.email.error} icon={Mail} />
        
        <FieldGroup className="flex-row gap-2.5 lg:gap-4">
            <PhoneInput label="Telefone" placeholder="(99) 99999-9999" type="tel" value={fields.phone.value} onChange={fields.phone.setValue} onBlur={fields.phone.onBlur} error={fields.phone.error} icon={Phone} />
            
            <IdentityInput label="CPF / CNPJ" placeholder="000.000.000-00" value={fields.cnpjCpf.value} onChange={fields.cnpjCpf.setValue} onBlur={fields.cnpjCpf.onBlur} error={fields.cnpjCpf.error} icon={Building2} />
        </FieldGroup>

        <FieldGroup className="flex flex-row gap-2.5 lg:gap-4">
            <Input label="CEP" placeholder="00000-000" value={fields.cep.value} onChange={fields.cep.onChange} onBlur={fields.cep.onBlur} error={fields.cep.error} icon={MapPinHouse} />

            <Input label="Estado" placeholder="São Paulo" value={fields.state.value} onChange={fields.state.onChange} onBlur={fields.state.onBlur} error={fields.state.error} icon={Map} />
        </FieldGroup>

        <Input label="Cidade" placeholder="São Paulo" value={fields.city.value} onChange={fields.city.onChange} onBlur={fields.city.onBlur} error={fields.city.error} icon={Building2} />

        <FieldGroup className="flex flex-row gap-2.5 lg:gap-4">
            <Input label="Rua" placeholder="Avenida Paulista" value={fields.street.value} onChange={fields.street.onChange} onBlur={fields.street.onBlur} error={fields.street.error} icon={Road} />
            
            <Input label="Número" placeholder="123" value={fields.numberAddress.value} onChange={fields.numberAddress.onChange} onBlur={fields.numberAddress.onBlur} error={fields.numberAddress.error} icon={House} />
        </FieldGroup>

        <FieldGroup className="flex flex-row gap-2.5 lg:gap-4">
          <Input label={"Senha"} type="password" placeholder="Crie uma senha" value={fields.password.value} onChange={fields.password.onChange} onBlur={fields.password.onBlur} error={fields.password.error} icon={Lock} />

          <InputPassword field={fields.passwordConfirm} placeholder="Confirme sua senha" label="Confirmar Senha" />
        </FieldGroup>
        
        <FieldGroup className="mt-2 flex flex-row gap-2">
            <Checkbox id="terms" checked={fields.terms.value === 'true'} onCheckedChange={(checked) => fields.terms.setValue(String(checked === true))} />
            <label className="text-[11px] text-(--label-text)" htmlFor='terms'>
            Concordo com os <LabelLink label="Termos" className="font-bold" /> e a <LabelLink label="Política de privacidade" className="font-bold"/>.
            </label>
        </FieldGroup>
       </Field>
    )
}

export default ProfessionalForm
