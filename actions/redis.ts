'use server'

import { redis } from '@/lib/upstash'

export async function setRedis(key: string, value: string | number) {
  await redis.set(key, value)
}
