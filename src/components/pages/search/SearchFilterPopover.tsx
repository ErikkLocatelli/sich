import { Funnel } from "lucide-react"

import type { SearchPageState } from "@/hooks/search/useSearchPage"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import SearchFilterPanel from "./SearchFilterPanel"

const SearchFilterPopover = ({ state }: { state: SearchPageState }) => {
  const { filtersOpen, handleFiltersOpenChange, hasActiveFilters } = state

  return (
    <Popover open={filtersOpen} onOpenChange={handleFiltersOpenChange}>
      <PopoverTrigger
        render={<Button variant="ghost" size="icon-lg" className="relative shrink-0" aria-label="Abrir filtros" />}
      >
        <Funnel className="size-5 text-sich-heading" />
        {hasActiveFilters && <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary" aria-hidden />}
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        aria-label="Filtros"
        className="max-h-(--available-height) w-[min(20rem,calc(100vw-3rem))] overflow-y-auto rounded-[20px] border border-sich-border p-5 shadow-sich-small-card ring-0"
      >
        <SearchFilterPanel state={state} />
      </PopoverContent>
    </Popover>
  )
}

export default SearchFilterPopover
