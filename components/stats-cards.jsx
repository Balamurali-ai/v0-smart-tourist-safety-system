"use client"
import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function StatsCards() {
  const { data } = useSWR("/api/stats", fetcher, { suspense: false })
  const stats = data?.stats || {}

  const items = [
    { label: "Active Tourists", value: stats.activeTourists ?? 0 },
    { label: "Ongoing Alerts", value: stats.ongoingAlerts ?? 0 },
    { label: "Missing Reports", value: stats.missingReports ?? 0 },
    { label: "Response Rate %", value: stats.responseRate ?? 0 },
    { label: "Avg Response Time", value: stats.avgResponseTime ?? "—" },
  ]

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3 xl:grid-cols-5">
      {items.map((it) => (
        <Card key={it.label}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">{it.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-foreground">{it.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
