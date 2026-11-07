import { Link } from "react-router-dom"
import { Pencil, Trash } from "lucide-react"

import EllipsisMenu from "@/components/commons/EllipsisMenu"

type ProductActionsProps = {
  id: number
  status: boolean
  onDelete: (id: number) => void
  onStatus: (id: number, active: boolean) => void
  /** Desktop renders "Editar" as its own button, so the menu can skip it */
  showEdit?: boolean
}

const ProductActions = ({ id, status, onDelete, onStatus, showEdit = true }: ProductActionsProps) => (
  <EllipsisMenu>
    {showEdit && (
      <div className="flex flex-row items-center gap-1 py-1">
        <Pencil className="size-2.5 text-(--label-text)" />
        <Link to={`/products/edit/${id}`} className="text-[12px] text-(--label-text) hover:text-(--primary-text)">Editar</Link>
      </div>
    )}
    <p className="text-[12px] py-1 text-(--label-text) hover:text-(--primary-text)" onClick={() => onStatus(id, status)}>{status ? 'Pausar serviço' : 'Reativar serviço'}</p>
    <div className="flex flex-row items-center gap-1 py-1 *:text-(--color-destructive)" onClick={() => onDelete(id)}>
      <Trash className="size-2.5 " />
      <p className="text-[12px] py-0.5">Excluir</p>
    </div>
  </EllipsisMenu>
)

export default ProductActions
