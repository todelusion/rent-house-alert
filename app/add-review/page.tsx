"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { searchProperties } from "@/lib/property-service"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PropertyCard } from "@/components/property-card"
import { Search } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/components/ui/use-toast"

const searchFormSchema = z.object({
  query: z.string().min(2, "請輸入至少2個字元"),
})

export default function AddReviewPage() {
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      query: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof searchFormSchema>) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "請先登入",
        description: "您需要登入才能發表評價",
      })
      router.push("/login")
      return
    }

    setIsSearching(true)
    try {
      const results = await searchProperties(values.query)
      setSearchResults(results)
    } catch (error) {
      console.error("Error searching properties:", error)
      toast({
        variant: "destructive",
        title: "搜尋失敗",
        description: "請稍後再試",
      })
    } finally {
      setIsSearching(false)
    }
  }

  const handlePropertyClick = (propertyId: string) => {
    router.push(`/properties/${propertyId}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">新增評價</h1>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>搜尋房源</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="query"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>輸入地址、社區或房東名稱</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                              <Input placeholder="例如：台北市信義區松仁路、XX社區..." className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isSearching} className="w-full">
                      {isSearching ? "搜尋中..." : "搜尋房源"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {searchResults.length > 0 ? (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">搜尋結果</h2>
                <div className="grid grid-cols-1 gap-6">
                  {searchResults.map((property) => (
                    <div
                      key={property.id}
                      onClick={() => handlePropertyClick(property.id)}
                      className="cursor-pointer transition-transform hover:scale-[1.01]"
                    >
                      <PropertyCard property={property} />
                    </div>
                  ))}
                </div>
              </div>
            ) : form.formState.isSubmitted && !isSearching ? (
              <div className="text-center py-8 bg-background rounded-lg shadow">
                <p className="text-muted-foreground mb-4">沒有找到符合條件的房源</p>
                <Button variant="outline" onClick={() => router.push("/properties")}>
                  瀏覽所有房源
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

