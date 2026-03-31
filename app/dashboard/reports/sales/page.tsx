'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Badge } from '@/components/ui/badge'

const chartData = [
  { month: 'Jan', sales: 4000, closedDeals: 24 },
  { month: 'Feb', sales: 4500, closedDeals: 28 },
  { month: 'Mar', sales: 5200, closedDeals: 32 },
  { month: 'Apr', sales: 6100, closedDeals: 38 },
  { month: 'May', sales: 7200, closedDeals: 42 },
  { month: 'Jun', sales: 8100, closedDeals: 48 },
]

const topProperties = [
  { address: '123 Main St, Downtown', price: 2500000, agentCommission: 75000, status: 'Closed' },
  { address: '456 Oak Ave, Westside', price: 1800000, agentCommission: 54000, status: 'Closed' },
  { address: '789 Pine Rd, Eastside', price: 1200000, agentCommission: 36000, status: 'Closed' },
  { address: '321 Elm St, Midtown', price: 950000, agentCommission: 28500, status: 'Closed' },
]

export default function SalesReportPage() {
  const totalSalesVolume = topProperties.reduce((sum, p) => sum + p.price, 0)
  const totalCommissions = topProperties.reduce((sum, p) => sum + p.agentCommission, 0)
  const averageDealSize = totalSalesVolume / topProperties.length

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Sales Report</h1>
        <p className="text-muted-foreground">Track your sales performance and metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Sales Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${(totalSalesVolume / 1000000).toFixed(1)}M</p>
            <p className="text-xs text-green-600 mt-1">+12% from last quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Commissions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalCommissions.toLocaleString()}</p>
            <p className="text-xs text-green-600 mt-1">+15% from last quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Closed Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">48</p>
            <p className="text-xs text-green-600 mt-1">+8 from last quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Deal Size</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${(averageDealSize / 1000000).toFixed(2)}M</p>
            <p className="text-xs text-green-600 mt-1">+3% from last quarter</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Trend (Last 6 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="var(--color-chart-1)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Properties */}
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Properties</CardTitle>
          <CardDescription>Your highest value closed deals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProperties.map((property, idx) => (
              <div key={idx} className="flex items-start justify-between border-b pb-4 last:border-0">
                <div className="flex-1">
                  <p className="font-medium">{property.address}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Sale Price: ${(property.price / 1000000).toFixed(1)}M
                  </p>
                </div>
                <div className="text-right ml-4 flex-shrink-0">
                  <Badge variant="outline">{property.status}</Badge>
                  <p className="text-sm font-semibold mt-2">
                    ${(property.agentCommission / 1000).toFixed(0)}K commission
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
