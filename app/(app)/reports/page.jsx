// app/(app)/reports/page.jsx
import { AlertsFrequencyChart } from "@/components/alerts-frequency-chart"
import { Button } from "@/components/ui/button"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <Button>Export Report</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder for now */}
        <div className="bg-card p-4 rounded-lg shadow">Tourist Density Chart</div>

        {/* This chart is now dynamic! */}
        <AlertsFrequencyChart />

        {/* Placeholder for now */}
        <div className="bg-card p-4 rounded-lg shadow">Response Times Chart</div>
      </div>
    </div>
  )
}
