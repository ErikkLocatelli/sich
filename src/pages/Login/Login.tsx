import { useState } from 'react'

import { Link } from 'react-router-dom'

import { Field, FieldLabel } from '../../components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { Button } from '../../components/ui/button'

import SichBadge from '../../components/commons/SichBadge'

import { Eye, EyeOff, Mail, Lock  } from 'lucide-react';

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <SichBadge />
      <div className="flex flex-col mt-8 px-8">
        <h2 className="text-[18px] font-semibold">Bem-vindo</h2>
        <span className="text-(--label-text) text-[11px]">Entre para acessar seus agendamentos e benefícios</span>
        
        <Field className="flex gap-2 mt-6">
          <div>
            <FieldLabel className="text-[11px]" htmlFor='email'>Email</FieldLabel>
            <InputGroup className="py-4 px-2 bg-background">
              <InputGroupInput className="placeholder:text-[11px] text-[11px]" placeholder="email@exemplo.com" />
              <InputGroupAddon>
                <Mail />
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div className="flex flex-col">
            <FieldLabel className="text-[11px]" htmlFor='password'>Senha</FieldLabel>
            <InputGroup className="py-4 px-2 bg-background">
               <InputGroupAddon>
                <Lock />
              </InputGroupAddon>
              <InputGroupInput className="placeholder:text-[11px] text-[11px] shadow flex-1" placeholder="email@exemplo.com" /> 
              <InputGroupAddon align="inline-end">
                <InputGroupButton variant="ghost" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff /> : <Eye />}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <FieldLabel className="text-[11px] font-medium self-end text-primary mt-1 hover:underline">
              <Link to="/">Esqueci minha senha</Link>
            </FieldLabel>
          </div>
        </Field>
      
        <Button className="mt-6 bg-sich-gradient py-5 rounded-[16px] shadow">
          <Link className="text-white" to="/">Entrar</Link>
        </Button>

        <div className="relative flex py-5 items-center">
          <div className="grow border-t border-gray-200"></div>
          <span className="shrink mx-2 text-gray-400 text-[11px]">ou continue com</span>
          <div className="grow border-t border-gray-200"></div>
        </div>

        <div className="flex row gap-4 *:flex-1 *:rounded-[16px] *:shadow *:text-black *:py-4 *:hover:cursor-pointer">
          <Button variant="outline">Google</Button>
          <Button variant="outline">Apple</Button>
        </div>

        <div className="mt-6 m-auto text-[11px] text-(--label-text)">
          Ainda não tem uma conta? <Link className="text-primary hover:underline font-medium" to="/">Cadastre-se</Link>
        </div>
     
      </div>
    </div>
  )
}

export default Login
