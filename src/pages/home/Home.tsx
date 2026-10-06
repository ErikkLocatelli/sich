import { useContext } from "react"

import { userContext } from "../../services/userContext"
import useHead from "../../hooks/useHead"

import HomeCustomer from "./HomeCustomer"
import HomeProvider from "./HomeProvider"

const Home = () => {
  useHead("Página Inicial", "Acesse seus agendamentos e benefícios na SICH")
  const { data } = useContext(userContext)
  const { userType } = data || {}

  if(!data) return null

  if (userType === "CUSTOMER") {
    return <HomeCustomer data={data} />
  } else {
    return <HomeProvider />
  }
}

export default Home
