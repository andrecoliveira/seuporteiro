import Image from 'next/image'

import { card, logotipo } from '@/images'

import PricingTable from './pricing-table'

export default function Page() {
  const plans = [
    {
      title: 'Plano Básico',
      description:
        'Gerencie suas reservas e dê adeus às filas grandes de maneira simples e rápida.',
      monthlyPrice: 18900,
      monthlyPriceId: 'price_1QMCZvIrMpsLhs7jiZLDAvx0',
      yearlyPrice: 189000,
      yearlyPriceId: 'price_1QMIQTIrMpsLhs7j0Ez7vERF',
      features: [{ name: 'Reserva Online' }, { name: 'Cardápio Online' }],
    },
  ]

  return (
    <div className="w-full rounded-lg bg-white p-10 shadow">
      <div className="mb-8 flex flex-col items-center justify-center space-y-10">
        <Image src={logotipo} alt="Logo" width={200} />
        <Image src={card} alt="Logo" width={200} />
        <div className="space-y-2 text-center">
          <h3 className="text-xl font-semibold">Faça sua assinatura</h3>
          <p className="text-gray-500">
            Estamos prontos para ajudá-lo a oferecer experiências incríveis aos
            seus clientes. Vamos começar?
          </p>
        </div>
      </div>
      <PricingTable plans={plans} />
    </div>
  )
}
