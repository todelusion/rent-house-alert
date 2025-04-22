import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function HeroSection() {
  return (
    <div className="relative isolate overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">安心租屋，從避開風險開始</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            租屋避雷網幫助您識別潛在風險，提供真實評價與風險預警，讓您的租屋體驗更加安心。
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input type="text" placeholder="輸入地址、社區或房東名稱..." className="pl-10 w-full" />
            </div>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/properties">搜尋房源</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

