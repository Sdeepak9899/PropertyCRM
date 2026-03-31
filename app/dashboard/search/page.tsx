'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Search as SearchIcon } from 'lucide-react'
import { mockProperties } from '@/lib/mock-data'
import { PropertyCard } from '@/components/properties/property-card'
import { PROPERTY_TYPES } from '@/lib/constants'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const leadId = searchParams.get('leadId')

  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [location, setLocation] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [minBeds, setMinBeds] = useState('')
  const [maxBeds, setMaxBeds] = useState('')

  const filtered = mockProperties.filter((property) => {
    const priceInRange =
      (!minPrice || property.price >= Number(minPrice)) &&
      (!maxPrice || property.price <= Number(maxPrice))
    const locationMatch =
      !location || property.city.toLowerCase().includes(location.toLowerCase())
    const typeMatch = !propertyType || property.propertyType === propertyType
    const bedsMatch =
      (!minBeds || property.beds >= Number(minBeds)) &&
      (!maxBeds || property.beds <= Number(maxBeds))
    return priceInRange && locationMatch && typeMatch && bedsMatch
  })

  const handleClearFilters = () => {
    setMinPrice('')
    setMaxPrice('')
    setLocation('')
    setPropertyType('')
    setMinBeds('')
    setMaxBeds('')
  }

  const hasFilters = minPrice || maxPrice || location || propertyType || minBeds || maxBeds

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Property Search</h1>
        <p className="text-muted-foreground">Find properties that match buyer requirements</p>
      </div>

      {/* Search Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SearchIcon className="h-5 w-5" />
            Search Criteria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="City name"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Property Type</Label>
              <Select value={propertyType || 'all'} onValueChange={(val) => setPropertyType(val === 'all' ? '' : val)}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {PROPERTY_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="minPrice">Min Price</Label>
              <Input
                id="minPrice"
                type="number"
                placeholder="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxPrice">Max Price</Label>
              <Input
                id="maxPrice"
                type="number"
                placeholder="No limit"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="minBeds">Min Beds</Label>
              <Input
                id="minBeds"
                type="number"
                min="0"
                value={minBeds}
                onChange={(e) => setMinBeds(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxBeds">Max Beds</Label>
              <Input
                id="maxBeds"
                type="number"
                min="0"
                value={maxBeds}
                onChange={(e) => setMaxBeds(e.target.value)}
              />
            </div>

            {hasFilters && (
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="self-end"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">
            {filtered.length > 0
              ? `Found ${filtered.length} propert${filtered.length !== 1 ? 'ies' : 'y'}`
              : 'No properties found'}
          </h2>
          {leadId && (
            <Badge variant="outline">
              Matching Lead #<span className="font-bold">{leadId}</span>
            </Badge>
          )}
        </div>

        {filtered.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">No properties match your criteria</p>
              <Button variant="outline" onClick={handleClearFilters}>
                Clear Filters and Try Again
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
