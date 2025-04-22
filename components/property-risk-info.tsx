import type { Property } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react"

interface PropertyRiskInfoProps {
  property: Property
}

export function PropertyRiskInfo({ property }: PropertyRiskInfoProps) {
  const getRiskColor = () => {
    switch (property.riskLevel) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-green-500"
      default:
        return "text-muted-foreground"
    }
  }

  const getRiskScoreColor = () => {
    if (!property.riskScore) return "bg-muted"

    if (property.riskScore < 30) {
      return "bg-green-500"
    } else if (property.riskScore < 70) {
      return "bg-yellow-500"
    } else {
      return "bg-red-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>風險評估</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {property.riskScore ? (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">風險分數</span>
                <span className={`font-bold ${getRiskColor()}`}>{property.riskScore}/100</span>
              </div>
              <Progress value={property.riskScore} className={getRiskScoreColor()} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">風險因素</h3>
              {property.riskFactors && property.riskFactors.length > 0 ? (
                <ul className="space-y-2">
                  {property.riskFactors.map((factor, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">沒有發現明顯風險因素</p>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">安全檢查</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>房屋所有權已驗證</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>無違建紀錄</span>
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-500" />
                  <span>未通過最新消防安檢</span>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-muted-foreground">此房源尚未進行風險評估</div>
        )}
      </CardContent>
    </Card>
  )
}

