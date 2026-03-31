'use client'

import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ROUTES } from '@/lib/constants'
import { LineChart, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const reportSections = [
  { label: 'Overview', href: `${ROUTES.REPORTS}/overview`, icon: LineChart },
  { label: 'Sales', href: `${ROUTES.REPORTS}/sales`, icon: TrendingUp },
  { label: 'Performance', href: `${ROUTES.REPORTS}/performance`, icon: TrendingUp },
]

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports</h1>
        <p className="text-muted-foreground">Analyze your business performance</p>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-4">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-0">
              <nav className="space-y-1 p-4">
                {reportSections.map((section) => {
                  const Icon = section.icon
                  const isActive = pathname === section.href
                  return (
                    <Link
                      key={section.href}
                      href={section.href}
                      className={cn(
                        'flex items-center gap-2 rounded px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-secondary text-foreground'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {section.label}
                    </Link>
                  )
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">{children}</div>
      </div>
    </div>
  )
}
