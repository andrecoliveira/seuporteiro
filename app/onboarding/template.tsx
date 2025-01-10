import { Button } from '@/components/ui'
import { SignOutButton } from '@clerk/nextjs'

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center bg-gray-100 py-12 sm:min-h-screen">
      <div className="mx-auto h-screen w-full px-4 sm:h-auto sm:px-10 md:max-w-xl">
        {children}
        <SignOutButton>
          <Button variant={'outline'} className="mt-8 h-12 w-full">
            Sair
          </Button>
        </SignOutButton>
      </div>
    </div>
  )
}
