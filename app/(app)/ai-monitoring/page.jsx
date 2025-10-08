"use client"
import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Area, AreaChart } from "recharts"

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function AiMonitoringPage() {
  const { data } = useSWR("/api/anomalies", fetcher)
  const anomalies = data?.anomalies || []
  const movement = data?.movementSeries || []
  const anomalySeries = data?.anomalySeries || []

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-foreground">Flagged Tourists</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          {anomalies.map((a) => (
            <div key={a.id} className="rounded border p-3 bg-background">
              <div className="font-medium text-foreground">
                {a.name} • {a.flag}
              </div>
              <div className="text-xs text-muted-foreground">{a.reason}</div>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-foreground">Movement Patterns</CardTitle>
        </CardHeader>
        <CardContent className="h-[260px]">
          <ChartContainer config={{}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={movement}>
                <XAxis dataKey="time" stroke="currentColor" />
                <YAxis stroke="currentColor" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line type="monotone" dataKey="clusterDensity" stroke="#3b82f6" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-foreground">Anomalies Over Time</CardTitle>
        </CardHeader>
        <CardContent className="h-[260px]">
          <ChartContainer config={{}}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={anomalySeries}>
                <XAxis dataKey="time" stroke="currentColor" />
                <YAxis stroke="currentColor" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="count" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
