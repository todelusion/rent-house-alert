"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PropertyFiltersProps {
  filters: {
    minPrice: number
    maxPrice: number
    rooms: number
    riskLevel: string
  }
  onFilterChange: (filters: any) => void
}

export function PropertyFilters({ filters, onFilterChange }: PropertyFiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters)

  const handlePriceChange = (value: number[]) => {
    setLocalFilters({
      ...localFilters,
      minPrice: value[0],
      maxPrice: value[1],
    })
  }

  const handleRoomsChange = (value: string) => {
    setLocalFilters({
      ...localFilters,
      rooms: Number.parseInt(value),
    })
  }

  const handleRiskLevelChange = (value: string) => {
    setLocalFilters({
      ...localFilters,
      riskLevel: value,
    })
  }

  const handleApplyFilters = () => {
    onFilterChange(localFilters)
  }

  const handleResetFilters = () => {
    const resetFilters = {
      minPrice: 0,
      maxPrice: 100000,
      rooms: 0,
      riskLevel: "",
    }
    setLocalFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>篩選條件</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>租金範圍</Label>
          <div className="pt-4">
            <Slider
              defaultValue={[localFilters.minPrice, localFilters.maxPrice]}
              max={100000}
              step={1000}
              onValueChange={handlePriceChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">NT$ {localFilters.minPrice.toLocaleString()}</span>
            <span className="text-sm">NT$ {localFilters.maxPrice.toLocaleString()}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="rooms">房間數量</Label>
          <Select value={localFilters.rooms.toString()} onValueChange={handleRoomsChange}>
            <SelectTrigger id="rooms">
              <SelectValue placeholder="不限" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">不限</SelectItem>
              <SelectItem value="1">1房</SelectItem>
              <SelectItem value="2">2房</SelectItem>
              <SelectItem value="3">3房</SelectItem>
              <SelectItem value="4">4房以上</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="riskLevel">風險等級</Label>
          <Select value={localFilters.riskLevel} onValueChange={handleRiskLevelChange}>
            <SelectTrigger id="riskLevel">
              <SelectValue placeholder="不限" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">不限</SelectItem>
              <SelectItem value="low">低風險</SelectItem>
              <SelectItem value="medium">中風險</SelectItem>
              <SelectItem value="high">高風險</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-2">
          <Button onClick={handleApplyFilters}>套用篩選</Button>
          <Button variant="outline" onClick={handleResetFilters}>
            重置篩選
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

