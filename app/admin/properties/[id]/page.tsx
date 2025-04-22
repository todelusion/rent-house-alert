"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import {
  getPropertyById,
  updateProperty,
  uploadImage,
} from "@/lib/property-service";
import { mockLandlords } from "@/lib/mock-data";

const formSchema = z.object({
  title: z.string().min(3, "標題至少需要3個字元"),
  address: z.string().min(5, "地址至少需要5個字元"),
  price: z.coerce.number().positive("租金必須為正數"),
  size: z.coerce.number().positive("坪數必須為正數"),
  rooms: z.coerce.number().int().positive("房間數必須為正整數"),
  bathrooms: z.coerce.number().int().positive("衛浴數必須為正整數"),
  description: z.string().min(20, "描述至少需要20個字元"),
  landlordId: z.string().min(1, "請選擇房東"),
  riskLevel: z.enum(["low", "medium", "high"]),
  images: z.any().optional(),
});

export default function EditPropertyPage() {
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { data: property, isLoading } = useQuery({
    queryKey: ["editProperty", id],
    queryFn: () => getPropertyById(id as string),
  });

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
      landlordId: "",
      riskLevel: "low",
      images: undefined,
    },
  });

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
        landlordId: property.landlordId,
        riskLevel: property.riskLevel || "low",
      });
    }
  }, [property, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // 處理圖片上傳
      let imageUrls = property?.images || [];
      if (values.images && values.images.length > 0) {
        const files = Array.from(values.images);
        const uploadPromises = files.map((file: File, index) => {
          const path = `properties/${id}/${Date.now()}_${index}`;
          return uploadImage(file, path);
        });

        const newImages = await Promise.all(uploadPromises);
        imageUrls = [...imageUrls, ...newImages];
      }

      // 獲取選定的房東資訊
      const selectedLandlord = mockLandlords.find(
        (l) => l.id === values.landlordId
      );

      if (!selectedLandlord) {
        throw new Error("選定的房東不存在");
      }

      // 創建風險因素
      let riskFactors: string[] = [];
      if (values.riskLevel === "high") {
        riskFactors = ["建築結構安全疑慮", "多次淹水紀錄", "消防設備不合格"];
      } else if (values.riskLevel === "medium") {
        riskFactors = ["噪音問題", "管線老舊"];
      }

      // 計算風險評分
      let riskScore = 0;
      if (values.riskLevel === "high") {
        riskScore = 75 + Math.floor(Math.random() * 25);
      } else if (values.riskLevel === "medium") {
        riskScore = 40 + Math.floor(Math.random() * 35);
      } else {
        riskScore = Math.floor(Math.random() * 30);
      }

      // 更新房源
      await updateProperty(id as string, {
        title: values.title,
        address: values.address,
        price: values.price,
        size: values.size,
        rooms: values.rooms,
        bathrooms: values.bathrooms,
        description: values.description,
        images: imageUrls,
        landlordId: values.landlordId,
        landlordName: selectedLandlord.name,
        riskLevel: values.riskLevel,
        riskScore,
        riskFactors,
      });

      toast({
        title: "更新成功",
        description: "房源已成功更新",
      });

      // 重定向到房源管理頁面
      router.push("/admin/properties");
    } catch (error) {
      console.error("Error updating property:", error);
      toast({
        variant: "destructive",
        title: "更新失敗",
        description: "更新房源時發生錯誤，請稍後再試",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 bg-muted/40 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
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
    );
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
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>標題</FormLabel>
                        <FormControl>
                          <Input placeholder="輸入房源標題" {...field} />
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
                          <Input
                            placeholder="例如：台北市信義區 XX 路"
                            {...field}
                          />
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
                          <FormLabel>租金（月）</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="輸入月租金"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>單位：新台幣</FormDescription>
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
                            <Input
                              type="number"
                              placeholder="輸入坪數"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>單位：坪</FormDescription>
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
                            <Input type="number" min={1} {...field} />
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
                            <Input type="number" min={1} {...field} />
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
                            placeholder="輸入房源詳細描述"
                            className="min-h-[200px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="landlordId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>房東</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="選擇房東" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {mockLandlords.map((landlord) => (
                              <SelectItem key={landlord.id} value={landlord.id}>
                                {landlord.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
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

                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>上傳更多圖片</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => onChange(e.target.files)}
                            {...fieldProps}
                          />
                        </FormControl>
                        <FormDescription>
                          可上傳多張房源照片，不會覆蓋現有照片
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {property.images && property.images.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">現有圖片</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {property.images.map((image, index) => (
                          <div
                            key={index}
                            className="relative h-20 rounded-md overflow-hidden"
                          >
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`房源圖片 ${index + 1}`}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        更新中...
                      </>
                    ) : (
                      "更新房源"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
