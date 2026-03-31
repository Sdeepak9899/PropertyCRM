'use client'

import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Mail, Phone, MapPin, DollarSign, Edit2 } from 'lucide-react'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants'
import { mockLeads, mockDeals, mockActivities, mockRequirements } from '@/lib/mock-data'
import { format } from 'date-fns'

const statusColors = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-purple-100 text-purple-800',
  qualified: 'bg-green-100 text-green-800',
  active: 'bg-orange-100 text-orange-800',
  closed: 'bg-gray-100 text-gray-800',
}

export default function LeadDetailPage() {
  const params = useParams()
  const lead = mockLeads.find(l => l.id === params.id)
  const deals = mockDeals.filter(d => d.leadId === params.id)
  const requirement = mockRequirements.find(r => r.leadId === params.id)
  const activities = mockActivities.filter(a => a.leadId === params.id)

  if (!lead) {
    return (
      <div className="space-y-6 p-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-2">Lead not found</h1>
          <Button asChild>
            <Link href={ROUTES.LEADS}>Back to Leads</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {lead.firstName} {lead.lastName}
          </h1>
          <Badge className={statusColors[lead.status]} className="mt-2">
            {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
          </Badge>
        </div>
        <Button variant="outline" size="icon">
          <Edit2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
                  {lead.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <a href={`tel:${lead.phone}`} className="text-primary hover:underline">
                  {lead.phone}
                </a>
              </div>
              {lead.location && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span>{lead.location}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Requirements */}
          {requirement && (
            <Card>
              <CardHeader>
                <CardTitle>Property Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  {requirement.minPrice && (
                    <div>
                      <p className="text-sm text-muted-foreground">Min Budget</p>
                      <p className="font-semibold">${(requirement.minPrice / 1000000).toFixed(1)}M</p>
                    </div>
                  )}
                  {requirement.maxPrice && (
                    <div>
                      <p className="text-sm text-muted-foreground">Max Budget</p>
                      <p className="font-semibold">${(requirement.maxPrice / 1000000).toFixed(1)}M</p>
                    </div>
                  )}
                  {requirement.minBeds && (
                    <div>
                      <p className="text-sm text-muted-foreground">Min Beds</p>
                      <p className="font-semibold">{requirement.minBeds}</p>
                    </div>
                  )}
                  {requirement.maxBeds && (
                    <div>
                      <p className="text-sm text-muted-foreground">Max Beds</p>
                      <p className="font-semibold">{requirement.maxBeds}</p>
                    </div>
                  )}
                </div>
                {requirement.propertyTypes && (
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
              </CardContent>
            </Card>
          )}

          {/* Associated Deals */}
          {deals.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Deals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {deals.map((deal) => (
                    <div key={deal.id} className="flex items-center justify-between p-3 border border-border rounded">
                      <div>
                        <p className="font-medium">Deal #{deal.id}</p>
                        <p className="text-sm text-muted-foreground">{deal.stage}</p>
                      </div>
                      <Badge variant="outline">{deal.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Activity Timeline */}
          {activities.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex gap-4 pb-4 border-b border-border last:border-0">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-primary">
                          {activity.type[0].toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(activity.date, 'MMM dd, yyyy HH:mm')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Budget Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Budget</CardTitle>
            </CardHeader>
            <CardContent>
              {lead.budget ? (
                <>
                  <div className="text-3xl font-bold text-primary">
                    ${(lead.budget / 1000000).toFixed(1)}M
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Estimated budget</p>
                </>
              ) : (
                <p className="text-muted-foreground">No budget specified</p>
              )}
            </CardContent>
          </Card>

          {/* Lead Source */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Lead Source</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="outline" className="capitalize">
                {lead.source}
              </Badge>
            </CardContent>
          </Card>

          {/* Notes */}
          {lead.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{lead.notes}</p>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline">
                Send Email
              </Button>
              <Button className="w-full" variant="outline">
                Schedule Call
              </Button>
              <Button className="w-full" variant="outline">
                Create Deal
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
