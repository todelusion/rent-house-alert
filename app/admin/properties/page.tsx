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
import { toast } from "@/components/ui/use-toast"
import { PlusCircle, Edit, Trash2 } from "lucide-react"

export default function AdminPropertiesPage() {
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["adminProperties"],
    queryFn: () => getProperties(null, 100, {}),
  })

  const handleDelete = async () => {
    if (!deleteId) return

    setIsDeleting(true)
    try {
      await deleteProperty(deleteId)
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
        description: "刪除房源時發生錯誤，請稍後再試",
      })
    } finally {
      setIsDeleting(false)
      setDeleteId(null)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">房源管理</h1>
            <Button asChild>
              <Link href="/admin/properties/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                新增房源
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>所有房源</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">載入中...</div>
              ) : error ? (
                <div className="text-center py-8 text-red-500">發生錯誤，請稍後再試</div>
              ) : data?.properties && data.properties.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>標題</TableHead>
                        <TableHead>地址</TableHead>
                        <TableHead>價格</TableHead>
                        <TableHead>房型</TableHead>
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
                          <TableCell className="text-right space-x-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/admin/properties/${property.id}`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <AlertDialog open={deleteId === property.id} onOpenChange={() => setDeleteId(null)}>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-500 hover:text-red-700"
                                  onClick={() => setDeleteId(property.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>確定要刪除此房源？</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    此操作無法撤銷，刪除後所有相關資料將被永久移除。
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>取消</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="bg-red-500 hover:bg-red-700"
                                  >
                                    {isDeleting ? "刪除中..." : "刪除"}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">暫無房源資料</div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

