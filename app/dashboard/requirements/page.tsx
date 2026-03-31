'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DollarSign, Home, MapPin, Zap, Edit2 } from 'lucide-react'
import { mockRequirements, mockLeads } from '@/lib/mock-data'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants'
import { format } from 'date-fns'

const urgencyColors = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
}

export default function RequirementsPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Buyer Requirements</h1>
        <p className="text-muted-foreground">Manage buyer preferences and property matching</p>
      </div>

      {/* Requirements Grid */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {mockRequirements.map((requirement) => {
          const lead = mockLeads.find(l => l.id === requirement.leadId)
          if (!lead) return null

          return (
            <Card key={requirement.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {lead.firstName} {lead.lastName}
                    </CardTitle>
                    <CardDescription className="mt-1">{lead.email}</CardDescription>
                  </div>
                  {requirement.urgency && (
                    <Badge className={urgencyColors[requirement.urgency]}>
                      {requirement.urgency.charAt(0).toUpperCase() + requirement.urgency.slice(1)}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Budget */}
                {(requirement.minPrice || requirement.maxPrice) && (
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Budget Range</p>
                      <p className="font-semibold">
                        ${requirement.minPrice ? (requirement.minPrice / 1000000).toFixed(1) : '0'}M - ${requirement.maxPrice ? (requirement.maxPrice / 1000000).toFixed(1) : '0'}M
                      </p>
                    </div>
                  </div>
                )}

                {/* Bedrooms */}
                {(requirement.minBeds || requirement.maxBeds) && (
                  <div className="flex items-center gap-3">
                    <Home className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Bedrooms</p>
                      <p className="font-semibold">
                        {requirement.minBeds || 0} - {requirement.maxBeds || 'Any'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Location */}
                {requirement.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Preferred Location</p>
                      <p className="font-semibold">{requirement.location}</p>
                    </div>
                  </div>
                )}

                {/* Move In Date */}
                {requirement.moveInDate && (
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Move-In Date</p>
                      <p className="font-semibold">
                        {format(requirement.moveInDate, 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                )}

                {/* Property Types */}
                {requirement.propertyTypes && requirement.propertyTypes.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Property Types</p>
                    <div className="flex flex-wrap gap-2">
                      {requirement.propertyTypes.map((type) => (
                        <Badge key={type} variant="outline">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                {requirement.features && requirement.features.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Desired Features</p>
                    <div className="flex flex-wrap gap-2">
                      {requirement.features.map((feature) => (
                        <Badge key={feature} variant="secondary">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button asChild className="flex-1" size="sm">
                    <Link href={`${ROUTES.SEARCH}?leadId=${requirement.leadId}`}>
                      Find Matches
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {mockRequirements.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No requirements yet</p>
            <Button asChild>
              <Link href={ROUTES.LEADS}>Create a lead first</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
