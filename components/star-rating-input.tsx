"use client"

import { useState } from "react"
import { Star } from "lucide-react"

interface StarRatingInputProps {
  rating: number
  onRatingChange: (rating: number) => void
  max?: number
}

export function StarRatingInput({ rating, onRatingChange, max = 5 }: StarRatingInputProps) {
  const [hoverRating, setHoverRating] = useState(0)

  return (
    <div className="flex items-center">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`h-6 w-6 cursor-pointer ${
            i < (hoverRating || rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
          }`}
          onMouseEnter={() => setHoverRating(i + 1)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => onRatingChange(i + 1)}
        />
      ))}
    </div>
  )
}

