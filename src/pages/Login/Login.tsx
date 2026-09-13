import { useNavigate } from 'react-router-dom'

import useForm from '../../hooks/useForm'
import usePreviousRoute from '../../hooks/usePreviousRoute'
import useHead from '../../hooks/useHead'
import useFetch from '../../hooks/useFetch'
import { validateFields } from '../../services/validateFields'

import { LOGIN_POST } from '../../api/user/user'

import { Button } from '../../components/ui/button'

import Input from '../../components/form/Input'
import InputPassword from '../../components/form/InputPassword'
import SichBadge from '../../components/commons/SichBadge'
import LabelLink from '../../components/commons/LabelLink'
import Title from '../../components/commons/Title'
import Error from '../../components/commons/Error'

import SvgLogin from '../../assets/svgs/SvgLogin.svg?react'
import { Mail } from 'lucide-react'

const Login = () => {
  const email = useForm({ type: 'email', required: true })
  const password = useForm({ type: 'password', required: true })

  const { error, loading, request } = useFetch() 

  const previousRoute = usePreviousRoute();
  const navigate = useNavigate();
  useHead("Login", "Entre para acessar seus agendamentos e benefícios na SICH")

  const isFormValid =
    !!email.value &&
    !!password.value &&
    !email.error &&
    !password.error

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const isValid = await validateFields({ email, password })

    if(isValid) {
       const { url, options } = LOGIN_POST({ email: email.value, password: password.value })
       const { response, json } = await request(url, options)
       
       if(response?.ok) {
        window.localStorage.setItem("token", json.token)
        
        navigate("/")
    }
  }
}

  return (
    <div className={`flex w-full min-h-dvh flex-col lg:justify-center lg:items-center lg:flex-row lg:gap-25 overflow-hidden bg-sich-surface shadow-sich-card
    
    ${previousRoute === '/register' ? 'animateRight' : ''}`}>
      <div className="flex flex-col">
        <SichBadge/>
        <div className="flex flex-col mt-8 px-6">
          <Title text="Bem-vinda de volta" />
          <span className="text-sich-label text-[11px] lg:text-[14px] lg:text-center">Entre para acessar seus agendamentos e benefícios.</span>
          
          <form className="flex flex-col lg:w-110" onSubmit={onSubmit}>
            <div className="flex-col flex gap-2.5 lg:gap-6 mt-6 lg:mt-10">
              <Input label="Email" placeholder="email@exemplo.com" value={email.value} onChange={email.onChange} onBlur={email.onBlur} error={email.error} icon={Mail} />
        
              <InputPassword field={password} link={true}/>
            </div>
        
            <Button className="mt-6 h-12 rounded-[16px] bg-sich-gradient text-[14px] font-semibold text-white shadow-sich-button" type="submit" disabled={!isFormValid || loading}>
              Entrar
            </Button>

            {error && <Error message={error} className='animateDown mt-4'/>}
         </form>
        
          <div className="flex items-center pt-7.5 pb-5">
            <div className="grow border-t border-sich-border"></div>
            <span className="shrink mx-2 text-sich-label text-[11px]">ou continue com</span>
            <div className="grow border-t border-sich-border"></div>
          </div>

          <div className="flex row gap-2.5 *:h-10 *:flex-1 *:rounded-[16px] *:border-sich-border *:bg-white *:text-[12px] *:font-semibold *:text-black *:shadow-none *:hover:cursor-pointer">
            <Button variant="outline">Google</Button>
            <Button variant="outline">Apple</Button>
          </div>
          <p className="text-[12px] text-sich-label m-auto mt-7">
            Ainda não tem conta? <LabelLink className="text-[12px] font-semibold" label={"Criar conta"} href={"/register"} />
          </p>
        </div>
      </div>

      <div className="hidden lg:block size-150">
        <SvgLogin className="size-full" />
      </div>
    </div>
  )
}

export default Login
