import MobileNavItem from './MobileNavItem'
import { House, Search, Calendar1, Gift, User } from 'lucide-react'

import { useHideOnScroll } from '@/hooks/useHideOnScroll'

const MobileNav = () => {
  const visible = useHideOnScroll()
  
  return (
    <div className={`flex justify-around *:py-2 bg-white border-t border-sich-border fixed bottom-0 left-0 right-0 z-50 transition-transform duration-250 ${visible ? 'translate-y-0' : 'translate-y-full'}`}>
      <MobileNavItem to="/" icon={House} label="Inicio" />
      <MobileNavItem to="/search" icon={Search} label="Buscar" />
      <MobileNavItem to="/schedule" icon={Calendar1} label="Agenda" />
      <MobileNavItem to="/benefits" icon={Gift} label="Beneficios" />
      <MobileNavItem to="/profile" icon={User} label="Perfil" />
    </div>
  )
}

export default MobileNav
    