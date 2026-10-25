
import { CircleCheck } from 'lucide-react';

const ScheduleHistory = () => {
  return (
    <div className="flex items-center justify-between py-3 mt-2">
      <div className="flex items-center gap-2">
        <CircleCheck className="size-7 text-(--sich-green)" />
        <div className="flex flex-col">
            <span className="text-sm font-medium">Ana Beatriz · Manicure</span>
            <span className="text-[11px] text-sich-label">Ter, 13 Mai · 11:00</span>
        </div>
      </div>
      <span className="text-sm font-semibold text-(--sich-green)">
            R$23,34
      </span>
    </div>
  )
}

export default ScheduleHistory
