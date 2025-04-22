"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useQuery } from "@tanstack/react-query"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { getPropertyById, updateProperty } from "@/lib/property-service"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  title: z.string().min(5, "標題至少需要5個字元"),
  address: z.string().min(5, "地址至少需要5個字元"),
  price: z.coerce.number().min(1, "價格必須大於0"),
  size: z.coerce.number().min(1, "坪數必須大於0"),
  rooms: z.coerce.number().min(1, "房間數必須大於0"),
  bathrooms: z.coerce.number().min(1, "衛浴數必須大於0"),
  description: z.string().min(10, "描述至少需要10個字元"),
  riskLevel: z.string().optional(),
})

export default function EditPropertyPage() {
  const { id } = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const { data: property, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: () => getPropertyById(id as string),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      address: "",
      price: 0,
      size: 0,
      rooms: 1,
      bathrooms: 1,
      description: "",
      riskLevel: "low",
    },
  })

  useEffect(() => {
    if (property) {
      form.reset({
        title: property.title,
        address: property.address,
        price: property.price,
        size: property.size,
        rooms: property.rooms,
        bathrooms: property.bathrooms,
        description: property.description,
        riskLevel: property.riskLevel,
      })
    }
  }, [property, form])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      // 更新風險分數
      const riskScore = values.riskLevel === "high" ? 85 : values.riskLevel === "medium" ? 60 : 25

      // 更新風險因素
      const riskFactors =
        values.riskLevel === "high"
          ? ["示例高風險因素1", "示例高風險因素2"]
          : values.riskLevel === "medium"
            ? ["示例中風險因素"]
            : ["無明顯風險"]

      await updateProperty(id as string, {
        ...values,
        riskScore,
        riskFactors,
      })

      toast({
        title: "更新成功",
        description: "房源已成功更新",
      })

      router.push("/properties/manage")
    } catch (error) {
      console.error("Error updating property:", error)
      toast({
        variant: "destructive",
        title: "更新失敗",
        description: "更新房源時發生錯誤",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 bg-muted/40 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
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
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">找不到房源</h2>
            <p className="text-muted-foreground mb-4">無法找到指定的房源</p>
            <Button onClick={() => router.push("/properties/manage")}>返回管理頁面</Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/40">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-6">編輯房源</h1>

          <Card>
            <CardHeader>
              <CardTitle>房源資訊</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>標題</FormLabel>
                        <FormControl>
                          <Input placeholder="例如：信義區豪華公寓" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>地址</FormLabel>
                        <FormControl>
                          <Input placeholder="例如：台北市信義區松仁路100號" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>月租金 (NT$)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="size"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>坪數</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" step="0.1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="rooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>房間數</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bathrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>衛浴數</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>描述</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="請描述房源的特色、設備、周邊環境等..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="riskLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>風險等級</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="選擇風險等級" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low">低風險</SelectItem>
                            <SelectItem value="medium">中風險</SelectItem>
                            <SelectItem value="high">高風險</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => router.push("/properties/manage")}>
                      取消
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          更新中...
                        </>
                      ) : (
                        "更新房源"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

