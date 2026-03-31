'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Building2, MapPin, DollarSign, Home, Bath, Maximize2, Edit2, Trash2 } from 'lucide-react'
import { mockProperties } from '@/lib/mock-data'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants'

export default function PropertyDetailPage() {
  const params = useParams()
  const property = mockProperties.find(p => p.id === params.id)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  if (!property) {
    return (
      <div className="space-y-6 p-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-2">Property not found</h1>
          <p className="text-muted-foreground mb-4">The property you&apos;re looking for doesn&apos;t exist</p>
          <Button asChild>
            <Link href={ROUTES.PROPERTIES}>Back to Properties</Link>
          </Button>
        </div>
      </div>
    )
  }

  const statusColors = {
    available: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    sold: 'bg-gray-100 text-gray-800',
    archived: 'bg-red-100 text-red-800',
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{property.title}</h1>
          <div className="flex items-center gap-2 mt-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {property.address}, {property.city}, {property.state} {property.zip}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="text-destructive hover:text-destructive"
            onClick={() => setShowDeleteConfirm(true)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image */}
          <Card>
            <CardContent className="p-0">
              <div className="relative h-96 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">
                {property.imageUrl ? (
                  <img
                    src={property.imageUrl}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Building2 className="h-24 w-24 text-primary/30" />
                )}
              </div>
            </CardContent>
          </Card>

          {/* Details */}
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Home className="h-4 w-4" />
                    <span className="text-sm">Bedrooms</span>
                  </div>
                  <p className="text-2xl font-bold">{property.beds}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Bath className="h-4 w-4" />
                    <span className="text-sm">Bathrooms</span>
                  </div>
                  <p className="text-2xl font-bold">{property.baths}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Maximize2 className="h-4 w-4" />
                    <span className="text-sm">Square Feet</span>
                  </div>
                  <p className="text-2xl font-bold">{(property.sqft / 1000).toFixed(1)}k</p>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Type</div>
                  <p className="text-2xl font-bold">{property.propertyType}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          {property.description && (
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{property.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Features */}
          {property.features && (
            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {property.features.split(', ').map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Price Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary mb-2">
                ${(property.price / 1000000).toFixed(2)}M
              </div>
              <p className="text-sm text-muted-foreground">
                ${(property.price / property.sqft).toFixed(0)}/sqft
              </p>
            </CardContent>
          </Card>

          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className={`${statusColors[property.status]}`}>
                {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
              </Badge>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline">
                Share Listing
              </Button>
              <Button className="w-full" variant="outline">
                Add to Featured
              </Button>
              <Button className="w-full" variant="outline">
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Delete Property</CardTitle>
              <CardDescription>
                Are you sure you want to delete this property? This action cannot be undone.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </Button>
                <Button className="flex-1 bg-destructive hover:bg-destructive/90">
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
