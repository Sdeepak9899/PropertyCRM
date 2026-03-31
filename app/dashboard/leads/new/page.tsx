'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { leadSchema, type Lead } from '@/lib/schemas'
import { ROUTES, LEAD_STATUS, LEAD_SOURCE } from '@/lib/constants'
import type { z } from 'zod'
import { useState } from 'react'

type LeadFormData = z.infer<typeof leadSchema>

export default function NewLeadPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      status: 'new',
      source: 'website',
    },
  })

  const status = watch('status')
  const source = watch('source')

  const onSubmit = async (data: LeadFormData) => {
    setIsLoading(true)
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push(ROUTES.LEADS)
    } catch (error) {
      console.error('Failed to create lead:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Lead</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Personal Information</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    {...register('firstName')}
                    disabled={isLoading}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-destructive">{errors.firstName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    {...register('lastName')}
                    disabled={isLoading}
                  />
                  {errors.lastName && (
                    <p className="text-xs text-destructive">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register('email')}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="555-0101"
                  {...register('phone')}
                  disabled={isLoading}
                />
                {errors.phone && (
                  <p className="text-xs text-destructive">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Lead Details */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="font-semibold text-foreground">Lead Details</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Preferred Location</Label>
                  <Input
                    id="location"
                    placeholder="Portland, OR"
                    {...register('location')}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="500000"
                    {...register('budget')}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minBeds">Min Bedrooms</Label>
                  <Input
                    id="minBeds"
                    type="number"
                    min="0"
                    {...register('minBeds')}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxBeds">Max Bedrooms</Label>
                  <Input
                    id="maxBeds"
                    type="number"
                    min="0"
                    {...register('maxBeds')}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="source">Lead Source</Label>
                  <Select
                    value={source}
                    onValueChange={(value) => setValue('source', value as any)}
                  >
                    <SelectTrigger id="source">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LEAD_SOURCE.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.source && (
                    <p className="text-xs text-destructive">{errors.source.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={status}
                    onValueChange={(value) => setValue('status', value as any)}
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LEAD_STATUS.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.status && (
                    <p className="text-xs text-destructive">{errors.status.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any additional notes about this lead..."
                  rows={3}
                  {...register('notes')}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-6 border-t">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Add Lead'}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
