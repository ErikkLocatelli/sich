import { useContext } from 'react'
import { Link, NavLink, useMatch } from 'react-router-dom'

import type { UserData, UserDataProvider } from "../../models/userData"

import { userContext } from '../../services/userContext'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'
import SichLogo from '../../assets/icons/Sich.svg?react'
import { getNavItems, type NavItem } from './navItems'

import Avatar from '@/components/commons/Avatar'

const AppSidebarHeader = () => {
  const { state, toggleSidebar } = useSidebar()
  const isCollapsed = state === 'collapsed'

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem className="flex items-center gap-1">
          {/* Collapsed: logo expands the sidebar. Expanded: logo links to home */}
          <SidebarMenuButton
            size="lg"
            tooltip="Expandir menu"
            aria-label={isCollapsed ? 'Expandir menu' : undefined}
            className="min-w-0 flex-1 hover:bg-transparent active:bg-transparent"
            onClick={isCollapsed ? toggleSidebar : undefined}
            render={isCollapsed ? undefined : <Link to="/" />}
          >
            <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-primary shadow-sm">
              <SichLogo className="size-6!" />
            </div>
            <div className="grid flex-1 leading-tight">
              <span className="truncate text-base font-bold">SICH</span>
              <span className="truncate text-xs text-(--label-text)">Beleza onde você estiver</span>
            </div>
          </SidebarMenuButton>
          <SidebarTrigger className="group-data-[collapsible=icon]:hidden" />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}

const AppSidebarItem = ({ to, icon: Icon, label }: NavItem) => {
  const isActive = useMatch({ path: to, end: to === '/' }) !== null

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        tooltip={label}
        className="data-active:bg-primary data-active:text-primary-foreground font- data-active:hover:bg-primary/90 data-active:hover:text-primary-foreground py-5"
        render={<NavLink to={to} />}
      >
        <Icon />
        <span>{label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

const AppSiderbarFooter = ({data}: {data: UserData | UserDataProvider | null}) => (
  <SidebarFooter>
    <SidebarMenu>
      <SidebarMenuItem className="flex border-t border-sich-border pt-3 items-center">
        <Avatar
          name={data?.name || 'Usuário'}
          className="size-10 shrink-0 group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:rounded-lg group-data-[collapsible=icon]:[&_span]:text-[12px]"
        />
        <div className="ml-3 flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
          <span className="text-sm font-medium ">{data?.name || 'Usuário'}</span>
          <span className="text-xs text-(--label-text)">{data?.email || 'Email não disponível'}</span>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarFooter>
)

const AppSidebar = () => {
  const { data } = useContext(userContext)
  const navItems = getNavItems(data?.userType)

  return (
    <Sidebar collapsible="icon">
      <AppSidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-3">
              {navItems.map((item) => (
                <AppSidebarItem key={item.to} {...item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <AppSiderbarFooter data={data} />
      <SidebarRail />
    </Sidebar>
  )
}

export default AppSidebar
