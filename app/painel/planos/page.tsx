import Image from 'next/image'

import { signOutAction } from '@/app/(auth-pages)/actions'
import { Button } from '@/components/ui'
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

const plans = [
  {
    title: 'Básico',
    describe: 'Basic features for Individuals and organizations',
    price: '59,90',
    features: [
      'Unlimited file storage',
      '10 GB bandwidth per month',
      '10.000 tasks per month',
      'Email support',
      '100 Webhooks',
    ],
    link: '#',
  },
  {
    title: 'Avançado',
    describe: 'Avanced feaures for Individuals and organizations',
    price: '259,90',
    features: [
      'Unlimited file storage',
      '10 GB bandwidth per month',
      '10.000 tasks per month',
      'Email support',
      '100 Webhooks ',
    ],
    link: '#',
  },
]

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
          <div className="mx-auto mt-8 max-w-screen-md px-4 md:px-8">
            <div className="mb-6 grid gap-6 sm:grid-cols-2 md:mb-8 lg:gap-8">
              {plans.map((plan) => (
                <div
                  key={plan.title}
                  className="relative flex flex-col rounded-lg border-2 border-red-layout p-4 pt-6"
                >
                  <div className="mb-12">
                    <div className="mb-2 text-center text-2xl font-bold">
                      {plan.title}
                    </div>

                    <p className="mx-auto mb-8 px-8 text-center text-neutral-400">
                      {plan.describe}
                    </p>

                    <div className="flex items-end justify-center gap-1">
                      <span className="self-start">R$</span>
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span>mês</span>
                    </div>

                    <div className="mt-10 space-y-2">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 text-red-layout"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-white">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto flex flex-col gap-8">
                    <Button className="h-14">Assinar</Button>
                  </div>
                </div>
              ))}
            </div>
            <p>Cancele quando quiser, de forma simples e sem burocracias.</p>
          </div>
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
