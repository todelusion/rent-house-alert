import { AlertTriangle, Search, Shield, Star } from "lucide-react";

export function FeatureSection() {
  const features = [
    {
      name: "數據驅動型評價系統",
      description:
        "整合實價登錄、違建資料庫、消防安檢紀錄等結構化資料，以及用戶提交的圖文評價與糾紛紀錄。",
      icon: Star,
    },
    {
      name: "風險預警功能",
      description:
        "AI房東信用評分、圖像驗證系統檢測房源照片真實性，以及租約自動化比對功能。",
      icon: AlertTriangle,
    },
    {
      name: "安全防護機制",
      description:
        "雙因素認證系統整合TOTP與SMS驗證，定期執行安全掃描，保障用戶資料安全。",
      icon: Shield,
    },
  ];

  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            核心功能
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            我們提供多種功能，幫助您在租屋過程中避開潛在風險，提升租屋體驗。
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <feature.icon
                    className="h-5 w-5 flex-none text-primary"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
