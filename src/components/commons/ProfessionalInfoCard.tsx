import { Star } from 'lucide-react';
import LabelLink from './LabelLink'
import Avatar from './Avatar'

const ProfessionalInfoCard = ({className, name, url}: {className?: string, url?: string, name: string}) => {    
  return (
    <div className={`bg-white shadow-sich-small-card rounded-[16px] px-3 py-4 flex gap-3 ${className || ''}`}>
      <Avatar name={name} url={url} />
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-row gap-1.5 items-center">
            <span className="font-semibold text-[14px]">{name}</span>
            <span className="font-semibold text-[9px] text-sich-magenta bg-[#FFD1E1]/80 py-0.5 px-1 rounded-full uppercase">Premium</span>
        </div>
        <span className="text-[11px] text-(--label-text)">Pé de cu ré</span>
        <div className="flex items-center justify-between gap-3">
            <div className="flex flex-row items-center gap-1 *:text-[11px]">
                <Star className="text-[#F59E0B] size-3 fill-[#F59E0B]"></Star> 
                <span className="text-[#F59E0B]">4.8</span>
                <span className="text-(--label-text)"> · Jardins</span>
            </div>
            <LabelLink label="R$95+" />
        </div>
      </div>
    </div>
  )
}

export default ProfessionalInfoCard
