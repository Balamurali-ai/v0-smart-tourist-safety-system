// components/alerts-frequency-chart.jsx
"use client"

import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { alertsFrequency } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AlertsFrequencyChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alerts Frequency</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={alertsFrequency}>
              <XAxis dataKey="day" stroke="#888888" fontSize={12} />
              <YAxis stroke="#888888" fontSize={12} />
              <Bar dataKey="alerts" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
