export interface StripeCustomer {
  email: string
  legalResponsibleName: string
  tenantName: string
  userId: string
}

export const createCustomer = async (formData: StripeCustomer) => {
  const response = await fetch('/api/stripe/create-customer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  const data = await response.json()
  if (response.ok) return data
  console.error('Erro ao criar cliente:', data.error)
}

export const deleteCustomer = async (customerId: string) => {
  const response = await fetch('/api/stripe/delete-customer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customerId),
  })
  const data = await response.json()
  if (response.ok) return data
  console.error('Erro ao deletar cliente:', data.error)
}
