import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  max?: number
}

export function StarRating({ rating, max = 5 }: StarRatingProps) {
  return (
    <div className="flex items-center">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
        />
      ))}
    </div>
  )
}

