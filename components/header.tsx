"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Shield,
  Menu,
  X,
  User,
  LogOut,
  Home,
  Search,
  AlertTriangle,
} from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, userData, logout } = useAuth();

  const navigation = [
    { name: "首頁", href: "/", icon: Home },
    { name: "搜尋房源", href: "/properties", icon: Search },
    { name: "避雷資訊", href: "/alerts", icon: AlertTriangle },
    { name: "新增評價", href: "/add-review", icon: AlertTriangle },
    { name: "新增房源", href: "/add-property", icon: Home },
  ];

  return (
    <header className="bg-background border-b">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl">租屋避雷網</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setIsMenuOpen(true)}
          >
            <span className="sr-only">開啟選單</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold leading-6 ${
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                <Shield className="h-8 w-8 text-primary" />
                <span className="font-bold text-xl">租屋避雷網</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="sr-only">關閉選單</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`-mx-3 flex items-center gap-2 rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                        pathname === item.href
                          ? "text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
