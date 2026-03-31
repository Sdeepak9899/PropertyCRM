'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Plus, Phone, Mail, Calendar, CheckCircle2, Circle } from 'lucide-react'
import { ACTIVITY_TYPES } from '@/lib/constants'
import { mockActivities } from '@/lib/mock-data'
import { format } from 'date-fns'

const typeColors = {
  call: 'text-blue-600',
  email: 'text-green-600',
  meeting: 'text-purple-600',
  showing: 'text-orange-600',
  task: 'text-yellow-600',
  note: 'text-gray-600',
}

const typeIcons = {
  call: Phone,
  email: Mail,
  meeting: Calendar,
  showing: Calendar,
  task: CheckCircle2,
  note: Circle,
}

export default function ActivitiesPage() {
  const [typeFilter, setTypeFilter] = useState<string>('')
  const [completedFilter, setCompletedFilter] = useState<string>('')

  const filtered = mockActivities.filter((activity) => {
    const matchesType = !typeFilter || activity.type === typeFilter
    const matchesCompleted = completedFilter === '' || activity.completed === (completedFilter === 'true')
    return matchesType && matchesCompleted
  })

  // Sort by date descending
  const sorted = [...filtered].sort((a, b) => b.date.getTime() - a.date.getTime())

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Activities</h1>
          <p className="text-muted-foreground">Track all your client interactions and tasks</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Log Activity
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={typeFilter || 'all'} onValueChange={(val) => setTypeFilter(val === 'all' ? '' : val)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {ACTIVITY_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={completedFilter || 'all'} onValueChange={(val) => setCompletedFilter(val === 'all' ? '' : val)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="false">Pending</SelectItem>
                <SelectItem value="true">Completed</SelectItem>
              </SelectContent>
            </Select>

            {(typeFilter || completedFilter) && (
              <Button
                variant="outline"
                onClick={() => {
                  setTypeFilter('')
                  setCompletedFilter('')
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Activities Timeline */}
      <div className="space-y-3">
        {sorted.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">No activities found</p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Activity
              </Button>
            </CardContent>
          </Card>
        ) : (
          sorted.map((activity) => {
            const Icon = typeIcons[activity.type]
            const typeName = activity.type.charAt(0).toUpperCase() + activity.type.slice(1)
            return (
              <Card key={activity.id}>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className={`flex-shrink-0 mt-1 ${typeColors[activity.type]}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-foreground">{activity.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Badge variant="outline">{typeName}</Badge>
                          {activity.completed && (
                            <Badge className="bg-green-100 text-green-800">Done</Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        {format(activity.date, 'MMM dd, yyyy HH:mm')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
