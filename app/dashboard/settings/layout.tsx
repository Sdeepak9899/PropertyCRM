'use client'

import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ROUTES } from '@/lib/constants'
import { User, Lock, Bell } from 'lucide-react'
import { cn } from '@/lib/utils'

const settingsSections = [
  { label: 'Profile', href: `${ROUTES.SETTINGS}/profile`, icon: User },
  { label: 'Security', href: `${ROUTES.SETTINGS}/security`, icon: Lock },
  { label: 'Notifications', href: `${ROUTES.SETTINGS}/notifications`, icon: Bell },
]

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-4">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-0">
              <nav className="flex flex-row overflow-x-auto space-x-2 p-4 md:flex-col md:space-x-0 md:space-y-1 scrollbar-hide">
                {settingsSections.map((section) => {
                  const Icon = section.icon
                  const isActive = pathname === section.href
                  return (
                    <Link
                      key={section.href}
                      href={section.href}
                      className={cn(
                        'flex items-center gap-2 rounded px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap',
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
        <div className="md:col-span-3">{children}</div>
      </div>
    </div>
  )
}
