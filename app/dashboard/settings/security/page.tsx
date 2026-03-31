'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, Smartphone } from 'lucide-react'

export default function SecurityPage() {
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: '',
  })

  const [sessions] = useState([
    {
      id: '1',
      device: 'Chrome on macOS',
      location: 'San Francisco, CA',
      lastActive: '2 hours ago',
      current: true,
    },
    {
      id: '2',
      device: 'Safari on iPhone',
      location: 'San Francisco, CA',
      lastActive: '1 day ago',
      current: false,
    },
    {
      id: '3',
      device: 'Chrome on Windows',
      location: 'Chicago, IL',
      lastActive: '5 days ago',
      current: false,
    },
  ])

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Security Settings</h1>
        <p className="text-muted-foreground text-sm md:text-base">Manage your account security and privacy</p>
      </div>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your password to keep your account secure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-pwd">Current Password</Label>
            <Input
              id="current-pwd"
              type="password"
              placeholder="Enter your current password"
              value={passwordForm.current}
              onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-pwd">New Password</Label>
            <Input
              id="new-pwd"
              type="password"
              placeholder="Enter your new password"
              value={passwordForm.new}
              onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-pwd">Confirm Password</Label>
            <Input
              id="confirm-pwd"
              type="password"
              placeholder="Confirm your new password"
              value={passwordForm.confirm}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
            />
          </div>
          <Button className="w-full sm:w-auto">Update Password</Button>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-secondary/50 rounded-lg gap-4">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 shrink-0" />
              <div>
                <p className="font-medium">Authenticator App</p>
                <p className="text-sm text-muted-foreground">Use an authenticator app for 2FA</p>
              </div>
            </div>
            <Badge variant="outline" className="shrink-0">Not Enabled</Badge>
          </div>
          <Button className="w-full sm:w-auto">Enable 2FA</Button>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>Manage devices accessing your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 last:border-0 gap-4">
              <div>
                <p className="font-medium">{session.device}</p>
                <p className="text-sm text-muted-foreground">{session.location}</p>
                <p className="text-xs text-muted-foreground mt-1">Last active: {session.lastActive}</p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                {session.current && <Badge>Current</Badge>}
                {!session.current && (
                  <Button variant="ghost" size="sm" className="text-destructive">
                    Sign Out
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Delete Account</CardTitle>
          <CardDescription>Permanently delete your account and all associated data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-3 p-4 bg-destructive/5 rounded-lg mb-4">
            <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <p className="text-sm text-destructive">
              This action cannot be undone. All your data will be permanently deleted.
            </p>
          </div>
          <Button variant="destructive" className="w-full sm:w-auto">Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  )
}
