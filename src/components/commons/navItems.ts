import { House, Search, Calendar1, Gift, User, ChartColumn, Banknote } from 'lucide-react'
import Nails from '../../assets/icons/nails.svg?react'

export type NavIcon = React.ElementType<{ className?: string }>

export type NavItem = {
  to: string
  icon: NavIcon
  label: string
}

const customerNavItems: NavItem[] = [
  { to: '/', icon: House, label: 'Inicio' },
  { to: '/search', icon: Search, label: 'Buscar' },
  { to: '/schedule', icon: Calendar1, label: 'Agenda' },
  { to: '/benefits', icon: Gift, label: 'Beneficios' },
  { to: '/profile', icon: User, label: 'Perfil' },
]

const providerNavItems: NavItem[] = [
  { to: '/', icon: ChartColumn, label: 'Painel' },
  { to: '/schedule', icon: Calendar1, label: 'Agenda' },
  { to: '/products', icon: Nails, label: 'Produtos' },
  { to: '/financial', icon: Banknote, label: 'Financeiro' },
  { to: '/profile', icon: User, label: 'Perfil' },
]

export function getNavItems(userType?: string): NavItem[] {
  return userType === 'CUSTOMER' ? customerNavItems : providerNavItems
}
