import { useContext } from 'react'

import { userContext } from '../../services/userContext'
import { useHideOnScroll } from '@/hooks/useHideOnScroll'

import MobileNavItem from './MobileNavItem'
import { House, Search, Calendar1, Gift, User, ChartColumn, DollarSign } from 'lucide-react'
import Nails from '../../assets/icons/nails.svg?react'

const MobileNav = () => {  
  const visible = useHideOnScroll()
  const { data } = useContext(userContext)
  const { userType } = data || {}
  
  return (
    <div className={`flex justify-around *:py-2 bg-white border-t border-sich-border fixed bottom-0 left-0 right-0 z-50 transition-transform duration-250 ${visible ? 'translate-y-0' : 'translate-y-full'}`}>
      {userType === 'CUSTOMER' ? (
        <>
          <MobileNavItem to="/" icon={House} label="Inicio" />
          <MobileNavItem to="/search" icon={Search} label="Buscar" />
          <MobileNavItem to="/schedule" icon={Calendar1} label="Agenda" />
          <MobileNavItem to="/benefits" icon={Gift} label="Beneficios" />
          <MobileNavItem to="/profile" icon={User} label="Perfil" />
        </> 
      ) : 
        <>
          <MobileNavItem to="/" icon={ChartColumn} label="Painel" />
          <MobileNavItem to="/schedule" icon={Calendar1} label="Agenda" />
          <MobileNavItem to="/services" icon={Nails} label="Serviços" />
          <MobileNavItem to="/financial" icon={DollarSign} label="Financeiro" />
          <MobileNavItem to="/profile" icon={User} label="Perfil" />
        </>
      }
    </div>
  )
}

export default MobileNav
    