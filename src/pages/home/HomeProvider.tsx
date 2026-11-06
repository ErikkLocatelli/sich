import type { UserDataProvider } from '@/models/userData'

import { Toaster } from '@/components/ui/toast'
import { useIsDesktop } from '@/hooks/useMedia'
import { useProviderHome } from '@/hooks/home/useProviderHome'

import HomeProviderDesktop from './HomeProviderDesktop'
import HomeProviderMobile from './HomeProviderMobile'

const HomeProvider = ({ data }: { data: UserDataProvider }) => {
  const isDesktop = useIsDesktop()
  const state = useProviderHome()

  return (
    <>
      {isDesktop ? <HomeProviderDesktop data={data} state={state} /> : <HomeProviderMobile data={data} state={state} />}
      <Toaster />
    </>
  )
}

export default HomeProvider
