'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { mockProperties, mockLeads, mockDeals } from '@/lib/mock-data'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const revenueData = [
  { month: 'Jan', revenue: 240000 },
  { month: 'Feb', revenue: 310000 },
  { month: 'Mar', revenue: 200000 },
  { month: 'Apr', revenue: 270000 },
  { month: 'May', revenue: 340000 },
  { month: 'Jun', revenue: 390000 },
]

const leadData = [
  { name: 'New', value: 30, fill: '#3b82f6' },
  { name: 'Qualified', value: 25, fill: '#8b5cf6' },
  { name: 'Active', value: 35, fill: '#ec4899' },
  { name: 'Closed', value: 10, fill: '#6366f1' },
]

const conversionData = [
  { stage: 'Lead', count: 100 },
  { stage: 'Requirement', count: 75 },
  { stage: 'Match', count: 45 },
  { stage: 'Visit', count: 30 },
  { stage: 'Negotiation', count: 20 },
  { stage: 'Closed', count: 15 },
]

export default function ReportsOverviewPage() {
  const totalRevenue = mockDeals.reduce((sum, d) => sum + (d.offerPrice || 0), 0)
  const closedDeals = mockDeals.filter(d => d.status === 'closed_won').length

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
        <p className="text-muted-foreground">Overview of your business performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalRevenue / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground mt-1">+12% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Closed Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{closedDeals}</div>
            <p className="text-xs text-muted-foreground mt-1">{((closedDeals / mockDeals.length) * 100).toFixed(1)}% of pipeline</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDeals.filter(d => d.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground mt-1">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42%</div>
            <p className="text-xs text-muted-foreground mt-1">Lead to deal</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-primary)"
                  dot={{ fill: 'var(--color-primary)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Lead Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Distribution</CardTitle>
            <CardDescription>By status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leadData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} (${value})`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {leadData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales Funnel</CardTitle>
            <CardDescription>Lead to close conversion by stage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="stage" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip />
                <Bar dataKey="count" fill="var(--color-primary)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
