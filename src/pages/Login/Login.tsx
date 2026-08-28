import { Link } from 'react-router-dom'

import useForm from '../../hooks/useForm'
import usePreviousRoute from '../../hooks/usePreviousRoute'

import { Button } from '../../components/ui/button'

import Input from '../../components/form/Input'
import InputPassword from '../../components/form/InputPassword'
import SichBadge from '../../components/commons/SichBadge'
import LabelLink from '../../components/commons/LabelLink'
import Title from '../../components/commons/Title'

import { Mail } from 'lucide-react';

const Login = () => {

  const email = useForm({ type: 'email', required: true })
  const password = useForm({ type: 'password', required: true })

  const previousRoute = usePreviousRoute();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log(email.value, password.value);
  }

  return (
    <div className={previousRoute === '/register' ? 'animateRight' : ''}>
      <SichBadge />
      <div className="flex flex-col mt-8 px-8">
        <Title text="Bem-vindo" />
        <span className="text-(--label-text) text-[11px]">Entre para acessar seus agendamentos e benefícios</span>
        <form className="flex flex-col" onSubmit={onSubmit}>
          <div className="flex-col flex gap-2 mt-6">
            <Input label="Email" placeholder="email@exemplo.com" value={email.value} onChange={email.onChange} onBlur={email.onBlur} error={email.error} icon={Mail} />
            
            <InputPassword field={password} link={true}/>
          </div>
          
          <Button className="mt-6 bg-sich-gradient py-5 rounded-[16px]" type="submit">
            <Link className="text-white" to="/">Entrar</Link>
          </Button>
       </form>
        
        <div className="flex py-5 items-center">
          <div className="grow border-t border-gray-200"></div>
          <span className="shrink mx-2 text-gray-400 text-[11px]">ou continue com</span>
          <div className="grow border-t border-gray-200"></div>
        </div>

        <div className="flex row gap-4 *:flex-1 *:rounded-[16px] *:shadow *:text-black *:py-4 *:hover:cursor-pointer">
          <Button variant="outline">Google</Button>
          <Button variant="outline">Apple</Button>
        </div>

        <p className="text-[11px] text-(--label-text) m-auto mt-4">
          Ainda não tem uma conta? <LabelLink className="self-center mt-6" label={"Cadastre-se"} href={"/register"} />
        </p>
      </div>
    </div>
  )
}

export default Login
