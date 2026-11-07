import Badge from "@/components/commons/Badge";
import ProductActions from "./ProductActions";

const ProductInfoCard = ({ id, name, price, duration, status, onDelete, onStatus }: { id: number; name: string; price: number; duration: string; status: boolean; onDelete: (id: number) => void; onStatus: (id: number, active: boolean) => void }) => {

  return (
    <div className={`flex flex-row items-center justify-between`}>
        <div className="flex items-start flex-col">
            <p className="text-[13px] font-medium">{name}</p>
            <span className="text-[11px] text-(--label-text)">R${price} · {duration}</span>
        </div>
        <div className="flex flex-row items-center gap-2">
            <Badge status={status} />
            <ProductActions id={id} status={status} onDelete={onDelete} onStatus={onStatus} />
        </div>
    </div>
  )
}

export default ProductInfoCard
