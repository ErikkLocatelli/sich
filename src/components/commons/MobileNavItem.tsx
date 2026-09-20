import { NavLink } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { Button } from '../ui/button'

const MobileNavItem = ({ to, icon: Icon, label }: { to: string; icon: LucideIcon; label: string }) => {
  return (
    <NavLink
        to={to}
        className='flex flex-col items-center gap-1'
    >
        {({ isActive }) => (
        <>
        <Button
          variant="ghost"
          className={`rounded-full hover:bg-primary/30 size-9 ${isActive ? 'bg-primary text-white' : ''}`}
        >
            <Icon className="size-5" />
        </Button>
        <span className={`text-[10px] ${isActive ? 'text-primary' : 'text-(--label-text)'}`}>{label}</span>
        </>
        )}
    </NavLink>
  )
}

export default MobileNavItem
