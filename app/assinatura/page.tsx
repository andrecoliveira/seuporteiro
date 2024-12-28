import Image from 'next/image'

import { listPrices } from '@/actions/list-prices'
import { listProducts } from '@/actions/list-products'
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
import { SignOutButton } from '@clerk/nextjs'
import { CircleUser, LogOut } from 'lucide-react'

import PricingTable from './pricing-table'

export default async function PlansPage() {
  const products = await listProducts()
  const prices = await listPrices()

  const basicPlan = prices.filter((price) => price.product === products[0].id)
  const premiumPlan = prices.filter((price) => price.product === products[1].id)

  console.log(basicPlan)

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
              <SignOutButton>
                <DropdownMenuItem className="hover:cursor-pointer">
                  <LogOut />
                  Sair
                </DropdownMenuItem>
              </SignOutButton>
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
          <PricingTable
            plans={[
              {
                title: products[0].name,
                description: products[0].description,
                monthlyPrice: basicPlan[1].unit_amount,
                monthlyPriceId: basicPlan[1].id,
                yearlyPrice: basicPlan[0].unit_amount,
                yearlyPriceId: basicPlan[0].id,
                features: products[0].marketing_features,
              },
              {
                title: products[1].name,
                description: products[1].description,
                monthlyPrice: premiumPlan[1].unit_amount,
                monthlyPriceId: premiumPlan[1].id,
                yearlyPrice: premiumPlan[0].unit_amount,
                yearlyPriceId: premiumPlan[0].id,
                features: products[1].marketing_features,
              },
            ]}
          />
          <p>Cancele quando quiser, de forma simples e sem burocracias.</p>
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
