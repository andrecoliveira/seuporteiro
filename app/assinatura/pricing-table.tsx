// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
'use client'

import { useUser } from '@clerk/nextjs'

export default function PricingTable() {
  const { user } = useUser()
  return (
    <div className="mx-auto mt-8 max-w-screen-md px-4 md:px-8">
      <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      <stripe-pricing-table
        customer-email={user?.primaryEmailAddress?.emailAddress}
        pricing-table-id="prctbl_1QRhbwIrMpsLhs7jyIq6vfuD"
        publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      />
      <p>Cancele quando quiser, de forma simples e sem burocracias.</p>
    </div>
  )
}
