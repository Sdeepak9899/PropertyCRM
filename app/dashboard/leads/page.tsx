'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import { ROUTES, LEAD_STATUS, LEAD_SOURCE } from '@/lib/constants'
import { mockLeads } from '@/lib/mock-data'

const statusColors = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-purple-100 text-purple-800',
  qualified: 'bg-green-100 text-green-800',
  active: 'bg-orange-100 text-orange-800',
  closed: 'bg-gray-100 text-gray-800',
}

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [sourceFilter, setSourceFilter] = useState<string>('')

  const filtered = mockLeads.filter((lead) => {
    const matchesSearch =
      `${lead.firstName} ${lead.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm)
    const matchesStatus = !statusFilter || lead.status === statusFilter
    const matchesSource = !sourceFilter || lead.source === sourceFilter
    return matchesSearch && matchesStatus && matchesSource
  })

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leads</h1>
          <p className="text-muted-foreground">Manage and track your buyer leads</p>
        </div>
        <Button asChild>
          <Link href={`${ROUTES.LEADS}/new`}>
            <Plus className="mr-2 h-4 w-4" />
            Add Lead
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex gap-2">
              <Search className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <Input
                placeholder="Search by name, email, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter || 'all'} onValueChange={(val) => setStatusFilter(val === 'all' ? '' : val)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {LEAD_STATUS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sourceFilter || 'all'} onValueChange={(val) => setSourceFilter(val === 'all' ? '' : val)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                {LEAD_SOURCE.map((source) => (
                  <SelectItem key={source} value={source}>
                    {source.charAt(0).toUpperCase() + source.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {(searchTerm || statusFilter || sourceFilter) && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('')
                  setStatusFilter('')
                  setSourceFilter('')
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Leads</CardTitle>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No leads found</p>
              <Button asChild>
                <Link href={`${ROUTES.LEADS}/new`}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add your first lead
                </Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Contact</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Budget</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Source</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((lead) => (
                    <tr key={lead.id} className="border-b border-border hover:bg-secondary/50">
                      <td className="py-3 px-4">
                        <Link
                          href={`${ROUTES.LEADS}/${lead.id}`}
                          className="font-medium text-primary hover:underline"
                        >
                          {lead.firstName} {lead.lastName}
                        </Link>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col gap-1">
                          <a href={`mailto:${lead.email}`} className="flex items-center gap-1 text-sm hover:text-primary">
                            <Mail className="h-4 w-4" />
                            {lead.email}
                          </a>
                          <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-sm hover:text-primary">
                            <Phone className="h-4 w-4" />
                            {lead.phone}
                          </a>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-semibold">
                        {lead.budget ? `$${(lead.budget / 1000000).toFixed(1)}M` : '-'}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {lead.source.charAt(0).toUpperCase() + lead.source.slice(1)}
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={statusColors[lead.status]}>
                          {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button asChild variant="ghost" size="sm">
                          <Link href={`${ROUTES.LEADS}/${lead.id}`}>View</Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
