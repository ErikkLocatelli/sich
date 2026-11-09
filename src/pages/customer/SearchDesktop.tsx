import { Search as SearchIcon } from "lucide-react"

import type { SearchPageState } from "@/hooks/search/useSearchPage"

import Card from "@/components/commons/Card"
import Title from "@/components/commons/Title"
import Input from "@/components/form/Input"
import SearchCategoryChips from "@/components/pages/search/SearchCategoryChips"
import SearchFilterPanel from "@/components/pages/search/SearchFilterPanel"
import SearchProviderList from "@/components/pages/search/SearchProviderList"
import { Skeleton } from "@/components/ui/skeleton"

const SearchDesktop = ({ state }: { state: SearchPageState }) => {
  const { animationClass, query, setQuery, categories, selectedCategoryValues, setChipCategories, providers, loaded, countLabel, providerHref } = state

  return (
    <section className={`flex w-full flex-col gap-6 px-10 py-8 ${animationClass}`}>
      <header className="flex flex-col gap-1">
        <Title text="Buscar" className="lg:text-left lg:text-[26px] lg:font-bold lg:tracking-[-0.4px]" />
        {loaded ? <span className="text-[13px] text-sich-label">{countLabel}</span> : <Skeleton className="h-3.5 w-48" />}
      </header>

      <div className="grid grid-cols-[300px_minmax(0,1fr)] items-start gap-6">
        <Card className="sticky top-24 p-5">
          <SearchFilterPanel state={state} />
        </Card>

        <div className="flex flex-col gap-4.5">
          <Input
            type="search"
            placeholder="Profissional ou serviço"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            icon={SearchIcon}
            className="h-12 bg-white"
          />
          <SearchCategoryChips categories={categories} value={selectedCategoryValues} onValueChange={setChipCategories} />
          <SearchProviderList variant="grid" providers={providers} loaded={loaded} providerHref={providerHref} />
        </div>
      </div>
    </section>
  )
}

export default SearchDesktop
