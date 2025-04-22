"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { StarRatingInput } from "@/components/star-rating-input"
import { addReview } from "@/lib/property-service"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { ImageIcon, Loader2 } from "lucide-react"

const formSchema = z.object({
  rating: z.number().min(1, "請選擇評分").max(5),
  content: z.string().min(10, "評價內容至少需要10個字元"),
  pros: z.string().optional(),
  cons: z.string().optional(),
  images: z.any().optional(),
})

interface ReviewFormProps {
  propertyId: string
  onReviewAdded: () => void
}

export function ReviewForm({ propertyId, onReviewAdded }: ReviewFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user, userData } = useAuth()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 0,
      content: "",
      pros: "",
      cons: "",
      images: [],
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    try {
      // For testing purposes, we'll always allow reviews
      // Upload images if any
      let imageUrls: string[] = []
      if (values.images && values.images.length > 0) {
        // In a real app, we would upload images
        // For now, we'll just use placeholder URLs
        imageUrls = Array.isArray(values.images)
          ? values.images.map(
              (_, index) =>
                `https://images.unsplash.com/photo-${1560185007 + index}-c5ca9d2c014d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80`,
            )
          : []
      }

      // Add review
      await addReview({
        propertyId,
        userId: user?.uid || "mock-user-id",
        userName: userData?.displayName || "測試用戶",
        rating: values.rating,
        content: values.content,
        pros: values.pros || "",
        cons: values.cons || "",
        images: imageUrls,
      })

      toast({
        title: "評價已發布",
        description: "感謝您的評價！",
      })

      // Reset form
      form.reset()

      // Refresh reviews
      onReviewAdded()
    } catch (error) {
      console.error("Error submitting review:", error)
      toast({
        variant: "destructive",
        title: "評價發布失敗",
        description: "請稍後再試",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>發表評價</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>評分</FormLabel>
                  <FormControl>
                    <StarRatingInput rating={field.value} onRatingChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>評價內容</FormLabel>
                  <FormControl>
                    <Textarea placeholder="分享您的租屋經驗..." className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="pros"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>優點</FormLabel>
                    <FormControl>
                      <Textarea placeholder="這個房源有什麼優點？" className="min-h-[80px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cons"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>缺點</FormLabel>
                    <FormControl>
                      <Textarea placeholder="這個房源有什麼缺點？" className="min-h-[80px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>上傳照片</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("image-upload")?.click()}
                        className="gap-2"
                      >
                        <ImageIcon className="h-4 w-4" />
                        選擇照片
                      </Button>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || [])
                          field.onChange(files)
                        }}
                      />
                      {field.value && Array.isArray(field.value) && field.value.length > 0 && (
                        <span className="text-sm text-muted-foreground">已選擇 {field.value.length} 張照片</span>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  發布中...
                </>
              ) : (
                "發布評價"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

