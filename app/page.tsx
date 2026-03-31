'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/context'
import { ROUTES } from '@/lib/constants'
import { Spinner } from '@/components/ui/spinner'

export default function Home() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      router.push(ROUTES.DASHBOARD)
    } else {
      router.push(ROUTES.LOGIN)
    }
  }, [user, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner />
    </div>
  )
}
