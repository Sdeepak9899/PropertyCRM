import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-6">
        <div>
          <h1 className="text-6xl font-bold text-foreground">404</h1>
          <p className="text-xl text-muted-foreground mt-2">Page not found</p>
        </div>

        <p className="text-muted-foreground max-w-sm mx-auto">
          Sorry, the page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
        </p>

        <div className="space-y-3">
          <Button asChild>
            <Link href={ROUTES.DASHBOARD}>Go to Dashboard</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
