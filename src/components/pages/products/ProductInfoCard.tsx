import { Link } from "react-router-dom"

import Badge from "@/components/commons/Badge";
import EllipsisMenu from "@/components/commons/EllipsisMenu";

import { Pencil, Trash } from "lucide-react";

const ProductInfoCard = ({ id, name, price, duration, status }:{ id: number; name: string; price: number; duration: string; status: "professional" | "active" |  "paused" }) => {

  return (
    <div className={`flex flex-row items-center justify-between`}>
        <div className="flex items-start flex-col">
            <p className="text-[13px] font-bold">{name}</p>
            <span className="text-[11px] text-(--label-text)">R${price} · {duration}</span>
        </div>
        <div className="flex flex-row items-center gap-2">
            <Badge text={status} status={status} />
            <EllipsisMenu>
                <div className="flex flex-row items-center gap-1 py-1">
                  <Pencil className="size-2.5 text-(--label-text)" />
                  <Link to={`/products/edit/${id}`} className="text-[12px] text-(--label-text) hover:text-(--primary-text)">Editar</Link>
                </div>
                <p className="text-[12px] py-1 text-(--label-text) hover:text-(--primary-text)">Pausar produto</p>
                <div className="flex flex-row items-center gap-1 py-1 hover:cursor-pointer *:text-(--color-destructive)">
                  <Trash className="size-2.5 " />
                  <p className="text-[12px] py-0.5">Excluir</p>
                </div>
            </EllipsisMenu>
        </div>
    </div>
  )
}

export default ProductInfoCard
