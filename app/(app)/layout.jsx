"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-context"
import AppShell from "@/components/app-shell"

function Guard({ children }) {
  const { user } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (!user) router.replace("/")
  }, [user, router])
  return <AppShell>{children}</AppShell>
}

export default function AppLayout({ children }) {
  return <Guard>{children}</Guard>
}
