// Routes
export const ROUTES = {
  // Auth routes
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',

  // Dashboard routes
  DASHBOARD: '/dashboard',
  PROPERTIES: '/dashboard/properties',
  LEADS: '/dashboard/leads',
  PIPELINE: '/dashboard/pipeline',
  ACTIVITIES: '/dashboard/activities',
  REQUIREMENTS: '/dashboard/requirements',
  SEARCH: '/dashboard/search',
  REPORTS: '/dashboard/reports',
  TEAM: '/dashboard/team',
  MESSAGES: '/dashboard/messages',
  SETTINGS: '/dashboard/settings',
} as const

// Mock data status options
export const PROPERTY_STATUS = ['available', 'pending', 'sold', 'archived'] as const
export const PROPERTY_TYPES = ['house', 'condo', 'townhouse', 'land', 'commercial'] as const
export const LEAD_STATUS = ['new', 'contacted', 'qualified', 'active', 'closed'] as const
export const LEAD_SOURCE = ['website', 'referral', 'call', 'email', 'social', 'other'] as const
export const DEAL_STAGES = ['lead', 'requirement', 'match', 'visit', 'negotiation', 'closed'] as const
export const DEAL_STATUS = ['active', 'closed_won', 'closed_lost', 'on_hold'] as const
export const ACTIVITY_TYPES = ['call', 'email', 'meeting', 'showing', 'task', 'note'] as const
export const URGENCY_LEVELS = ['low', 'medium', 'high'] as const

// Date formats
export const DATE_FORMAT = 'MMM dd, yyyy'
export const DATETIME_FORMAT = 'MMM dd, yyyy HH:mm'

// Pagination
export const DEFAULT_PAGE_SIZE = 20
export const PAGE_SIZES = [10, 20, 50, 100]

// Chart colors
export const CHART_COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
] as const
