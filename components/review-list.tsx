import type { Review } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { StarRating } from "@/components/star-rating"
import { Button } from "@/components/ui/button"
import { ThumbsUp } from "lucide-react"

interface ReviewListProps {
  reviews: Review[]
  isLoading: boolean
}

export function ReviewList({ reviews, isLoading }: ReviewListProps) {
  if (isLoading) {
    return <div className="text-center py-8">載入評價中...</div>
  }

  if (reviews.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">目前還沒有評價，成為第一個評價的人吧！</div>
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{review.userName}</p>
                  <p className="text-sm text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <StarRating rating={review.rating} />
            </div>

            <p className="mb-4">{review.content}</p>

            {(review.pros || review.cons) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {review.pros && (
                  <div>
                    <p className="font-medium text-green-600 mb-1">優點</p>
                    <p className="text-sm">{review.pros}</p>
                  </div>
                )}
                {review.cons && (
                  <div>
                    <p className="font-medium text-red-600 mb-1">缺點</p>
                    <p className="text-sm">{review.cons}</p>
                  </div>
                )}
              </div>
            )}

            {review.images && review.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                {review.images.map((image, index) => (
                  <div key={index} className="relative h-24 rounded-md overflow-hidden">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Review image ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="px-6 py-4 border-t flex justify-between">
            <Button variant="ghost" size="sm" className="gap-2">
              <ThumbsUp className="h-4 w-4" />
              有幫助 ({review.helpful})
            </Button>
            <Button variant="ghost" size="sm">
              檢舉
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

