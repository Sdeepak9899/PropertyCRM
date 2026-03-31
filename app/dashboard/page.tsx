'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Building2, Users, TrendingUp, DollarSign, Plus } from 'lucide-react'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants'
import { mockProperties, mockLeads, mockActivities } from '@/lib/mock-data'
import { format } from 'date-fns'

const stats = [
  {
    title: 'Total Properties',
    value: mockProperties.length,
    change: '+2 this month',
    icon: Building2,
    color: 'text-blue-600',
  },
  {
    title: 'Active Leads',
    value: mockLeads.filter(l => l.status === 'active' || l.status === 'qualified').length,
    change: '+1 this week',
    icon: Users,
    color: 'text-green-600',
  },
  {
    title: 'Pipeline Value',
    value: '$5.2M',
    change: '+15% from last month',
    icon: TrendingUp,
    color: 'text-purple-600',
  },
  {
    title: 'Closed This Month',
    value: '$1.2M',
    change: '2 deals closed',
    icon: DollarSign,
    color: 'text-orange-600',
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm md:text-base text-muted-foreground">Welcome back! Here&apos;s your overview.</p>
        </div>
        <div className="flex flex-row w-full sm:w-auto gap-2">
          <Button asChild className="flex-1 sm:flex-none">
            <Link href={`${ROUTES.PROPERTIES}/new`}>
              <Plus className="mr-2 h-4 w-4 shrink-0" />
              <span className="truncate">New Property</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="flex-1 sm:flex-none">
            <Link href={`${ROUTES.LEADS}/new`}>
              <Plus className="mr-2 h-4 w-4 shrink-0" />
              <span className="truncate">New Lead</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions on properties and leads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockActivities.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex gap-3 sm:gap-4 pb-4 border-b border-border last:border-0">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-primary">
                      {activity.type[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{activity.title}</p>
                    <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(activity.date, 'MMM dd, yyyy')}
                    </p>
                  </div>
                  {activity.completed && (
                    <div className="flex items-center">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Done
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Lead Conversion</span>
                <span className="text-sm font-bold text-primary">42%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full w-[42%] bg-primary rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Active Deals</span>
                <span className="text-sm font-bold text-primary">3</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full w-[75%] bg-accent rounded-full"></div>
              </div>
            </div>
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Button asChild className="w-full" variant="outline">
                <Link href={ROUTES.PIPELINE}>View Pipeline</Link>
              </Button>
              <Button asChild className="w-full" variant="outline">
                <Link href={ROUTES.REPORTS}>View Reports</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
