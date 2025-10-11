"use client"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle" 
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "./auth-context"
import Logo from "./logo"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const NAV = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tourists", label: "Tourist Management" },
  { href: "/alerts", label: "Alerts & Incidents" },
  { href: "/ai-monitoring", label: "AI Monitoring" },
  { href: "/reports", label: "Reports & Analytics" },
  { href: "/settings", label: "Settings" },
]

export default function AppShell({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout, language, setLanguage } = useAuth()

  if (!user) return children

  const isActive = (href) => pathname === href

  return (
    <div className="min-h-dvh grid md:grid-cols-[240px_1fr]">
      <aside className="hidden md:flex flex-col border-r bg-background">
        <div className="h-14 px-4 flex items-center border-b">
          <Logo />
        </div>
        <nav className="p-2">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded px-3 py-2 text-sm ${
                isActive(item.href) ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-accent"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto p-3 border-t space-y-3">
          <div className="text-xs text-muted-foreground">
            Signed in as
            <div className="text-foreground font-medium">
              {user.username} ({user.role})
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full bg-transparent"
            onClick={() => {
              logout()
              router.push("/")
            }}
          >
            Log out
          </Button>
        </div>
      </aside>
      <main className="flex flex-col min-h-dvh">
        <header className="h-14 border-b bg-background px-4 flex items-center justify-between">
          <Logo className="md:hidden" />
          <div className="flex items-center gap-3">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
                <SelectItem value="ta">Tamil</SelectItem>
                <SelectItem value="bn">Bengali</SelectItem>
              </SelectContent>
            </Select>
               <ThemeToggle />
          </div>
        </header>
        <div className="p-4">{children}</div>
      </main>
    </div>
  )
}
