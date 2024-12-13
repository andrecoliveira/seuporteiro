import { AppSidebar } from '@/components/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { SessionProvider } from '@/hooks/use-session'

import { User } from '@supabase/supabase-js'
import { getSubscription, getTenant, getUser } from './actions'

export default async function Page({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getUser()
  const tenant = await getTenant(session.data.user?.id as string)
  const { status } = await getSubscription(tenant.stripe_id as string, 'all')
  const isActiveSubscription = status === 'active'
  return (
    <SessionProvider session={session.data.user as User}>
      {isActiveSubscription ? (
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="pb-8">
            <header className="flex h-16 shrink-0 items-center gap-2">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        Building Your Application
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="mx-6 mt-4 sm:mx-12">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      ) : (
        children
      )}
    </SessionProvider>
  )
}
