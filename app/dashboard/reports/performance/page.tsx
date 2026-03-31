'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Badge } from '@/components/ui/badge'

const performanceData = [
  { agent: 'John Smith', closedDeals: 24, avgDealSize: 1.8, satisfaction: 92 },
  { agent: 'Sarah Johnson', closedDeals: 28, avgDealSize: 2.1, satisfaction: 95 },
  { agent: 'Mike Chen', closedDeals: 22, avgDealSize: 1.6, satisfaction: 88 },
  { agent: 'Emma Davis', closedDeals: 26, avgDealSize: 1.9, satisfaction: 91 },
]

const conversionData = [
  { month: 'Jan', leads: 120, qualified: 45, closed: 12, rate: 10 },
  { month: 'Feb', leads: 135, qualified: 52, closed: 15, rate: 11 },
  { month: 'Mar', leads: 150, qualified: 61, closed: 18, rate: 12 },
  { month: 'Apr', leads: 165, qualified: 68, closed: 22, rate: 13 },
  { month: 'May', leads: 180, qualified: 76, closed: 25, rate: 14 },
  { month: 'Jun', leads: 195, qualified: 85, closed: 28, rate: 14 },
]

export default function PerformancePage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Performance Metrics</h1>
        <p className="text-muted-foreground">Monitor team and individual performance</p>
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Funnel (6 Months)</CardTitle>
          <CardDescription>Track lead to close conversion rates</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="leads" stroke="var(--color-chart-1)" />
              <Line type="monotone" dataKey="qualified" stroke="var(--color-chart-2)" />
              <Line type="monotone" dataKey="closed" stroke="var(--color-chart-3)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Team Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Team Performance Leaderboard</CardTitle>
          <CardDescription>Performance metrics by team member</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Agent</th>
                  <th className="text-left py-3 px-4 font-semibold">Closed Deals</th>
                  <th className="text-left py-3 px-4 font-semibold">Avg Deal Size</th>
                  <th className="text-left py-3 px-4 font-semibold">Client Satisfaction</th>
                </tr>
              </thead>
              <tbody>
                {performanceData.map((data, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-secondary/50">
                    <td className="py-3 px-4">
                      <p className="font-medium">{data.agent}</p>
                    </td>
                    <td className="py-3 px-4">
                      <Badge>{data.closedDeals}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold">${data.avgDealSize}M</p>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500"
                            style={{ width: `${data.satisfaction}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold">{data.satisfaction}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Conversion Rate Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Rate Trend</CardTitle>
          <CardDescription>Percentage of qualified leads converting to closed deals</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Bar dataKey="rate" fill="var(--color-chart-1)" name="Conversion Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
