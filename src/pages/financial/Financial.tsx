import useHead from "../../hooks/useHead"
import { useFinancialPage } from "@/hooks/financial/useFinancialPage"
import { useIsDesktop } from "@/hooks/useMedia"

import { Toaster } from "@/components/ui/toast"

import FinancialDesktop from "./FinancialDesktop"
import FinancialMobile from "./FinancialMobile"

const Financial = () => {
  useHead("Financeiro", "Gerencie suas finanças na SICH")
  const isDesktop = useIsDesktop()
  const state = useFinancialPage()

  return (
    <>
      {isDesktop ? <FinancialDesktop state={state} /> : <FinancialMobile state={state} />}
      <Toaster />
    </>
  )
}

export default Financial
