import { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">RealtyCRM</h1>
          <p className="text-muted-foreground">Professional Real Estate Management</p>
        </div>
        <div className="bg-card rounded-lg shadow-lg p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
