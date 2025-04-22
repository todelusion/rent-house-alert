import Link from "next/link"
import Image from "next/image"
import type { Property } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Home, User } from "lucide-react"

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const getRiskBadge = () => {
    switch (property.riskLevel) {
      case "high":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            高風險
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="warning" className="flex items-center gap-1 bg-yellow-500">
            <AlertTriangle className="h-3 w-3" />
            中風險
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-green-100 text-green-800 border-green-200">
            <AlertTriangle className="h-3 w-3" />
            低風險
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card className="overflow-hidden">
      <Link href={`/properties/${property.id}`}>
        <div className="relative h-48 w-full">
          {property.images && property.images.length > 0 ? (
            <Image src={property.images[0] || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
          ) : (
            <div className="h-full w-full bg-muted flex items-center justify-center">
              <Home className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
          {property.riskLevel && <div className="absolute top-2 right-2">{getRiskBadge()}</div>}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/properties/${property.id}`}>
          <h3 className="text-lg font-semibold line-clamp-1 hover:underline">{property.title}</h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{property.address}</p>
        <p className="text-lg font-bold mt-2">NT$ {property.price.toLocaleString()} / 月</p>
        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
          <span>{property.size} 坪</span>
          <span>{property.rooms} 房</span>
          <span>{property.bathrooms} 衛</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{property.landlordName}</span>
        </div>
        <div className="text-sm text-muted-foreground">{new Date(property.createdAt).toLocaleDateString()}</div>
      </CardFooter>
    </Card>
  )
}

