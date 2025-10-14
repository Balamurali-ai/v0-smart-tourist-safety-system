"use client"
import useSWR from "swr" // 1. Import SWR
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button";

// A simple function to fetch data for SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function LiveAlertsPanel() {
  // 2. Use the SWR hook to fetch and auto-refresh data
  const { data, error } = useSWR(
    "/api/alerts",
    fetcher,
    { refreshInterval: 10000 } // Re-fetch every 10 seconds
  );

  // 3. Handle loading and error states gracefully
  if (error) return <div className="p-4">Failed to load alerts.</div>
  if (!data) return <div className="p-4">Loading alerts...</div>

  const liveAlerts = data.alerts || [];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Live Alerts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {liveAlerts.length > 0 ? (
          liveAlerts.map((alert) => (
            <div key={alert.id} className="p-3 rounded-lg bg-muted/50">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-sm">{alert.location}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    alert.severity === "High" ? "bg-destructive/20 text-destructive" : "bg-secondary"
                  }`}
                >
                  {alert.severity}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {alert.timestamp} • Status: {alert.status}
              </p>
              <p className="font-semibold text-sm mb-3">{alert.message}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Acknowledge</Button>
                <Button size="sm" variant="outline">Resolve</Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-sm">No active alerts.</p>
        )}
      </CardContent>
    </Card>
  )
}
