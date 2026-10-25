import Card from "../../commons/Card"
import RegularBadge from "../../commons/RegularBadge"

import { Button } from "@/components/ui/button"

import { MapPin, BanknoteArrowUp } from 'lucide-react';

const HomeSchedule = ({className}: {className?: string}) => {
  return (
    <Card className={`p-4 ${className}`}>
        <div className="flex flex-row items-center gap-3">
            <div className="size-14 text-[#A01F6B] bg-[#FDE7F0] flex items-center justify-center rounded-[14px] font-semibold">11:00</div>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex w-full items-center gap-1">
                    <span className="font-semibold text-sm">Esmaltação em gel</span>
                    <RegularBadge text="Confirmado"/>
                </div>
                <div className="flex gap-1 *:text-[11px] *:text-sich-label">
                    <span>Juliana Reis</span>
                    <span>·</span>
                    <span>1h</span>
                </div>
                <div className="flex gap-3 *:text-[11px] *:text-sich-label">
                    <div className="flex items-center gap-1">
                        <BanknoteArrowUp className="text-sich-label size-3"/>
                        <span>R$ 150,00</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MapPin className="text-sich-label size-3"/>
                        <span>Rua das Flores, 123</span>
                    </div>
                </div>
            </div>
        </div>
        <Button className="w-full mt-4 rounded-[12px] p-4 bg-white" variant="outline">Ver detalhes</Button>
    </Card>
  )
}

export default HomeSchedule
