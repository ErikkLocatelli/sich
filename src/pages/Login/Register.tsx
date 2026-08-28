import { Link } from "react-router-dom"

import useForm from "../../hooks/useForm"
import usePreviousRoute from "../../hooks/usePreviousRoute"

import { cities } from "../../models/cities"

import Title from "@/components/commons/Title"
import ArrowBack from "../../components/commons/ArrowBack"
import LabelLink from "../../components/commons/LabelLink"
import Input from "../../components/form/Input"
import InputPassword from "../../components/form/InputPassword"

import { Field, FieldLabel, FieldGroup } from "../../components/ui/field"
import { Mail, User, Phone, Building2, Lock } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log('Form submitted');
}

const Register = () => {

  usePreviousRoute()

  const email = useForm({ type: 'email', required: true })
  const name = useForm({ required: true })
  const phone = useForm({ type: 'phone', required: true })
  const password = useForm({ type: 'password', required: true })
  const passwordConfirm = useForm({ type: 'password', required: true })
  const terms = useForm({ isCheckbox: true, required: true })

  return (
    <div className="*:px-8 animateLeft">
      <div className="flex bg-white h-25 w-full row items-center gap-3 px-8">
        <ArrowBack />
        <Title text="Cadastro" />
      </div>
      <div className="mt-6 flex flex-col">
        <p className="text-[11px] text-(--label-text)">Junte-se à SICH e ganhe <LabelLink label="R$ 10" /> no primeiro agendamento.</p>
        <form onSubmit={handleSubmit}>
          <Field className="flex flex-col gap-3 mt-4">
            <Input label="Nome Completo" placeholder="Nome Sobrenome" value={name.value} onChange={name.onChange} onBlur={name.onBlur} error={name.error} icon={User} />
            
            <Input label="Email" placeholder="email@exemplo.com" value={email.value} onChange={email.onChange} onBlur={email.onBlur} error={email.error} icon={Mail} />
            
            <Input label="Telefone" placeholder="(99) 99999-9999" type="tel" value={phone.value} onChange={phone.onChange} onBlur={phone.onBlur} error={phone.error} icon={Phone} />

            <FieldGroup className="flex flex-col gap-1">
              <FieldLabel className="text-[11px]" htmlFor='city'>Cidade</FieldLabel>
              <Select>
                <SelectTrigger className="w-full py-5 px-4 bg-background">
                  <Building2 />
                  <SelectValue placeholder="Selecione sua cidade" className="text-[11px]" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Cidades</SelectLabel>
                    {cities.map((city) => (
                      <SelectItem key={city.UF} value={city.name} className="text-[11px]">
                        {city.name} - {city.UF}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FieldGroup>
            
            <Input label={"Senha"} type="password" placeholder="Crie uma senha" value={password.value} onChange={password.onChange} onBlur={password.onBlur} error={password.error} icon={Lock} />

            <InputPassword field={passwordConfirm} placeholder="Confirme sua senha" label="Confirmar Senha" />

            <FieldGroup className="flex flex-row gap-2 mt-4">
              <Checkbox id="terms" checked={terms.value === 'true'} onCheckedChange={(checked) => terms.setValue(String(checked === true))} />
              <label className="text-[11px]" htmlFor='terms'>
                Concordo com os <LabelLink label="Termos" /> e a <LabelLink label="Política de privacidade"/>.
              </label>
            </FieldGroup>
          </Field>

          <Button className="mt-6 bg-sich-gradient py-6 rounded-[16px] w-full" type="submit">
            <Link className="text-white" to="/">Criar conta</Link>
          </Button>
        </form>

        <p className="text-[11px] text-(--label-text) m-auto mt-4">Já tem uma conta? <LabelLink label="Entrar" href="/login" /></p>
      </div>
    </div>
  )
}

export default Register
