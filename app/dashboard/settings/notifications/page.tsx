'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function NotificationsPage() {
  const [emailNotifications, setEmailNotifications] = useState({
    newLeads: true,
    dealUpdates: true,
    activityReminders: true,
    teamMessages: true,
    systemAlerts: false,
    weeklyReport: true,
  })

  const [pushNotifications, setPushNotifications] = useState({
    newLeads: true,
    dealUpdates: true,
    activityReminders: false,
    teamMessages: true,
  })

  const handleEmailChange = (key: string, value: boolean) => {
    setEmailNotifications((prev) => ({ ...prev, [key]: value }))
  }

  const handlePushChange = (key: string, value: boolean) => {
    setPushNotifications((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Notification Preferences</h1>
        <p className="text-muted-foreground text-sm md:text-base">Manage how you receive notifications</p>
      </div>

      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Choose which emails you&apos;d like to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(emailNotifications).map(([key, value]) => (
            <div key={key} className="flex flex-row items-center justify-between gap-4">
              <div className="flex-1 pr-4">
                <Label className="text-base font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {getNotificationDescription(key)}
                </p>
              </div>
              <Switch
                checked={value}
                onCheckedChange={(val) => handleEmailChange(key, val)}
                className="shrink-0"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
          <CardDescription>Receive instant notifications on your device</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(pushNotifications).map(([key, value]) => (
            <div key={key} className="flex flex-row items-center justify-between gap-4">
              <div className="flex-1 pr-4">
                <Label className="text-base font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {getNotificationDescription(key)}
                </p>
              </div>
              <Switch
                checked={value}
                onCheckedChange={(val) => handlePushChange(key, val)}
                className="shrink-0"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button className="w-full sm:w-auto">Save Preferences</Button>
        <Button variant="outline" className="w-full sm:w-auto">Reset to Default</Button>
      </div>
    </div>
  )
}

function getNotificationDescription(key: string): string {
  const descriptions: Record<string, string> = {
    newLeads: 'Get notified when new leads are added to your pipeline',
    dealUpdates: 'Receive updates when deals progress through stages',
    activityReminders: 'Get reminders for scheduled activities and tasks',
    teamMessages: 'Notifications from your team members',
    systemAlerts: 'Important system and account alerts',
    weeklyReport: 'Weekly summary of your performance and activity',
  }
  return descriptions[key] || ''
}
