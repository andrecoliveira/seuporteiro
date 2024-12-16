import { NextResponse } from 'next/server'

import stripe from '@/lib/stripe'
import { z } from 'zod'

import { createClient } from '@/utils/supabase/server'

const RegistrationSchema = z.object({
  cnpj: z.string(),
  pathname: z.string(),
  name: z.string(),
  email: z.string().email(),
  legalResponsibleName: z.string(),
  otpCode: z.string(),
})

export async function POST(req: Request) {
  const supabase = await createClient()

  try {
    const { otpCode, email, name, pathname, cnpj, legalResponsibleName } =
      await req.json()

    // Validação dos dados recebidos
    const parseResult = RegistrationSchema.safeParse({
      otpCode,
      email,
      name,
      pathname,
      cnpj,
      legalResponsibleName,
    })

    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'invalid_data', details: parseResult.error.errors },
        { status: 400 },
      )
    }

    // **1. Verificar o OTP**
    const { data: otpResponse, error: otpError } =
      await supabase.auth.verifyOtp({
        email,
        token: otpCode,
        type: 'email',
      })

    if (otpError || !otpResponse.user) {
      return NextResponse.json({ error: 'otp_code_invalid' }, { status: 400 })
    }

    const supabaseUserId = otpResponse.user.id

    // **2. Criar cliente no Stripe**
    const stripeCustomer = await stripe.customers.create({
      name: legalResponsibleName,
      email,
      description: 'Cadastrado por Mesa Certa',
      preferred_locales: ['pt-BR'],
      metadata: { user_id: supabaseUserId, tenant_name: name },
    })

    // **3. Inserir Tenant**
    const { data: tenant, error: tenantError } = await supabase
      .from('tenant')
      .insert({
        name,
        pathname,
        cnpj,
        stripe_id: stripeCustomer.id,
      })
      .select()

    if (tenantError || !tenant) {
      throw new Error('Erro ao criar Tenant.')
    }

    const tenantId = tenant[0].id

    // **4. Inserir Usuário**
    const { error: userError } = await supabase.from('user').insert({
      id: supabaseUserId,
      full_name: legalResponsibleName,
      contact_email: email,
      tenant_id: tenantId,
      role: 'owner',
    })

    if (userError) {
      throw new Error('Erro ao criar Usuário.')
    }

    // **5. Inserir TenantMember**
    const { error: tenantMemberError } = await supabase
      .from('tenant_members')
      .insert({
        tenant_id: tenantId,
        user_id: supabaseUserId,
        role: 'owner',
      })

    if (tenantMemberError) {
      throw new Error('Erro ao criar Tenant Member.')
    }

    return NextResponse.json(
      { message: 'Cadastro concluído com sucesso!' },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 },
    )
  }
}
