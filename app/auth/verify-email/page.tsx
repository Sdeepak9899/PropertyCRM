'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants'

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="space-y-6 text-center text-sm text-muted-foreground">Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  )
}

function VerifyEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const [verifying, setVerifying] = useState(true)
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    if (!email) {
      setVerifying(false)
      return
    }

    // Simulate verification process
    const timer = setTimeout(() => {
      setVerifying(false)
      setVerified(true)
      // Redirect to login after 3 seconds
      setTimeout(() => router.push(ROUTES.LOGIN), 3000)
    }, 2000)

    return () => clearTimeout(timer)
  }, [email, router])

  if (verifying) {
    return (
      <div className="space-y-6 text-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Verifying Email</h2>
          <p className="text-sm text-muted-foreground">
            Please wait while we verify your email address
          </p>
        </div>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
        </div>
      </div>
    )
  }

  if (verified) {
    return (
      <div className="space-y-6 text-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Email Verified</h2>
          <p className="text-sm text-muted-foreground">
            Your email has been successfully verified
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          Redirecting to sign in page...
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6 text-center">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Verify Your Email</h2>
        <p className="text-sm text-muted-foreground">
          {email ? `We sent a verification link to ${email}` : 'No email provided'}
        </p>
      </div>

      <div className="p-4 bg-primary/10 border border-primary/20 rounded text-sm text-foreground">
        Please check your email and click the verification link
      </div>

      <div className="space-y-3">
        <Button asChild className="w-full">
          <Link href={ROUTES.LOGIN}>Back to Sign In</Link>
        </Button>
      </div>
    </div>
  )
}
