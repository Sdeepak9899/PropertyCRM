'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Mail, Phone, Calendar } from 'lucide-react'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants'
import { mockTeamMembers, mockDeals } from '@/lib/mock-data'
import { useParams } from 'next/navigation'

export default function TeamDetailPage() {
  const params = useParams()
  const memberId = params.id as string
  const member = mockTeamMembers.find((m) => m.id === memberId)

  if (!member) {
    return (
      <div className="space-y-6 p-6">
        <Button asChild variant="ghost" size="sm">
          <Link href={ROUTES.TEAM}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Team
          </Link>
        </Button>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">Team member not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const memberDeals = mockDeals.filter((d) => d.agentId === memberId)

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <Button asChild variant="ghost" size="sm">
        <Link href={ROUTES.TEAM}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Team
        </Link>
      </Button>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>{member.name}</CardTitle>
              <CardDescription>{member.role}</CardDescription>
            </div>
            <Badge>{member.status}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${member.email}`} className="text-sm hover:text-primary">
                  {member.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${member.phone}`} className="text-sm hover:text-primary">
                  {member.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Joined {member.joinDate}
                </span>
              </div>
            </div>
            <div className="grid gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Closed Deals</p>
                <p className="text-2xl font-bold">{member.closedDeals}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold">${member.revenue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Deals</p>
                <p className="text-2xl font-bold">{member.activePipeline}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Deals */}
      <Card>
        <CardHeader>
          <CardTitle>Active Deals</CardTitle>
        </CardHeader>
        <CardContent>
          {memberDeals.length === 0 ? (
            <p className="text-sm text-muted-foreground">No active deals</p>
          ) : (
            <div className="space-y-4">
              {memberDeals.map((deal) => (
                <div key={deal.id} className="flex items-start justify-between border-b pb-4 last:border-0">
                  <div>
                    <p className="font-medium">{deal.propertyTitle}</p>
                    <p className="text-sm text-muted-foreground">{deal.buyerName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${(deal.price / 1000000).toFixed(1)}M</p>
                    <Badge variant="outline">{deal.stage}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
