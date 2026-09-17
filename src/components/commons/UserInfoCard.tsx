import type { LucideIcon } from "lucide-react"

interface UserInfoCardProps {
    label?: string;
    value?: string;
    icon?: LucideIcon;
}

const UserInfoCard = ({ label, value, icon: Icon }: UserInfoCardProps) => {
  return (
  <div className="flex flex-1 flex-col gap-1.5 rounded-[16px] bg-white/18 p-3 *:text-white">
        {label && 
            <div className="flex flex-row items-center gap-1">
                {Icon && <Icon className="size-3" />}
                <span className="text-[11px]">{label}</span>
            </div>
        }
        <div className="text-[18px] font-semibold ">{value}</div>
    </div>
  )
}

export default UserInfoCard
