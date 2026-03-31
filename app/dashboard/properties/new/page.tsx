'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { PropertyForm } from '@/components/properties/property-form'
import { ROUTES } from '@/lib/constants'
import type { z } from 'zod'
import { propertySchema } from '@/lib/schemas'

export default function NewPropertyPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: z.infer<typeof propertySchema>) => {
    setIsLoading(true)
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push(ROUTES.PROPERTIES)
    } catch (error) {
      console.error('Failed to create property:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 p-6">
      <Card className="p-6">
        <PropertyForm onSubmit={handleSubmit} isLoading={isLoading} />
      </Card>
    </div>
  )
}
