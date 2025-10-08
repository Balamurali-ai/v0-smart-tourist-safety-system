"use client"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Logo from "@/components/logo"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const { login, language, setLanguage, user } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("Police")

  if (user) router.replace("/dashboard")

  return (
    <div className="min-h-dvh grid place-items-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Logo />
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
                <SelectItem value="ta">Tamil</SelectItem>
                <SelectItem value="bn">Bengali</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <CardTitle className="text-xl text-foreground">Sign in</CardTitle>
          <CardDescription>Authorities portal only (Police & Tourism Dept.).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <RadioGroup value={role} onValueChange={setRole} className="flex gap-6">
              <div className="flex items-center gap-2">
                <RadioGroupItem id="police" value="Police" />
                <Label htmlFor="police">Police</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem id="tourism" value="Tourism Dept." />
                <Label htmlFor="tourism">Tourism Dept.</Label>
              </div>
            </RadioGroup>
          </div>
          <Button
            className="w-full"
            onClick={() => {
              login(username || "Officer", role)
              router.push("/dashboard")
            }}
          >
            Sign in
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
