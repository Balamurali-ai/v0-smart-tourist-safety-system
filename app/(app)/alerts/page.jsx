"use client"
import useSWR, { mutate } from "swr"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const fetcher = (url) => fetch(url).then((r) => r.json())
const severityTone = (s) =>
  s === "High" ? "bg-red-600 text-white" : s === "Medium" ? "bg-yellow-500 text-black" : "bg-green-600 text-white"

export default function AlertsPage() {
  const { data } = useSWR("/api/alerts", fetcher)
  const alerts = data?.alerts || []

  const setStatus = (id, status) => {
    mutate(
      "/api/alerts",
      (current) => {
        const updated = current ? { ...current } : { alerts: [] }
        updated.alerts = (updated.alerts || []).map((a) => (a.id === id ? { ...a, status } : a))
        return updated
      },
      false,
    )
  }

  return (
    <div className="grid gap-4">
      {alerts.map((a) => (
        <Card key={a.id}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-foreground flex items-center justify-between">
              <span>
                {a.location} • {a.timestamp}
              </span>
              <Badge className={severityTone(a.severity)}>{a.severity}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">{a.message}</div>
            <div className="text-xs text-muted-foreground mt-1">Status: {a.status}</div>
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="secondary" onClick={() => setStatus(a.id, "Acknowledged")}>
                Acknowledge
              </Button>
              <Button size="sm" variant="outline" onClick={() => setStatus(a.id, "Resolved")}>
                Resolve
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <div className="mt-2">
        <div className="text-sm text-muted-foreground">Map View (mock) for last known positions</div>
        <div className="h-[260px] rounded border bg-muted/30 grid place-items-center text-xs text-muted-foreground">
          {"Pins show last known positions"}
        </div>
      </div>
    </div>
  )
}
