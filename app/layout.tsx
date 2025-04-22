import type React from "react"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/auth-context"
import { Providers } from "./providers"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "租屋避雷網 - 安心租屋的好幫手",
  description: "幫助租屋族避開潛在風險，提升租屋體驗的平台",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Providers>
            <AuthProvider>
              {children}
              <Toaster />
            </AuthProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'