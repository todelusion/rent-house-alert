export interface Property {
  id: string
  title: string
  address: string
  price: number
  size: number
  rooms: number
  bathrooms: number
  description: string
  images: string[]
  landlordId: string
  landlordName: string
  createdAt: Date
  updatedAt: Date
  riskScore?: number
  riskLevel?: "low" | "medium" | "high"
  riskFactors?: string[]
}

export interface Review {
  id: string
  propertyId: string
  userId: string
  userName: string
  rating: number
  content: string
  pros?: string
  cons?: string
  images?: string[]
  createdAt: Date
  updatedAt: Date
  helpful: number
  reported: boolean
}

export interface Landlord {
  id: string
  name: string
  properties: number
  averageRating: number
  reviewCount: number
  riskScore?: number
  riskLevel?: "low" | "medium" | "high"
  riskFactors?: string[]
}

