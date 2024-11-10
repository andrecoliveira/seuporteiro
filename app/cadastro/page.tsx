import Image from 'next/image'
import Link from 'next/link'

import { SubmitButton } from '@/components/submit-button'
import { Input, Label } from '@/components/ui'
import { Progress } from '@/components/ui/progress'
import { logotipo } from '@/images'

import { APP_ROUTES } from '@/app/constants'

export default function Page() {
  return (
    <div className="flex flex-col justify-center bg-gray-100 sm:min-h-screen">
      <div className="mx-auto h-screen w-full px-4 sm:h-auto sm:px-10 md:max-w-xl">
        <div className="mb-8 mt-10 flex justify-center sm:mt-0">
          <Image src={logotipo} alt="Logo" width={300} priority />
        </div>
        <div className="mb-8 mt-10 sm:mt-0">
          <Progress value={33} />
        </div>
        <div className="w-full rounded-lg bg-white pb-2 shadow">
          <form className="space-y-6 px-4 py-6 sm:px-10 sm:py-8">
            <div className="space-y-2">
              <h4 className="text-xl font-semibold tracking-tight text-gray-700">
                Informações da loja
              </h4>
              <p className="text-sm text-gray-500">
                Preencha com os dados do seu negócio
              </p>
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">CNPJ</Label>
              <Input
                name="email"
                placeholder="00.000.000/0000-00"
                className="h-14"
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Nome da loja</Label>
              <Input
                name="email"
                placeholder="Ex: Verana Cuccina"
                className="h-14"
                required
              />
            </div>
            <div className="w-full space-y-1">
              <Label htmlFor="email">Endereço da página da loja</Label>
              <div className="flex gap-2">
                <div className="flex h-14 items-center rounded-md bg-slate-100 px-4 text-xs">
                  mesacerta.com/
                </div>
                <Input
                  name="email"
                  placeholder="Ex: veranacuccina"
                  className="h-14 w-full"
                  required
                />
              </div>
              <span className="text-sm text-gray-500">
                Este será o endereço para acessar a página de sua loja.
              </span>
            </div>
            <SubmitButton className="h-12 w-full">Continuar</SubmitButton>
          </form>
          <div className="mx-2 flex justify-center rounded-lg bg-slate-100 py-6">
            <span className="text-sm font-normal text-gray-500">
              Já tem uma conta?{' '}
              <Link
                href={APP_ROUTES.public.signIn}
                className="font-bold text-red-layout transition-colors hover:text-black"
              >
                Entrar
              </Link>
            </span>
          </div>
        </div>
        <div className="mt-6 flex flex-col justify-center text-xs font-normal text-gray-500 sm:flex-row">
          © Mesa Certa <span className="mx-2"> · </span>
          <Link href="#" className="hover:text-black">
            Política de privacidade
          </Link>
          <span className="mx-2"> · </span>
          <Link href="#" className="hover:text-black">
            Termos e condições
          </Link>
        </div>
      </div>
    </div>
  )
}
