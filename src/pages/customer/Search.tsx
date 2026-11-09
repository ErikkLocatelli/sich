import useHead from "@/hooks/useHead"
import { useIsDesktop } from "@/hooks/useMedia"
import { useSearchPage } from "@/hooks/search/useSearchPage"

import { Toaster } from "@/components/ui/toast"

import SearchDesktop from "./SearchDesktop"
import SearchMobile from "./SearchMobile"

const Search = () => {
  useHead("Buscar", "Busque produtos ou profissionais na SICH")
  const isDesktop = useIsDesktop()
  const state = useSearchPage()

  return (
    <>
      {isDesktop ? <SearchDesktop state={state} /> : <SearchMobile state={state} />}
      <Toaster />
    </>
  )
}

export default Search
