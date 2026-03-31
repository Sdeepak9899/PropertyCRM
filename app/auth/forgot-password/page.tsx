'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { forgotPasswordSchema } from '@/lib/schemas'
import { ROUTES } from '@/lib/constants'
import type { z } from 'zod'

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string>('')
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      setError('')
      // API call would go here to send reset email
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitted(true)
    } catch (err) {
      setError('Failed to send reset email. Please try again.')
    }
  }

  if (submitted) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Check Your Email</h2>
          <p className="text-sm text-muted-foreground">
            We&apos;ve sent a password reset link to your email address
          </p>
        </div>

        <div className="p-4 bg-primary/10 border border-primary/20 rounded text-sm text-foreground">
          If you don&apos;t see the email in your inbox, please check your spam folder.
        </div>

        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href={ROUTES.LOGIN}>Back to Sign In</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <button onClick={() => window.location.reload()}>Send Another Email</button>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Reset Password</h2>
        <p className="text-sm text-muted-foreground">
          Enter your email address and we&apos;ll send you a link to reset your password
        </p>
      </div>

      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register('email')}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Reset Link'}
      </Button>

      <div className="text-center text-sm">
        <Link href={ROUTES.LOGIN} className="text-primary hover:underline">
          Back to Sign In
        </Link>
      </div>
    </form>
  )
}
