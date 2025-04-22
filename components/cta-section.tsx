import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <div className="bg-primary">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
          加入我們，共同打造安心租屋環境
        </h2>
        <p className="mt-6 text-lg leading-8 text-primary-foreground/90">
          分享您的租屋經驗，幫助更多人避開租屋陷阱，一起建立更透明的租屋市場。
        </p>
      </div>
    </div>
  );
}
