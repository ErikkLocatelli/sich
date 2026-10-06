import { useState } from "react"

import usePreviousRoute from "../../hooks/usePreviousRoute"
import useHead from "../../hooks/useHead"
import useFetch from "../../hooks/useFetch"
import { useCustomerForm } from "../../hooks/register/useCustomerForm"
import { useProfessionalForm } from "../../hooks/register/useProfessionalForm"

import { REGISTER_POST } from "../../api/user/user"

import CustomerForm from "../../components/pages/register/CustomerForm"
import ProfessionalForm from "../../components/pages/register/ProfessionalForm"
import Title from "@/components/commons/Title"
import ArrowBack from "../../components/commons/ArrowBack"
import LabelLink from "../../components/commons/LabelLink"
import Error from "../../components/commons/Error"

import { SlideToggle } from "../../components/form/SlideToggle"

import { Button } from "@/components/ui/button"

import SvgCreate from "../../assets/svgs/Create.svg?react"

const Register = () => {

  usePreviousRoute()
  useHead("Criar conta", "Crie sua conta na SICH")

  type UserType = "CUSTOMER" | "PROVIDER"
  const [userType, setUserType] = useState<UserType>("CUSTOMER")
  const customerForm = useCustomerForm()
  const professionalForm = useProfessionalForm()
  const activeForm = userType === "CUSTOMER" ? customerForm : professionalForm

  const { error, loading, request } = useFetch()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const isValid = await activeForm.validateForm()

    if(!isValid) return

    const payload = activeForm.getPayload()

    const { url, options } = REGISTER_POST(payload)
    const { response, json } = await request(url, options)

    console.log(response, json)
  }
  
  return (
    <div className="relative flex w-full min-h-dvh min-w-0 max-w-full flex-col overflow-hidden bg-sich-surface shadow-sich-card lg:flex-row lg:items-center lg:justify-center lg:gap-25 animateLeft">
      <div className="hidden lg:block lg:absolute lg:left-10 lg:top-10">
        <ArrowBack />
      </div>

      <div className="flex flex-col lg:w-110">
          <div className="flex h-25 w-full items-center gap-3 bg-white px-5 lg:hidden">
            <ArrowBack />
            <Title text="Criar conta" />
        </div>

      <div className="flex flex-col px-6 lg:px-0">
        <h1 className="hidden text-center text-[28px] font-semibold text-sich-heading lg:block">
          Crie sua conta. <span className="text-sich-magenta">É grátis!</span>
        </h1>
        <p className="mt-5.5 text-[11px] text-(--label-text) lg:mt-1 lg:text-center lg:text-[14px]">Junte-se à SICH e ganhe <LabelLink label="R$ 10" className="font-bold" /> no primeiro agendamento.</p>

        <SlideToggle 
          className="mt-4"
          selectedIndex={userType === "CUSTOMER" ? 0 : 1}
          onSelectedIndexChange={(index) => {
            setUserType(index === 0 ? "CUSTOMER" : "PROVIDER")
          }}
          options={[
            { children: <span className="text-[11px] lg:text-[14px]">Sou cliente</span> },
            { children: <span className="text-[11px] lg:text-[14px]">Sou profissional</span> }
          ]}
        />
        
        <form onSubmit={handleSubmit}>   
          {userType === "CUSTOMER" ? <CustomerForm form={customerForm}/> : <ProfessionalForm form={professionalForm} />}

          <Button className="mt-6 h-12 w-full rounded-[16px] bg-sich-gradient text-sm font-semibold text-white shadow-sich-button" disabled={!activeForm.isFormValid || loading} type="submit">
            Criar conta
          </Button>

          {error && <Error message={error} className="mt-4 animateDown" />}
        </form>

        <p className="m-auto mt-4 text-[12px] text-(--label-text) ">Já tem conta? <LabelLink label="Entrar" href="/login" className="text-[12px] font-semibold" /></p>
      </div>
      </div>

      <div className="hidden lg:block lg:h-126.5 lg:w-132.75">
        <SvgCreate className="size-full" />
      </div>
    </div>
  )
}

export default Register
