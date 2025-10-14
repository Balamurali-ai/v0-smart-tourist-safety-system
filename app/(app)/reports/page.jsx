"use client"
import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Line, LineChart } from "recharts"

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function ReportsPage() {
  const { data } = useSWR("/api/reports", fetcher)
  const density = data?.touristDensity || []
  const frequency = data?.alertsFrequency || []
  const response = data?.responseTimes || []

  const exportReport = () => {
    const blob = new Blob([JSON.stringify(data || {}, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "smart-tourist-safety-report.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-foreground">Tourist Density</CardTitle>
        </CardHeader>
        <CardContent className="h-[240px]">
          <ChartContainer config={{}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={density}>
                <XAxis dataKey="region" stroke="currentColor" />
                <YAxis stroke="currentColor" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-foreground">Alerts Frequency</CardTitle>
        </CardHeader>
        <CardContent className="h-[240px]">
          <ChartContainer config={{}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={frequency}>
                <XAxis dataKey="day" stroke="currentColor" />
                <YAxis stroke="currentColor" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="alerts" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="lg:col-span-1">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-foreground">Response Times</CardTitle>
          <Button size="sm" variant="outline" onClick={exportReport}>
            Export Report
          </Button>
        </CardHeader>
        <CardContent className="h-[240px]">
          <ChartContainer config={{}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={response}>
                <XAxis dataKey="day" stroke="currentColor" />
                <YAxis stroke="currentColor" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="minutes" stroke="#10b981" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
