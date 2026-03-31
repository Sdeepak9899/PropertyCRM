'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signupSchema } from '@/lib/schemas'
import { useAuth } from '@/lib/context'
import { ROUTES } from '@/lib/constants'
import type { z } from 'zod'

type SignupForm = z.infer<typeof signupSchema>

export default function SignupPage() {
  const router = useRouter()
  const { signup } = useAuth()
  const [error, setError] = useState<string>('')
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupForm) => {
    try {
      setError('')
      await signup(data.email, data.name, data.password)
      router.push(ROUTES.DASHBOARD)
    } catch (err) {
      setError('Failed to create account. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Get Started</h2>
        <p className="text-sm text-muted-foreground">Create your account to access RealtyCRM</p>
      </div>

      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="John Doe"
          {...register('name')}
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

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

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register('password')}
          disabled={isSubmitting}
        />
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          {...register('confirmPassword')}
          disabled={isSubmitting}
        />
        {errors.confirmPassword && (
          <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating account...' : 'Create Account'}
      </Button>

      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link href={ROUTES.LOGIN} className="text-primary hover:underline font-medium">
          Sign in
        </Link>
      </div>
    </form>
  )
}
