"use client"

import { useState } from "react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { getProperties, deleteProperty } from "@/lib/property-service"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import { Edit, Plus, Trash } from "lucide-react"

export default function ManagePropertiesPage() {
  const [isDeleting, setIsDeleting] = useState(false)
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["manageProperties"],
    queryFn: () => getProperties(null, 100),
  })

  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    try {
      await deleteProperty(id)
      toast({
        title: "刪除成功",
        description: "房源已成功刪除",
      })
      refetch()
    } catch (error) {
      console.error("Error deleting property:", error)
      toast({
        variant: "destructive",
        title: "刪除失敗",
        description: "刪除房源時發生錯誤",
      })
    } finally {
      setIsDeleting(false)
      setPropertyToDelete(null)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">管理房源</h1>
            <Button asChild>
              <Link href="/properties/new">
                <Plus className="mr-2 h-4 w-4" />
                新增房源
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>房源列表</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">載入中...</div>
              ) : data?.properties && data.properties.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>標題</TableHead>
                      <TableHead>地址</TableHead>
                      <TableHead>價格</TableHead>
                      <TableHead>房間數</TableHead>
                      <TableHead>風險等級</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.properties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell className="font-medium">{property.title}</TableCell>
                        <TableCell>{property.address}</TableCell>
                        <TableCell>NT$ {property.price.toLocaleString()}</TableCell>
                        <TableCell>
                          {property.rooms} 房 {property.bathrooms} 衛
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              property.riskLevel === "high"
                                ? "bg-red-100 text-red-800"
                                : property.riskLevel === "medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {property.riskLevel === "high"
                              ? "高風險"
                              : property.riskLevel === "medium"
                                ? "中風險"
                                : "低風險"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/properties/edit/${property.id}`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => setPropertyToDelete(property.id)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>確認刪除</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    您確定要刪除此房源嗎？此操作無法撤銷。
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>取消</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(property.id)} disabled={isDeleting}>
                                    {isDeleting ? "刪除中..." : "確認刪除"}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">目前沒有房源，請點擊「新增房源」按鈕添加</div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

