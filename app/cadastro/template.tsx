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
            <Image src={logotipo} alt="Logo" width={300} priority />
          </div>
          {props.children}
        </div>
        <div className="hidden content-center bg-red-layout px-24 lg:block">
          <h2 className="text-4xl font-bold text-white">
            Reserve sua mesa nos melhores restaurantes
          </h2>
          <h4 className="mt-4 text-red-200">
            Encontre e garanta seu lugar nos restaurantes mais desejados da
            cidade. Descubra novas experiências gastronômicas, personalize suas
            reservas e aproveite cada momento.
          </h4>
        </div>
      </div>
    </div>
  )
}
