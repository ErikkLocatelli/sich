import type { CategoryResponse } from "@/api/product/product"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

type SearchCategoryChipsProps = {
  categories: CategoryResponse[]
  value: string[]
  onValueChange: (value: string[]) => void
}

const SearchCategoryChips = ({ categories, value, onValueChange }: SearchCategoryChipsProps) => {
  if (categories.length === 0) return null

  return (
    <ToggleGroup
      multiple
      variant="outline"
      value={value}
      onValueChange={onValueChange}
      aria-label="Filtrar por categoria"
      className="w-full flex-wrap gap-2"
    >
      {categories.map((category) => (
        <ToggleGroupItem
          key={category.id}
          value={String(category.id)}
          className="h-8 rounded-full border-sich-border bg-white px-3 text-[12px] text-sich-heading hover:cursor-pointer"
        >
          {category.name}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

export default SearchCategoryChips
