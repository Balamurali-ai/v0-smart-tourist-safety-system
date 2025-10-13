"use client"
import Link from "next/link"
import { Menu } from "lucide-react" // 1. Import the Menu icon for the hamburger button
import { usePathname, useRouter } from "next/navigation"

import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "./auth-context"
import Logo from "./logo"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet" // 2. Import the Sheet components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const NAV_LINKS = [
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

  // This component will now handle its own redirect logic or rendering based on user state
  if (!user) {
    // In a real app, a Guard component would handle this, but for now, we prevent rendering the shell.
    return children 
  }

  const isActive = (href) => pathname === href

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[240px_1fr]">
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden border-r bg-background md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Logo />
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                    isActive(item.href)
                      ? "bg-muted text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4 border-t">
              <div className="text-xs text-muted-foreground">
                  Signed in as
                  <div className="font-medium text-foreground">
                      {user.username} ({user.role})
                  </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => { logout(); router.push("/"); }}>
                  Log out
              </Button>
          </div>
        </div>
      </aside>

      <div className="flex flex-col">
        {/* --- MOBILE & DESKTOP HEADER --- */}
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          {/* 3. This is the new Mobile Hamburger Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Logo />
                {NAV_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
                      isActive(item.href)
                        ? "bg-muted text-foreground"
                        - "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* 4. Header controls moved to the right side */}
          <div className="w-full flex-1">
            {/* You can add a search bar here if you want */}
          </div>
          <div className="flex items-center gap-3">
              <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-[120px] md:w-[160px]">
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
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
