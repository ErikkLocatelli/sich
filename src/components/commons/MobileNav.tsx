import { useContext } from 'react'

import { userContext } from '../../services/userContext'
import { useHideOnScroll } from '@/hooks/useHideOnScroll'

import MobileNavItem from './MobileNavItem'
import { getNavItems } from './navItems'

const MobileNav = () => {
  const visible = useHideOnScroll()
  const { data } = useContext(userContext)
  const navItems = getNavItems(data?.userType)

  return (
    <div className={`flex justify-around *:py-2 bg-white border-t border-sich-border fixed bottom-0 left-0 right-0 z-50 transition-transform duration-250 ${visible ? 'translate-y-0' : 'translate-y-full'}`}>
      {navItems.map((item) => (
        <MobileNavItem key={item.to} {...item} />
      ))}
    </div>
  )
}

export default MobileNav
