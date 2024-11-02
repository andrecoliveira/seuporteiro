import { SidebarProvider, SidebarTrigger, AppSidebar } from '@/components/ui'

interface TemplateProps {
  children: React.ReactNode
}

export default async function Template({ children }: TemplateProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
