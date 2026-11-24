import useHead from '../../hooks/useHead'
import { useIsDesktop } from '../../hooks/useMedia'
import { useBenefitsPage } from '../../hooks/benefit/useBenefitsPage'

import BenefitsDesktop from './BenefitsDesktop'
import BenefitsMobile from './BenefitsMobile'

const Benefits = () => {
  useHead("Benefícios", "Confira seus benefícios na SICH")
  const isDesktop = useIsDesktop()
  const state = useBenefitsPage()

  return isDesktop ? <BenefitsDesktop state={state} /> : <BenefitsMobile state={state} />
}

export default Benefits
