import { Banknote, BriefcaseBusiness, Clock, ListSortDescending } from "lucide-react"

import type { CategoryResponse } from "@/api/product/product"
import Error from "@/components/commons/Error"
import Input from "@/components/form/Input"
import InputTime from "@/components/form/InputTime"
import MoneyInput from "@/components/form/MoneyInput"
import Select from "@/components/form/Select"
import { Field, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import type { ProductFormFields } from "@/hooks/product/productFormPage"
import { cn } from "@/lib/utils"
import { PRODUCT_DURATION_TIP } from "@/services/product/productForm"

type ProductDetailsFieldsProps = {
  fields: ProductFormFields
  categories: CategoryResponse[]
  /** stacked: name and category take the full row (mobile); columns: every pair shares a row (desktop) */
  layout?: "stacked" | "columns"
  className?: string
}

const ProductDetailsFields = ({ fields, categories, layout = "stacked", className }: ProductDetailsFieldsProps) => {
  const pairSpan = layout === "stacked" ? "col-span-2" : "col-span-1"

  return (
    <div className={cn("grid grid-cols-2 gap-x-2.5 gap-y-5", layout === "columns" && "gap-x-5", className)}>
      <div className={pairSpan}>
        <Input label="Nome do produto" placeholder="Digite o nome do produto" icon={BriefcaseBusiness} value={fields.name.value} error={fields.name.error} onBlur={fields.name.onBlur} onChange={fields.name.onChange}/>
      </div>

      <div className={pairSpan}>
        <Select label="Categoria" id="category" placeholder="Selecione a categoria" icon={ListSortDescending} insideLabel="Produtos" data={categories} getKey={(item) => item.name} getValue={(item) => (item.id).toString()} getLabel={(item) => item.name} value={fields.category.value} error={fields.category.error} onValueChange={fields.category.setValue}/>
      </div>

      <InputTime label="Duração" icon={Clock} min="00:15" max="02:00" step={900} value={fields.duration.value} error={fields.duration.error} onBlur={fields.duration.onBlur} onChange={fields.duration.onChange} tip={PRODUCT_DURATION_TIP}/>

      <MoneyInput label="Preço" placeholder="R$ 100,00" icon={Banknote} value={fields.price.value} error={fields.price.error} onBlur={fields.price.onBlur} onChange={fields.price.setValue}/>

      <Field className="col-span-2">
        <FieldLabel className="text-[11px]" htmlFor="textarea">Descrição</FieldLabel>
        <Textarea placeholder="Digite uma descrição para o produto" className={cn("resize-none rounded-[16px] border-sich-border bg-white text-[11px]", layout === "columns" && "min-h-28")} id="textarea" value={fields.description.value} onBlur={fields.description.onBlur} onChange={fields.description.onChange}/>
        {fields.description.error && <Error message={fields.description.error} className='animateDown' />}
      </Field>
    </div>
  )
}

export default ProductDetailsFields
