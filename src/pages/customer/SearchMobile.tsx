import { Search as SearchIcon } from "lucide-react"

import type { SearchPageState } from "@/hooks/search/useSearchPage"

import Title from "@/components/commons/Title"
import Input from "@/components/form/Input"
import SearchCategoryChips from "@/components/pages/search/SearchCategoryChips"
import SearchFilterPopover from "@/components/pages/search/SearchFilterPopover"
import SearchProviderList from "@/components/pages/search/SearchProviderList"

const SearchMobile = ({ state }: { state: SearchPageState }) => {
  const { animationClass, query, setQuery, categories, selectedCategoryValues, setChipCategories, providers, loaded, countLabel, providerHref } = state

  return (
    <div className={`w-full ${animationClass}`}>
      <div className="flex flex-col gap-3 bg-white px-6 py-4">
        <Title text="Buscar" />
        <div className="flex items-end gap-2">
          <div className="min-w-0 flex-1">
            <Input
              type="search"
              placeholder="Profissional ou serviço"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              icon={SearchIcon}
              className="bg-sich-surface"
            />
          </div>
          <SearchFilterPopover state={state} />
        </div>

        <SearchCategoryChips categories={categories} value={selectedCategoryValues} onValueChange={setChipCategories} />
      </div>

      <div className="px-6 py-4">
        <SearchProviderList variant="list" providers={providers} loaded={loaded} countLabel={countLabel} providerHref={providerHref} />
      </div>
    </div>
  )
}

export default SearchMobile
