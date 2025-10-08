"use client"
import useSWR, { mutate } from "swr"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const fetcher = (url) => fetch(url).then((r) => r.json())

const severityColor = (s) =>
  s === "High" ? "bg-red-600 text-white" : s === "Medium" ? "bg-yellow-500 text-black" : "bg-green-600 text-white"

export default function LiveAlertsPanel() {
  const { data } = useSWR("/api/alerts", fetcher, { suspense: false })
  const alerts = data?.alerts?.slice(0, 6) || []

  const mark = async (id, status) => {
    // mock change locally only
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
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Live Alerts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((a) => (
          <div key={a.id} className="rounded border p-3 bg-background">
            <div className="flex items-center justify-between">
              <div className="font-medium text-foreground">{a.location}</div>
              <Badge className={severityColor(a.severity)}>{a.severity}</Badge>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {a.timestamp} • Status: {a.status}
            </div>
            <div className="text-sm mt-2">{a.message}</div>
            <div className="mt-3 flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => mark(a.id, "Acknowledged")}>
                Acknowledge
              </Button>
              <Button variant="outline" size="sm" onClick={() => mark(a.id, "Resolved")}>
                Resolve
              </Button>
            </div>
          </div>
        ))}
        <Button className="w-full bg-transparent" variant="outline">
          View All Alerts
        </Button>
      </CardContent>
    </Card>
  )
}
