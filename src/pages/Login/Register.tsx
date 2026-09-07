import useForm from "../../hooks/useForm"
import usePreviousRoute from "../../hooks/usePreviousRoute"
import useHead from "../../hooks/useHead"
import useFetch from "../../hooks/useFetch"

import { REGISTER_POST } from "../../api/user/user"

import { validateFields } from "../../services/validateFields"

import { cities } from "../../models/cities"

import Title from "@/components/commons/Title"
import ArrowBack from "../../components/commons/ArrowBack"
import LabelLink from "../../components/commons/LabelLink"
import Error from "../../components/commons/Error"

import Input from "../../components/form/Input"
import InputPassword from "../../components/form/InputPassword"
import PhoneInput from "../../components/form/PhoneInputs"
import Select from "../../components/form/Select"

import { Field, FieldGroup } from "../../components/ui/field"
import { Mail, User, Phone, Building2, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

const Register = () => {

  usePreviousRoute()
  useHead("Criar conta", "Crie sua conta na SICH")

  const email = useForm({ type: 'email', required: true })
  const name = useForm({ required: true })
  const phone = useForm({ type: 'phone', required: true })
  const password = useForm({ type: 'password', required: true })
  const passwordConfirm = useForm({required: true, validator: (value) => value === password.value || "As senhas não coincidem" })
  const terms = useForm({ isCheckbox: true, required: true })

  const { data, error, loading, request } = useFetch()

  const isFormValid =
    !!name.value &&
    !!email.value &&
    !!phone.value &&
    !!password.value &&
    !!passwordConfirm.value &&
    password.value === passwordConfirm.value &&
    terms.value === 'true' &&
    !name.error &&
    !email.error &&
    !phone.error &&
    !password.error &&
    !passwordConfirm.error

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const isValid = await validateFields({ email, name, phone, password, passwordConfirm, terms })

    if (isValid) {
      const { url, options } = REGISTER_POST({ name: name.value, email: email.value, phone: phone.value, password: password.value, userType: "CUSTOMER" })
      const { response, json } = await request(url, options)
      
      if(response?.ok) {
        console.log(response, json, data)
      }
    }
  }
  
  return (
    <div className="w-full min-w-0 min-h-dvh max-w-full rounded-[36px] bg-[#f7f7fb] shadow-sich-card animateLeft">
      <div className="flex h-25 w-full items-center gap-3 bg-white px-5">
        <ArrowBack />
        <Title text="Criar conta" />
      </div>

      <div className="flex flex-col px-6">
        <p className="mt-5.5 text-[11px] text-(--label-text)">Junte-se à SICH e ganhe <LabelLink label="R$ 10" className="font-bold" /> no primeiro agendamento.</p>
        <form onSubmit={handleSubmit}>
          <Field className="mt-3.5 flex flex-col gap-2.5">
            <Input label="Nome Completo" placeholder="Nome Sobrenome" value={name.value} onChange={name.onChange} onBlur={name.onBlur} error={name.error} icon={User} />
            
            <Input label="Email" placeholder="email@exemplo.com" value={email.value} onChange={email.onChange} onBlur={email.onBlur} error={email.error} icon={Mail} />
            
            <div className="flex flex-row gap-2.5">
              <PhoneInput label="Telefone" placeholder="(99) 99999-9999" type="tel" value={phone.value} onChange={phone.setValue} onBlur={phone.onBlur} error={phone.error} icon={Phone} />
              
              <Select label="Cidade" id="city" data={cities} placeholder="Selecione uma cidade" insideLabel="Cidades" icon={Building2} getKey={(item) => item.name} getValue={(item) => item.name} getLabel={(item) => item.name} />
            </div>
            
            <Input label={"Senha"} type="password" placeholder="Crie uma senha" value={password.value} onChange={password.onChange} onBlur={password.onBlur} error={password.error} icon={Lock} />

            <InputPassword field={passwordConfirm} placeholder="Confirme sua senha" label="Confirmar Senha" />

            <FieldGroup className="flex flex-row gap-2 mt-4">
              <Checkbox id="terms" checked={terms.value === 'true'} onCheckedChange={(checked) => terms.setValue(String(checked === true))} />
              <label className="text-[11px] text-(--label-text)" htmlFor='terms'>
                Concordo com os <LabelLink label="Termos" className="font-bold" /> e a <LabelLink label="Política de privacidade" className="font-bold"/>.
              </label>
            </FieldGroup>
          </Field>

            <Button className="mt-6 h-12 w-full rounded-[16px] bg-sich-gradient text-sm font-semibold text-white shadow-sich-button" disabled={!isFormValid || loading} type="submit">
            Criar conta
          </Button>

          {error && <Error message={error} className="mt-4 animateDown" />}
        </form>

        <p className="m-auto mt-4 text-[12px] text-(--label-text)">Já tem conta? <LabelLink label="Entrar" href="/login" className="text-[12px] font-semibold" /></p>
      </div>
    </div>
  )
}

export default Register
