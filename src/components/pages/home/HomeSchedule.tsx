import { Link } from "react-router-dom"

import Card from "../../commons/Card"
import RegularBadge from "../../commons/RegularBadge"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { AppointmentResponse } from "@/api/schedule/appointments"
import { timeOf } from "@/services/schedule/dayTimeline"
import { appointmentPath } from "@/services/schedule/appointmentDetails"
import { formatCurrency, formatDuration } from "@/services/schedule/formatters"

import { MapPin, BanknoteArrowUp } from 'lucide-react';

type HomeScheduleProps = {
  appointment: AppointmentResponse
  layout?: "stacked" | "row"
  className?: string
}

const HomeSchedule = ({ appointment, layout = "stacked", className }: HomeScheduleProps) => {
  const services = appointment.items.map((item) => item.name).join(" + ")
  const address = appointment.customerAddress
  const addressLabel = address?.street ? [address.street, address.numberAdress].filter(Boolean).join(", ") : null
  const isRow = layout === "row"

  return (
    <Card className={cn("p-4", isRow && "flex items-center gap-4 px-5", className)}>
        <div className="flex min-w-0 flex-1 flex-row items-center gap-3">
            <div className="size-14 shrink-0 text-[#A01F6B] bg-[#FDE7F0] flex items-center justify-center rounded-[14px] font-semibold">{timeOf(appointment.startAt)}</div>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex w-full items-center gap-1">
                    <span className="font-medium text-sm truncate">{services}</span>
                    <RegularBadge text="Confirmado"/>
                </div>
                <div className="flex gap-1 *:text-[11px] *:text-sich-label">
                    <span>{appointment.customerName}</span>
                    <span>·</span>
                    <span>{formatDuration(appointment.durationMinutes)}</span>
                </div>
                <div className="flex gap-3 *:text-[11px] *:text-sich-label">
                    <div className="flex items-center gap-1">
                        <BanknoteArrowUp className="text-sich-label size-3"/>
                        <span>{formatCurrency(appointment.totalPrice)}</span>
                    </div>
                    {addressLabel && (
                    <div className="flex items-center gap-1 min-w-0">
                        <MapPin className="text-sich-label size-3 shrink-0"/>
                        <span className="truncate">{addressLabel}</span>
                    </div>
                    )}
                </div>
            </div>
        </div>
        <Button
          className={cn("rounded-[12px] p-4 bg-white", isRow ? "shrink-0" : "w-full mt-4")}
          variant="outline"
          nativeButton={false}
          render={<Link to={appointmentPath(appointment.id)} />}>
          Ver detalhes
        </Button>
    </Card>
  )
}

export default HomeSchedule
