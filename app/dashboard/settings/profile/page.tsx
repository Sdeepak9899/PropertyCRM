'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/context'

export default function ProfileSettingsPage() {
  const { user } = useAuth()
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // API call would go here
    await new Promise(resolve => setTimeout(resolve, 500))
    setIsSaving(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Profile Settings</h1>
        <p className="text-muted-foreground text-sm md:text-base">Manage your profile and preferences</p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-4 border-b">
            <div className="h-16 w-16 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
              {user?.name[0].toUpperCase()}
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                Upload Photo
              </Button>
              <p className="text-xs text-muted-foreground">
                JPG, PNG or GIF. Max 2MB.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                defaultValue={user?.name}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue={user?.email}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              defaultValue=""
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              defaultValue={user?.company}
            />
          </div>

          <Button onClick={handleSave} disabled={isSaving} className="w-full sm:w-auto">
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardContent>
      </Card>

      {/* Password Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your password to keep your account secure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current">Current Password</Label>
            <Input
              id="current"
              type="password"
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new">New Password</Label>
            <Input
              id="new"
              type="password"
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm Password</Label>
            <Input
              id="confirm"
              type="password"
              placeholder="••••••••"
            />
          </div>

          <Button onClick={handleSave} disabled={isSaving} className="w-full sm:w-auto">
            {isSaving ? 'Updating...' : 'Update Password'}
          </Button>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Choose how you want to be notified</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive updates via email</p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4" />
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <div>
              <p className="font-medium">Deal Alerts</p>
              <p className="text-sm text-muted-foreground">Get notified about deal updates</p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4" />
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <div>
              <p className="font-medium">New Leads</p>
              <p className="text-sm text-muted-foreground">Notify me of new leads</p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4" />
          </div>

          <Button onClick={handleSave} disabled={isSaving} className="mt-4 w-full sm:w-auto">
            {isSaving ? 'Saving...' : 'Save Preferences'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
