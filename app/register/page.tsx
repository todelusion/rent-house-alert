"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()

  useEffect(() => {
    // 重定向到登入頁面
    router.push("/login")
  }, [router])

  return null
}

