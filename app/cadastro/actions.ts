'use server'

import type { PostgrestError } from '@supabase/supabase-js'

import { createClient } from '@/utils/supabase/server'

type VerifyAlreadyExistsParams = {
  table: string
  select: string
  query: string
}

type VerifyAlreadyExistsResponse<T> = {
  data: T | null
  error: PostgrestError | null
}

export const queryDatabase = async <T extends Record<string, unknown>>(
  params: VerifyAlreadyExistsParams,
): Promise<VerifyAlreadyExistsResponse<T>> => {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from(params.table)
      .select(params.select)
      .or(params.query)
      .single()

    return {
      data: data as T | null,
      error,
    }
  } catch (err) {
    return {
      data: null,
      error: err as PostgrestError,
    }
  }
}
