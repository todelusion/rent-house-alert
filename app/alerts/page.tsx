"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Search, User } from "lucide-react";

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState("landlords");
  const [searchTerm, setSearchTerm] = useState("");

  const landlordAlerts = [
    {
      id: 1,
      name: "張先生",
      properties: 5,
      riskLevel: "high",
      riskScore: 85,
      riskFactors: ["多起租金糾紛紀錄", "未依約返還押金", "私自進入房屋"],
    },
    {
      id: 2,
      name: "李小姐",
      properties: 3,
      riskLevel: "medium",
      riskScore: 65,
      riskFactors: ["拒絕修繕房屋問題", "租約內容不合理"],
    },
    {
      id: 3,
      name: "王先生",
      properties: 8,
      riskLevel: "low",
      riskScore: 25,
      riskFactors: ["偶有溝通不良情況"],
    },
  ];

  const propertyAlerts = [
    {
      id: 1,
      address: "地址",
      riskLevel: "high",
      riskScore: 90,
      riskFactors: ["建築結構安全疑慮", "多次淹水紀錄", "消防設備不合格"],
    },
    {
      id: 2,
      address: "地址",
      riskLevel: "medium",
      riskScore: 60,
      riskFactors: ["噪音問題", "管線老舊"],
    },
    {
      id: 3,
      address: "地址",
      riskLevel: "low",
      riskScore: 30,
      riskFactors: ["社區管理不佳"],
    },
  ];

  const filteredLandlords = landlordAlerts.filter((landlord) =>
    landlord.name.includes(searchTerm)
  );

  const filteredProperties = propertyAlerts.filter((property) =>
    property.address.includes(searchTerm)
  );

  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">避雷資訊</h1>

            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="搜尋房東或地址..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mb-8"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="landlords">房東避雷</TabsTrigger>
                <TabsTrigger value="properties">房屋避雷</TabsTrigger>
              </TabsList>

              <TabsContent value="landlords" className="mt-6 space-y-6">
                {filteredLandlords.length > 0 ? (
                  filteredLandlords.map((landlord) => (
                    <Card key={landlord.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl flex items-center gap-2">
                            <User className="h-5 w-5" />
                            {landlord.name}
                          </CardTitle>
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskBadgeColor(
                              landlord.riskLevel
                            )}`}
                          >
                            {landlord.riskLevel === "high"
                              ? "高風險"
                              : landlord.riskLevel === "medium"
                              ? "中風險"
                              : "低風險"}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-muted-foreground">
                              風險分數
                            </span>
                            <span className="font-medium">
                              {landlord.riskScore}/100
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                landlord.riskLevel === "high"
                                  ? "bg-red-500"
                                  : landlord.riskLevel === "medium"
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                              }`}
                              style={{ width: `${landlord.riskScore}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-2">風險因素</h3>
                          <ul className="space-y-1">
                            {landlord.riskFactors.map((factor, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2 text-sm"
                              >
                                <AlertTriangle className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" />
                                <span>{factor}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-4 pt-4 border-t">
                          <span className="text-sm text-muted-foreground">
                            擁有 {landlord.properties} 個房源
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12 bg-background rounded-lg shadow">
                    <p className="text-muted-foreground">
                      沒有找到符合條件的房東
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="properties" className="mt-6 space-y-6">
                {filteredProperties.length > 0 ? (
                  filteredProperties.map((property) => (
                    <Card key={property.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5" />
                            避雷房屋
                          </CardTitle>
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskBadgeColor(
                              property.riskLevel
                            )}`}
                          >
                            {property.riskLevel === "high"
                              ? "高風險"
                              : property.riskLevel === "medium"
                              ? "中風險"
                              : "低風險"}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4 font-medium">{property.address}</p>

                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-muted-foreground">
                              風險分數
                            </span>
                            <span className="font-medium">
                              {property.riskScore}/100
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                property.riskLevel === "high"
                                  ? "bg-red-500"
                                  : property.riskLevel === "medium"
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                              }`}
                              style={{ width: `${property.riskScore}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-2">風險因素</h3>
                          <ul className="space-y-1">
                            {property.riskFactors.map((factor, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2 text-sm"
                              >
                                <AlertTriangle className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" />
                                <span>{factor}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12 bg-background rounded-lg shadow">
                    <p className="text-muted-foreground">
                      沒有找到符合條件的房屋
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
