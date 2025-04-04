import Image from 'next/image'

import { logotipo } from '@/images'

interface Props {
  children: React.ReactNode
}

export default function Template(props: Readonly<Props>) {
  return (
    <div className="flex justify-center sm:min-h-screen">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="lg:px-18 flex flex-col justify-center space-y-4 px-6">
          <div className="mb-2 mt-12 flex justify-center px-10 sm:mt-0">
            <Image src={logotipo} alt="Logo" width={200} priority />
          </div>
          {props.children}
        </div>
        <div className="bg-primary-color hidden content-center px-24 lg:block">
          <h2 className="text-4xl font-bold text-white">
            Simplifique a gestão do seu condomínio
          </h2>
          <h4 className="mt-4 text-white">
            Organize reservas, envie comunicados, acompanhe ocorrências e
            mantenha tudo sob controle em um só lugar.
          </h4>
        </div>
      </div>
    </div>
  )
}
