import Image from 'next/image'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { logo } from '@/images'
import { CircleUser, LogOut } from 'lucide-react'
import { signOutAction } from '@/lib/supabase.actions'
import PricingTable from './pricing-table'

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-black">
      <header className="body-font text-gray-600">
        <div className="flex justify-between px-6 py-4">
          <a className="title-font mb-4 flex items-center font-medium text-gray-900 md:mb-0">
            <Image src={logo} alt="Logo" width={40} priority />
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <div className="rounded-full border-[6px] border-stone-700">
                <Avatar
                  className="h-8 w-8 bg-red-layout text-xs font-bold"
                  color="#DE4D4D"
                >
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="bottom"
              align="end"
              className="border-stone-700 bg-stone-900 text-white"
            >
              <DropdownMenuGroup>
                <DropdownMenuItem className="hover:cursor-pointer">
                  <CircleUser />
                  Perfil
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-stone-700" />
              <DropdownMenuItem
                className="hover:cursor-pointer"
                onClick={signOutAction}
              >
                <LogOut />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="px-6 text-white">
        <div
          id="banner"
          className="rounded-t-md bg-gradient-to-r from-red-layout to-blue-500 px-6 py-12 text-center"
        >
          <h2 className="text-3xl font-extrabold drop-shadow-md">
            Pronto para atrair mais clientes para seu restaurante?
          </h2>
          <p className="mt-6 text-lg">
            Personalize sua página, acompanhe reservas em tempo real e ofereça
            uma experiência ainda melhor aos seus clientes.
          </p>
        </div>
        <div
          id="content"
          className="rounded-b-md bg-neutral-900 p-8 text-center"
        >
          <h2 className="text-2xl font-extrabold drop-shadow-md">
            Escolha o melhor plano para o seu negócio
          </h2>
          <p>Assine agora e comece a aproveitar todos os benefícios!</p>
          <PricingTable />
        </div>
      </main>
      <footer className="text-gray-600">
        <div className="flex justify-center py-8">
          <span className="mt-4 text-sm text-gray-500 sm:ml-4 sm:mt-0 sm:py-2 sm:pl-4">
            © 2025 Mesa Certa
          </span>
        </div>
      </footer>
    </div>
  )
}
