'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { SignOutButton } from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs'
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CircleUser,
  LogOut,
} from 'lucide-react'

export function NavUser() {
  const { isMobile } = useSidebar()
  const { user } = useUser()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {user?.firstName}
                </span>
                <span className="truncate text-xs">
                  {user?.primaryEmailAddress?.emailAddress}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:cursor-pointer">
                <CircleUser />
                Perfil
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:cursor-pointer">
                <BadgeCheck />
                Plano
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:cursor-pointer">
                <Bell />
                Notificações
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <SignOutButton>
              <DropdownMenuItem className="hover:cursor-pointer">
                <LogOut />
                Sair
              </DropdownMenuItem>
            </SignOutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
