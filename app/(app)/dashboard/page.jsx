"use client"
import StatsCards from "@/components/stats-cards"
import MapPlaceholder from "@/components/map-placeholder"
import LiveAlertsPanel from "@/components/live-alerts-panel"

export default function DashboardPage() {
  return (
    <div className="grid gap-4 grid-cols-1 xl:grid-cols-3">
      <div className="xl:col-span-2 space-y-4">
        <StatsCards />
        <MapPlaceholder />
      </div>
      <div className="xl:col-span-1">
        <LiveAlertsPanel />
      </div>
    </div>
  )
}
