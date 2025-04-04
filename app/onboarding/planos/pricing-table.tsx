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
}: Readonly<{
  plan: Plan
  isYearly: boolean
  onSubscribe: () => void
  isLoading: boolean
}>) {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice
  const period = isYearly ? 'ano' : 'mês'

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-lg bg-gray-100 lg:p-6">
      <h2 className="mb-4 text-left text-lg font-medium">{plan.title}</h2>
      <p className="text-md mb-6 text-left text-gray-500">{plan.description}</p>

      {price && (
        <h1 className="mt-8 flex items-end lg:mt-0">
          <span className="text-2xl font-extrabold">
            {formatCurrency(price)}
          </span>
          <span className="text-md ml-2 font-normal text-gray-500">
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
        <p
          className="mb-2 flex items-center text-sm text-gray-500"
          key={feature.name}
        >
          <CircleCheck color="#395BB0" className="mr-1 h-4" />
          {feature.name}
        </p>
      ))}
    </div>
  )
}

export default function PricingTable({ plans }: Readonly<Props>) {
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
      <div className="flex justify-center">
        <Tabs defaultValue="0" onValueChange={(v) => setIsYearly(v === '1')}>
          <TabsList className="mb-4 h-12 bg-gray-100">
            <TabsTrigger value="0" className="h-10">
              Mensalmente
            </TabsTrigger>
            <TabsTrigger value="1" className="h-10">
              Anualmente
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <section className="space-y-4">
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
      </section>
    </>
  )
}
