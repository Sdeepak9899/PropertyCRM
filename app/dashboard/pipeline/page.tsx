'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DEAL_STAGES } from '@/lib/constants'
import { mockDeals, mockLeads } from '@/lib/mock-data'

export default function PipelinePage() {
  const stageCounts = DEAL_STAGES.reduce((acc, stage) => {
    acc[stage] = mockDeals.filter(d => d.stage === stage).length
    return acc
  }, {} as Record<string, number>)

  const stageLabels: Record<string, string> = {
    lead: 'Lead',
    requirement: 'Requirements',
    match: 'Matching',
    visit: 'Showings',
    negotiation: 'Negotiation',
    closed: 'Closed Won',
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Deal Pipeline</h1>
        <p className="text-muted-foreground">Track your deals through each stage</p>
      </div>

      {/* Pipeline Stats */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {DEAL_STAGES.map((stage) => (
          <Card key={stage}>
            <CardContent className="pt-4">
              <p className="text-2xl font-bold">{stageCounts[stage]}</p>
              <p className="text-xs text-muted-foreground mt-1">{stageLabels[stage]}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-4 min-w-max">
          {DEAL_STAGES.map((stage) => {
            const deals = mockDeals.filter(d => d.stage === stage)
            return (
              <div key={stage} className="w-80 flex-shrink-0">
                <Card className="h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      {stageLabels[stage]} ({deals.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {deals.map((deal) => {
                        const lead = mockLeads.find(l => l.id === deal.leadId)
                        if (!lead) return null
                        return (
                          <div
                            key={deal.id}
                            className="p-3 bg-secondary rounded-lg border border-border cursor-move hover:shadow-md transition-shadow"
                          >
                            <p className="font-semibold text-sm text-foreground">
                              {lead.firstName} {lead.lastName}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Budget: ${(lead.budget ? lead.budget / 1000000 : 0).toFixed(1)}M
                            </p>
                            {deal.expectedCloseDate && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Close: {deal.expectedCloseDate.toLocaleDateString()}
                              </p>
                            )}
                            <Badge variant="outline" className="mt-2 text-xs">
                              {deal.status}
                            </Badge>
                          </div>
                        )
                      })}
                      {deals.length === 0 && (
                        <div className="py-8 text-center">
                          <p className="text-sm text-muted-foreground">No deals</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total Pipeline Value</span>
            <span className="text-2xl font-bold text-primary">
              ${(mockDeals.reduce((sum, d) => sum + (d.offerPrice || 0), 0) / 1000000).toFixed(1)}M
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Active Deals</span>
            <span className="text-2xl font-bold">
              {mockDeals.filter(d => d.status === 'active').length}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Avg Days in Pipeline</span>
            <span className="text-2xl font-bold">24</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
