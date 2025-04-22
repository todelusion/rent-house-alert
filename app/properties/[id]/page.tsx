"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import Image from "next/image"
import { getPropertyById, getPropertyReviews } from "@/lib/property-service"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReviewList } from "@/components/review-list"
import { ReviewForm } from "@/components/review-form"
import { PropertyRiskInfo } from "@/components/property-risk-info"
import { AlertTriangle, Home, MapPin, User } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export default function PropertyDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("details")

  const { data: property, isLoading: isPropertyLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: () => getPropertyById(id as string),
  })

  const {
    data: reviews,
    isLoading: isReviewsLoading,
    refetch: refetchReviews,
  } = useQuery({
    queryKey: ["propertyReviews", id],
    queryFn: () => getPropertyReviews(id as string),
  })

  const getRiskBadge = () => {
    if (!property?.riskLevel) return null

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

  if (isPropertyLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 bg-muted/40 flex items-center justify-center">
          <div>載入中...</div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!property) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 bg-muted/40 flex items-center justify-center">
          <div>找不到此房源</div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="relative h-64 md:h-96 w-full mb-6">
                {property.images && property.images.length > 0 ? (
                  <Image
                    src={property.images[0] || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                ) : (
                  <div className="h-full w-full bg-muted flex items-center justify-center rounded-lg">
                    <Home className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl md:text-3xl font-bold">{property.title}</h1>
                {getRiskBadge()}
              </div>

              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <MapPin className="h-4 w-4" />
                <span>{property.address}</span>
              </div>

              <div className="flex items-center gap-6 mb-6">
                <div>
                  <span className="text-2xl font-bold">NT$ {property.price.toLocaleString()}</span>
                  <span className="text-muted-foreground"> / 月</span>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span>{property.size} 坪</span>
                  <span>{property.rooms} 房</span>
                  <span>{property.bathrooms} 衛</span>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <TabsList>
                  <TabsTrigger value="details">房源詳情</TabsTrigger>
                  <TabsTrigger value="reviews">評價 ({isReviewsLoading ? "..." : reviews?.length || 0})</TabsTrigger>
                  <TabsTrigger value="risks">風險資訊</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="mt-4">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">房源描述</h3>
                      <p className="whitespace-pre-line">{property.description}</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="reviews" className="mt-4 space-y-6">
                  {user && <ReviewForm propertyId={property.id} onReviewAdded={refetchReviews} />}
                  <ReviewList reviews={reviews || []} isLoading={isReviewsLoading} />
                </TabsContent>
                <TabsContent value="risks" className="mt-4">
                  <PropertyRiskInfo property={property} />
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">房東資訊</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{property.landlordName}</p>
                      <p className="text-sm text-muted-foreground">房東</p>
                    </div>
                  </div>
                  <Button className="w-full">聯絡房東</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">房源位置</h3>
                  <div className="h-48 bg-muted rounded-md flex items-center justify-center mb-4">
                    <MapPin className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2">地圖載入中</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{property.address}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

