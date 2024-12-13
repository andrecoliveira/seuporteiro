// @ts-nocheck
'use client'

import { useSession } from '@/hooks/use-session'

export default function PricingTable() {
  const { session } = useSession()
  return (
    <div className="mx-auto mt-8 max-w-screen-md px-4 md:px-8">
      <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      <stripe-pricing-table
        customer-email={session.email}
        pricing-table-id="prctbl_1QRhbwIrMpsLhs7jyIq6vfuD"
        publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      />
      <p>Cancele quando quiser, de forma simples e sem burocracias.</p>
    </div>
  )
}
