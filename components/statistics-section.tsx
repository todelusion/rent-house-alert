export function StatisticsSection() {
  const stats = [
    { id: 1, name: "資訊不對稱率", value: "72%" },
    { id: 2, name: "租賃糾紛年增率", value: "19%" },
    { id: 3, name: "平均看房次數", value: "8.3次" },
    { id: 4, name: "房東評分機制覆蓋率", value: "11%" },
  ]

  return (
    <div className="bg-muted py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">台灣租屋市場現況</h2>
          <p className="mt-6 text-base leading-7 text-muted-foreground">
            租屋市場長期存在資訊不對稱問題，我們致力於改善這一現況，提供更透明的租屋環境。
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col items-center">
                <dt className="text-base leading-7 text-muted-foreground">{stat.name}</dt>
                <dd className="mt-2 text-3xl font-bold leading-9 tracking-tight text-foreground">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

