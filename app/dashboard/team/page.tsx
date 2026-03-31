'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Users, TrendingUp, Trash2, Edit2 } from 'lucide-react'

const mockTeamMembers = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@company.com',
    role: 'Agent',
    properties: 12,
    deals: 8,
    revenue: 2400000,
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@company.com',
    role: 'Agent',
    properties: 8,
    deals: 5,
    revenue: 1500000,
  },
  {
    id: '3',
    name: 'Carol Williams',
    email: 'carol@company.com',
    role: 'Senior Agent',
    properties: 15,
    deals: 12,
    revenue: 3200000,
  },
]

export default function TeamPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team Management</h1>
          <p className="text-muted-foreground">Manage your team members and their performance</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Invite Agent
        </Button>
      </div>

      {/* Team Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Team Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTeamMembers.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Active members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockTeamMembers.reduce((sum, m) => sum + m.properties, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Listed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockTeamMembers.reduce((sum, m) => sum + m.deals, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Closed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Team Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(mockTeamMembers.reduce((sum, m) => sum + m.revenue, 0) / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground mt-1">Total</p>
          </CardContent>
        </Card>
      </div>

      {/* Team Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Role</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Properties</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Deals</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Revenue</th>
                  <th className="text-right py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockTeamMembers.map((member) => (
                  <tr key={member.id} className="border-b border-border hover:bg-secondary/50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-foreground">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{member.role}</Badge>
                    </td>
                    <td className="py-3 px-4 font-semibold">{member.properties}</td>
                    <td className="py-3 px-4 font-semibold">{member.deals}</td>
                    <td className="py-3 px-4 font-semibold">${(member.revenue / 1000000).toFixed(1)}M</td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <Button variant="ghost" size="sm" className="inline-flex">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="inline-flex text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
