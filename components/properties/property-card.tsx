import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Building2, MapPin, Bath, Maximize2 } from 'lucide-react'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants'
import type { Property } from '@/lib/schemas'

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const statusColors = {
    available: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    sold: 'bg-gray-100 text-gray-800',
    archived: 'bg-red-100 text-red-800',
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-40 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">
        {property.imageUrl ? (
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <Building2 className="h-16 w-16 text-primary/30" />
        )}
        <Badge className={`absolute top-3 right-3 ${statusColors[property.status]}`}>
          {property.status}
        </Badge>
      </div>

      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-1 line-clamp-1">{property.title}</h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <MapPin className="h-4 w-4" />
          {property.address}, {property.city}, {property.state}
        </div>

        <div className="text-2xl font-bold text-primary mb-3">
          ${(property.price / 1000000).toFixed(1)}M
        </div>

        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="flex items-center gap-1">
            <span className="font-bold">{property.beds}</span>
            <span className="text-muted-foreground">Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4 text-muted-foreground" />
            <span className="font-bold">{property.baths}</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize2 className="h-4 w-4 text-muted-foreground" />
            <span className="font-bold">{(property.sqft / 1000).toFixed(1)}k</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full" variant="outline">
          <Link href={`${ROUTES.PROPERTIES}/${property.id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
