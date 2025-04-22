"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const propertyFormSchema = z.object({
  title: z.string().min(5, "標題至少需要5個字元"),
  address: z.string().min(5, "地址至少需要5個字元"),
  price: z.coerce.number().min(1000, "租金至少需要1000元"),
  size: z.coerce.number().min(1, "坪數至少需要1坪"),
  rooms: z.coerce.number().min(1, "至少需要1間房間"),
  bathrooms: z.coerce.number().min(1, "至少需要1間浴室"),
  description: z.string().min(10, "描述至少需要10個字元"),
  images: z.any().optional(),
});

export default function AddPropertyPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof propertyFormSchema>>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      title: "",
      address: "",
      price: 20000,
      size: 20,
      rooms: 2,
      bathrooms: 1,
      description: "",
      images: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof propertyFormSchema>) => {
    setIsSubmitting(true);

    try {
      // In a real app, we would upload images and save the property to Firestore
      // For now, we'll just simulate a successful submission
      console.log("Property submitted:", values);

      toast({
        title: "房源已新增",
        description: "您的房源已成功新增",
      });

      // Redirect to properties page
      router.push("/properties");
    } catch (error) {
      console.error("Error adding property:", error);
      toast({
        variant: "destructive",
        title: "新增失敗",
        description: "新增房源時發生錯誤，請稍後再試",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">新增房源</h1>

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
                            <Input
                              placeholder="例如：信義區豪華兩房公寓"
                              {...field}
                            />
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
                            <FormLabel>租金 (每月)</FormLabel>
                            <FormControl>
                              <Input type="number" min="1000" {...field} />
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
                              <Input type="number" min="1" {...field} />
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
                            <FormLabel>浴室數</FormLabel>
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
                              placeholder="詳細描述房源特色、設備、周邊環境等..."
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="images"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>上傳照片</FormLabel>
                          <FormControl>
                            <Input
                              id="images"
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={(e) => {
                                const files = Array.from(e.target.files || []);
                                field.onChange(files);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          提交中...
                        </>
                      ) : (
                        "新增房源"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
