import Link from "next/link";
import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">租屋避雷網</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              幫助租屋族避開潛在風險，提升租屋體驗的平台
            </p>
            <div className="flex space-x-6">
              {/* Social media links can be added here */}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  平台功能
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="/properties"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      搜尋房源
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/alerts"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      避雷資訊
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/add-review"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      新增評價
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-foreground">支援</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="/faq"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      常見問題
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      聯絡我們
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground">法律</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="/privacy"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      隱私政策
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      使用條款
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-foreground">公司</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="/about"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      關於我們
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} 租屋避雷網. 保留所有權利.
          </p>
        </div>
      </div>
    </footer>
  );
}
