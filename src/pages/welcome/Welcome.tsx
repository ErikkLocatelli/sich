import { useContext } from "react"
import { Navigate } from "react-router-dom"

import useHead from "@/hooks/useHead"
import { userContext } from "@/services/userContext"
import { WELCOME_TOP_ID } from "@/services/welcome/welcomeContent"

import WelcomeHeader from "@/components/pages/welcome/WelcomeHeader"
import WelcomeHero from "@/components/pages/welcome/WelcomeHero"
import WelcomeMarquee from "@/components/pages/welcome/WelcomeMarquee"
import WelcomeHowItWorks from "@/components/pages/welcome/WelcomeHowItWorks"
import WelcomeProfessionalsGallery from "@/components/pages/welcome/WelcomeProfessionalsGallery"
import WelcomeServices from "@/components/pages/welcome/WelcomeServices"
import WelcomeWhyUs from "@/components/pages/welcome/WelcomeWhyUs"
import WelcomePartners from "@/components/pages/welcome/WelcomePartners"
import WelcomeCta from "@/components/pages/welcome/WelcomeCta"
import WelcomeFooter from "@/components/pages/welcome/WelcomeFooter"

/** Public landing page; signed-in users go straight to the app. */
const Welcome = () => {
  const { login, authReady } = useContext(userContext)
  useHead("Bem-vinda", "Agende manicure, pedicure e nail art a domicílio com profissionais verificadas e ganhe cashback em cada atendimento.")

  if (authReady && login) return <Navigate to="/" replace />

  return (
    <div id={WELCOME_TOP_ID} className="min-h-dvh bg-white">
      <WelcomeHeader />
      <main>
        <WelcomeHero />
        <WelcomeMarquee />
        <WelcomeHowItWorks />
        <WelcomeProfessionalsGallery />
        <WelcomeServices />
        <WelcomeWhyUs />
        <WelcomePartners />
        <WelcomeCta />
      </main>
      <WelcomeFooter />
    </div>
  )
}

export default Welcome
