'use client'

import { Skeleton } from '@/components/ui/skeleton'

import useRecoveryPasswordModel from './recovery-password.model'
import RecoveryPasswordPage from './recovery-password.view'

export default function Page() {
  const methods = useRecoveryPasswordModel()
  if (methods?.successfulCreation === undefined)
    return (
      <div className="w-full p-10">
        <div className="space-y-2">
          <Skeleton className="h-4" />
          <Skeleton className="h-8" />
        </div>
        <div className="mt-6 space-y-4">
          <Skeleton className="h-4" />
          <Skeleton className="h-14" />
        </div>
        <Skeleton className="mt-6 h-14" />
      </div>
    )
  return <RecoveryPasswordPage {...methods} />
}
