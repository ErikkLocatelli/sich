import useHead from "@/hooks/useHead"
import { useSearchPage } from "@/hooks/search/useSearchPage"

import { Toaster } from "@/components/ui/toast"

import SearchMobile from "./SearchMobile"

const Search = () => {
  useHead("Buscar", "Busque produtos ou profissionais na SICH")
  const state = useSearchPage()

  return (
    <>
      <SearchMobile state={state} />
      <Toaster />
    </>
  )
}

export default Search
