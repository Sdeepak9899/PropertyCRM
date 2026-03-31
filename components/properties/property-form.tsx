'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { propertySchema, type Property } from '@/lib/schemas'
import { PROPERTY_STATUS, PROPERTY_TYPES } from '@/lib/constants'
import type { z } from 'zod'

type PropertyFormData = z.infer<typeof propertySchema>

interface PropertyFormProps {
  initialData?: Property
  onSubmit: (data: PropertyFormData) => void
  isLoading?: boolean
}

export function PropertyForm({ initialData, onSubmit, isLoading = false }: PropertyFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: initialData,
  })

  const status = watch('status')
  const propertyType = watch('propertyType')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          {initialData ? 'Edit Property' : 'Add New Property'}
        </h2>
        <p className="text-muted-foreground mt-1">
          {initialData ? 'Update property details' : 'Fill in the details to list a new property'}
        </p>
      </div>

      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Basic Information</h3>

        <div className="space-y-2">
          <Label htmlFor="title">Property Title</Label>
          <Input
            id="title"
            placeholder="Modern Downtown Penthouse"
            {...register('title')}
            disabled={isLoading}
          />
          {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="propertyType">Property Type</Label>
            <Select
              value={propertyType}
              onValueChange={(value) => setValue('propertyType', value as any)}
            >
              <SelectTrigger id="propertyType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PROPERTY_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.propertyType && (
              <p className="text-xs text-destructive">{errors.propertyType.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(value) => setValue('status', value as any)}>
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PROPERTY_STATUS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.status && <p className="text-xs text-destructive">{errors.status.message}</p>}
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Location</h3>

        <div className="space-y-2">
          <Label htmlFor="address">Street Address</Label>
          <Input
            id="address"
            placeholder="456 Park Avenue"
            {...register('address')}
            disabled={isLoading}
          />
          {errors.address && <p className="text-xs text-destructive">{errors.address.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="New York"
              {...register('city')}
              disabled={isLoading}
            />
            {errors.city && <p className="text-xs text-destructive">{errors.city.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                placeholder="NY"
                maxLength={2}
                {...register('state')}
                disabled={isLoading}
              />
              {errors.state && <p className="text-xs text-destructive">{errors.state.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP Code</Label>
              <Input
                id="zip"
                placeholder="10022"
                {...register('zip')}
                disabled={isLoading}
              />
              {errors.zip && <p className="text-xs text-destructive">{errors.zip.message}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Property Details</h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="beds">Bedrooms</Label>
            <Input
              id="beds"
              type="number"
              min="0"
              {...register('beds')}
              disabled={isLoading}
            />
            {errors.beds && <p className="text-xs text-destructive">{errors.beds.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="baths">Bathrooms</Label>
            <Input
              id="baths"
              type="number"
              step="0.5"
              min="0"
              {...register('baths')}
              disabled={isLoading}
            />
            {errors.baths && <p className="text-xs text-destructive">{errors.baths.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="sqft">Square Footage</Label>
            <Input
              id="sqft"
              type="number"
              placeholder="2400"
              {...register('sqft')}
              disabled={isLoading}
            />
            {errors.sqft && <p className="text-xs text-destructive">{errors.sqft.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              placeholder="2500000"
              {...register('price')}
              disabled={isLoading}
            />
            {errors.price && <p className="text-xs text-destructive">{errors.price.message}</p>}
          </div>
        </div>
      </div>

      {/* Description & Features */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Additional Information</h3>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the property, its features, and highlights..."
            rows={4}
            {...register('description')}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="features">Features (comma-separated)</Label>
          <Textarea
            id="features"
            placeholder="Pool access, Doorman, Fitness center, Modern kitchen..."
            rows={2}
            {...register('features')}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : initialData ? 'Update Property' : 'Add Property'}
        </Button>
        <Button type="button" variant="outline" disabled={isLoading}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
