import type { SearchPageState } from "@/hooks/search/useSearchPage"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { PRICE_STEP } from "@/services/search/searchFilters"
import { formatCurrencyShort } from "@/services/schedule/formatters"

import { SearchFilterOption, SearchFilterSection } from "./SearchFilterSection"

// Wraps the shadcn slider to match the design (thicker track, bordered thumbs) without editing ui/
const SLIDER_CLASSES = "[&_[data-slot=slider-track]]:h-1.5 [&_[data-slot=slider-range]]:bg-sich-gradient [&_[data-slot=slider-thumb]]:size-4 [&_[data-slot=slider-thumb]]:border-2 [&_[data-slot=slider-thumb]]:border-primary"

const SearchFilterPanel = ({ state }: { state: SearchPageState }) => {
  const {
    categories, draft, priceBounds, draftPriceRange, neighborhoods,
    toggleDraftCategory, toggleDraftNeighborhood, setDraftPriceRange, applyFilters, clearFilters,
  } = state

  const handleSliderChange = (value: number | readonly number[]) => {
    if (!Array.isArray(value)) return
    setDraftPriceRange([value[0], value[1]])
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-semibold text-sich-heading">Filtros</h2>
        <button type="button" onClick={clearFilters} className="cursor-pointer text-[12px] font-semibold text-sich-magenta hover:underline">
          Limpar
        </button>
      </div>

      {categories.length > 0 && (
        <SearchFilterSection title="Serviço">
          {categories.map((category) => (
            <SearchFilterOption
              key={category.id}
              label={category.name}
              checked={draft.categoryIds.includes(category.id)}
              onToggle={() => toggleDraftCategory(category.id)}
            />
          ))}
        </SearchFilterSection>
      )}

      {priceBounds && draftPriceRange && (
        <SearchFilterSection title="Faixa de preço">
          <Slider
            min={priceBounds[0]}
            max={priceBounds[1]}
            step={PRICE_STEP}
            value={draftPriceRange}
            onValueChange={handleSliderChange}
            aria-label="Faixa de preço"
            className={`py-2 ${SLIDER_CLASSES}`}
          />
          <div className="flex justify-between text-[13px] text-sich-label">
            <span>{formatCurrencyShort(draftPriceRange[0])}</span>
            <span>{formatCurrencyShort(draftPriceRange[1])}</span>
          </div>
        </SearchFilterSection>
      )}

      {/* TODO(backend): "Avaliação" filter needs rating in ProviderSummaryResponse */}

      {neighborhoods.length > 0 && (
        <SearchFilterSection title="Bairro">
          {neighborhoods.map((name) => (
            <SearchFilterOption
              key={name}
              label={name}
              checked={draft.neighborhoods.includes(name)}
              onToggle={() => toggleDraftNeighborhood(name)}
            />
          ))}
        </SearchFilterSection>
      )}

      <Button onClick={applyFilters} className="h-12 w-full rounded-[14px] bg-sich-gradient text-[14px] font-semibold shadow-sich-button">
        Aplicar filtros
      </Button>
    </div>
  )
}

export default SearchFilterPanel
