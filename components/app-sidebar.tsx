'use client'

import Image from 'next/image'
import * as React from 'react'

import { NavProjects } from '@/components/nav-projects'
import { NavSecondary } from '@/components/nav-secondary'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar'
import { logotipo } from '@/images'
import { LifeBuoy, NotepadText, Send, House, ChartPie } from 'lucide-react'

import { APP_ROUTES } from '@/app/constants'

const data = {
  navSecondary: [
    {
      title: 'Suporte',
      url: '#',
      icon: LifeBuoy,
    },
    {
      title: 'Feedback',
      url: '#',
      icon: Send,
    },
  ],
  projects: [
    {
      name: 'Início',
      url: '#',
      icon: House,
    },
    {
      name: 'Enquetes',
      url: APP_ROUTES.private.polls,
      icon: ChartPie,
    },
    {
      name: 'Reservas',
      url: '/painel/reservas',
      icon: NotepadText,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader className="mb-4 mt-2 flex items-center">
        <a href="#">
          <Image src={logotipo} alt="Logo" width={120} priority />
        </a>
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
