import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

type ProductFormActionsProps = {
  submitLabel: string
  isFormValid: boolean
  loading: boolean
  onCancel: () => void
  className?: string
}

const ProductFormActions = ({ submitLabel, isFormValid, loading, onCancel, className }: ProductFormActionsProps) => (
  <Field className={cn("flex flex-row items-center gap-4", className)}>
    <Button type="button" onClick={onCancel} className="text-[12px] font-semibold py-5 px-8 text-sich-magenta shadow-sich-small bg-white hover:bg-white">Cancelar</Button>
    <Button className="text-[12px] font-semibold py-5 px-8 shadow-sich-button" type="submit" disabled={!isFormValid || loading}>
      {loading && <Spinner data-icon="inline-start" />}
      {submitLabel}
    </Button>
  </Field>
)

export default ProductFormActions
