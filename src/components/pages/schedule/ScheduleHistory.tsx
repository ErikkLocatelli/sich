import { Link } from 'react-router-dom';
import { CircleCheck, CircleX } from 'lucide-react';

import type { AppointmentResponse } from '@/api/schedule/appointments';
import { shortDateTime } from '@/services/schedule/agendaDates';
import { formatCurrency } from '@/services/schedule/formatters';
import { appointmentPath } from '@/services/schedule/appointmentDetails';

const ScheduleHistory = ({ appointment }: { appointment: AppointmentResponse }) => {
  const canceled = appointment.status === "CANCELED"
  const services = appointment.items.map((item) => item.name).join(" + ")

  return (
    <Link to={appointmentPath(appointment.id)} className={`flex items-center justify-between py-3 mt-2 ${canceled ? "opacity-50" : ""}`}>
      <div className="flex items-center gap-2">
        {canceled
          ? <CircleX className="size-5 shrink-0 text-sich-label" />
          : <CircleCheck className="size-5 shrink-0 text-(--sich-green)" />}
        <div className="flex flex-col">
            <span className="text-[13px] font-medium">{appointment.customerName} · {services}</span>
            <span className="text-[11px] text-sich-label">
              {shortDateTime(appointment.startAt)}{canceled && " · Cancelado"}
            </span>
        </div>
      </div>
      <span className={`text-sm font-semibold whitespace-nowrap ${canceled ? "text-sich-label line-through" : "text-(--sich-green)"}`}>
            {formatCurrency(appointment.totalPrice)}
      </span>
    </Link>
  )
}

export default ScheduleHistory
