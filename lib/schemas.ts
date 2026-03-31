import { z } from 'zod'

// Auth Schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords don\'t match',
  path: ['confirmPassword'],
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export const resetPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords don\'t match',
  path: ['confirmPassword'],
})

// Property Schemas
export const propertySchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
  price: z.coerce.number().positive('Price must be positive'),
  beds: z.coerce.number().int().min(0),
  baths: z.coerce.number().min(0),
  sqft: z.coerce.number().positive('Square footage must be positive'),
  propertyType: z.enum(['house', 'condo', 'townhouse', 'land', 'commercial']),
  status: z.enum(['available', 'pending', 'sold', 'archived']),
  description: z.string().optional(),
  features: z.string().optional(),
  imageUrl: z.string().url().optional(),
})

export type Property = z.infer<typeof propertySchema>

// Lead Schemas
export const leadSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Invalid phone number'),
  budget: z.coerce.number().positive('Budget must be positive').optional(),
  minBeds: z.coerce.number().int().min(0).optional(),
  maxBeds: z.coerce.number().int().min(0).optional(),
  location: z.string().optional(),
  source: z.enum(['website', 'referral', 'call', 'email', 'social', 'other']),
  status: z.enum(['new', 'contacted', 'qualified', 'active', 'closed']),
  notes: z.string().optional(),
})

export type Lead = z.infer<typeof leadSchema>

// Deal Schemas
export const dealSchema = z.object({
  id: z.string().optional(),
  leadId: z.string(),
  propertyId: z.string(),
  stage: z.enum(['lead', 'requirement', 'match', 'visit', 'negotiation', 'closed']),
  status: z.enum(['active', 'closed_won', 'closed_lost', 'on_hold']),
  expectedCloseDate: z.coerce.date().optional(),
  offerPrice: z.coerce.number().optional(),
  notes: z.string().optional(),
})

export type Deal = z.infer<typeof dealSchema>

// Activity Schemas
export const activitySchema = z.object({
  id: z.string().optional(),
  type: z.enum(['call', 'email', 'meeting', 'showing', 'task', 'note']),
  leadId: z.string().optional(),
  propertyId: z.string().optional(),
  title: z.string().min(3),
  description: z.string().optional(),
  date: z.coerce.date(),
  completed: z.boolean().default(false),
})

export type Activity = z.infer<typeof activitySchema>

// Requirement Schemas
export const requirementSchema = z.object({
  id: z.string().optional(),
  leadId: z.string(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  minBeds: z.coerce.number().int().min(0).optional(),
  maxBeds: z.coerce.number().int().min(0).optional(),
  location: z.string().optional(),
  propertyTypes: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  moveInDate: z.coerce.date().optional(),
  urgency: z.enum(['low', 'medium', 'high']).optional(),
})

export type Requirement = z.infer<typeof requirementSchema>
