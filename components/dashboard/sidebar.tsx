'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Building2,
  Users,
  TrendingUp,
  CheckSquare,
  Search,
  BarChart3,
  Users2,
  MessageSquare,
  Settings,
  LogOut,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants'
import { useAuth } from '@/lib/context'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Dashboard', href: ROUTES.DASHBOARD, icon: Home },
  { label: 'Properties', href: ROUTES.PROPERTIES, icon: Building2 },
  { label: 'Leads', href: ROUTES.LEADS, icon: Users },
  { label: 'Pipeline', href: ROUTES.PIPELINE, icon: TrendingUp },
  { label: 'Activities', href: ROUTES.ACTIVITIES, icon: CheckSquare },
  { label: 'Requirements', href: ROUTES.REQUIREMENTS, icon: Search },
  { label: 'Reports', href: ROUTES.REPORTS, icon: BarChart3 },
  { label: 'Team', href: ROUTES.TEAM, icon: Users2 },
  { label: 'Messages', href: ROUTES.MESSAGES, icon: MessageSquare },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <aside className="hidden md:flex h-screen w-64 flex-col border-r border-border bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-2 border-b border-sidebar-border px-6 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded bg-sidebar-primary text-sidebar-primary-foreground font-bold">
          R
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold">RealtyCRM</span>
          <span className="text-xs opacity-75">Pro</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'hover:bg-sidebar-accent text-sidebar-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="space-y-2 border-t border-sidebar-border p-4">
        <div className="px-2 py-2 text-xs font-semibold opacity-75">
          {user?.name || 'User'}
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent"
          asChild
        >
          <Link href={ROUTES.SETTINGS}>
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-destructive/10"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  )
}
