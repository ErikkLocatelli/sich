import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

type DisponibilityActionsProps = {
  saving: boolean
  canSubmit: boolean
  onCancel: () => void
  className?: string
}

const DisponibilityActions = ({ saving, canSubmit, onCancel, className }: DisponibilityActionsProps) => (
  <Field className={cn("flex flex-row items-center gap-4", className)}>
    <Button type="button" onClick={onCancel} className="text-[12px] font-semibold py-5 px-8 text-sich-magenta shadow-sich-small bg-white hover:bg-white">Cancelar</Button>
    <Button className="text-[12px] font-semibold py-5 px-8 shadow-sich-button" type="submit" disabled={!canSubmit}>
      {saving && <Spinner data-icon="inline-start" />}
      Salvar
    </Button>
  </Field>
)

export default DisponibilityActions
