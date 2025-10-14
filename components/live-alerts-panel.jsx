"use client"

import { useState, useEffect } from 'react'

// This line now correctly imports the `alerts` variable from your data file.
import { alerts as mockAlerts } from "@/lib/mock-data" 

// A safer helper function that prevents crashes
const fetchLiveAlerts = () => {
  if (!Array.isArray(mockAlerts) || mockAlerts.length < 3) {
    return [];
  }
  const allAlerts = mockAlerts
  const start = Math.floor(Math.random() * (allAlerts.length - 2))
  const end = start + 2 + Math.floor(Math.random() * 2)
  return allAlerts.slice(start, end)
}

export default function LiveAlertsPanel() {
  const [liveAlerts, setLiveAlerts] = useState([])

  useEffect(() => {
    const refreshAlerts = () => {
      const newAlerts = fetchLiveAlerts()
      console.log("Live alerts refreshed at:", new Date().toLocaleTimeString())
      setLiveAlerts(newAlerts)
    }
    refreshAlerts()
    const intervalId = setInterval(refreshAlerts, 10000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="bg-card p-4 rounded-lg shadow h-full">
      <h2 className="font-semibold text-lg mb-4">Live Alerts</h2>
      {liveAlerts.length > 0 ? (
        <div className="space-y-4">
          {liveAlerts.map((alert) => (
            <div key={alert.id} className="p-3 rounded-lg bg-muted/50">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-sm">{alert.location}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    alert.severity === "High" ? "bg-destructive/20 text-destructive-foreground" : "bg-secondary"
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
                <button className="text-xs px-3 py-1 rounded bg-primary/80 text-primary-foreground hover:bg-primary">
                  Acknowledge
                </button>
                <button className="text-xs px-3 py-1 rounded bg-secondary hover:bg-secondary/80">
                  Resolve
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">No active alerts. Waiting for data...</p>
      )}
    </div>
  )
}
