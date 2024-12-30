'use client'

import { useState } from 'react'

import { createCheckout } from '@/actions/create-checkout'
import { SubmitButton } from '@/components/submit-button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useUser } from '@clerk/nextjs'
import { CircleCheck } from 'lucide-react'

import { formatCurrency } from '@/utils/formatCurrency'

interface Plan {
  title: string
  description: string | null
  monthlyPrice: number | null
  monthlyPriceId: string
  yearlyPrice: number | null
  yearlyPriceId: string
  features: { name?: string }[]
}

interface Props {
  plans: Plan[]
}

function PlanCard({
  plan,
  isYearly,
  onSubscribe,
  isLoading,
}: {
  plan: Plan
  isYearly: boolean
  onSubscribe: () => void
  isLoading: boolean
}) {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice
  const period = isYearly ? 'ano' : 'mês'

  return (
    <div className="relative flex h-full flex-col overflow-hidden lg:p-6">
      <h2 className="mb-4 text-left text-xl font-medium">{plan.title}</h2>
      <p className="text-md text-left text-stone-400 lg:min-h-28">
        {plan.description}
      </p>

      {price && (
        <h1 className="mt-8 flex items-end lg:mt-0">
          <span className="text-3xl font-extrabold text-white">
            {formatCurrency(price)}
          </span>
          <span className="text-md ml-2 font-normal text-stone-400">
            por {period}
          </span>
        </h1>
      )}

      <SubmitButton
        className="mb-4 mt-8"
        style={{ padding: '24px 12px' }}
        onClick={onSubscribe}
        isLoading={isLoading}
      >
        Assinar
      </SubmitButton>

      <p className="my-2 text-left">Inclui:</p>
      {plan.features.map((feature) => (
        <p className="mb-2 flex items-center text-gray-300" key={feature.name}>
          <CircleCheck color="#DE4D4D" className="mr-2" />
          {feature.name}
        </p>
      ))}
    </div>
  )
}

export default function PricingTable({ plans }: Props) {
  const { user } = useUser()
  const [isYearly, setIsYearly] = useState(false)
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null)

  const handleSubscribe = async (priceId: string) => {
    setLoadingPriceId(priceId)
    try {
      const response = await createCheckout({
        customerEmail: user?.primaryEmailAddress?.emailAddress || '',
        priceId,
        userId: user?.id || '',
      })
      if (response) window.location.href = response
    } finally {
      setLoadingPriceId(null)
    }
  }

  return (
    <>
      <Tabs
        defaultValue="0"
        className="my-8"
        onValueChange={(v) => setIsYearly(v === '1')}
      >
        <TabsList className="mb-4 h-12 bg-stone-700">
          <TabsTrigger value="0" className="h-10">
            Mensalmente
          </TabsTrigger>
          <TabsTrigger value="1" className="h-10">
            Anualmente
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <section className="flex lg:justify-center">
        <div className="grid grid-cols-1 gap-14 lg:w-6/12 lg:grid-cols-2 lg:gap-2">
          {plans.map((plan) => {
            const currentPriceId = isYearly
              ? plan.yearlyPriceId
              : plan.monthlyPriceId

            return (
              <PlanCard
                key={plan.title}
                plan={plan}
                isYearly={isYearly}
                onSubscribe={() => handleSubscribe(currentPriceId)}
                isLoading={loadingPriceId === currentPriceId}
              />
            )
          })}
        </div>
      </section>
    </>
  )
}
