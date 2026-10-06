import { Button } from "@/components/ui/button"
import Badge from "@/components/commons/Badge";

const ServiceInfoCard = ({ name, price, duration, status }:{ name: string; price: number; duration: string; status: "professional" | "active" | "paused" }) => {
  return (
    <div className={`flex flex-row items-center justify-between`}>
        <div className="flex items-start flex-col">
            <p className="text-[13px] font-bold">{name}</p>
            <span className="text-[11px] text-(--label-text)">R${price} · {duration}</span>
        </div>
        <div className="flex flex-row items-center gap-4">
            <Badge text={status} status={status} />
            <Button variant='outline' className={"text-[11px]"}>Editar</Button>
        </div>
    </div>
  )
}

export default ServiceInfoCard
