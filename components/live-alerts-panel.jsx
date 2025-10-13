"use client"

// 1. Import useState and useEffect from React
import { useState, useEffect } from 'react'
import { mockAlerts } from "@/lib/mock-data" // Make sure this path is correct

// A helper function to simulate fetching new data.
// In a real app, this would be an API call.
const fetchLiveAlerts = () => {
  // To make it feel "live", let's randomly slice the mock data
  // to simulate alerts appearing and disappearing.
  const allAlerts = mockAlerts
  const start = Math.floor(Math.random() * (allAlerts.length - 2))
  const end = start + 2 + Math.floor(Math.random() * 2)
  return allAlerts.slice(start, end)
}

export default function LiveAlertsPanel() {
  // 2. Use state to store the alerts. When this changes, the UI will update.
  const [alerts, setAlerts] = useState([])

  // 3. This useEffect hook sets up the auto-refreshing timer.
  useEffect(() => {
    // Function to get the latest alerts and update our state
    const refreshAlerts = () => {
      const newAlerts = fetchLiveAlerts()
      console.log("Live alerts refreshed!", newAlerts)
      setAlerts(newAlerts)
    }

    // Run it once immediately to load the initial data
    refreshAlerts()

    // Set up a timer to run refreshAlerts every 10 seconds (10000 ms)
    const intervalId = setInterval(refreshAlerts, 10000)

    // IMPORTANT: Cleanup function to stop the timer when you navigate away
    return () => clearInterval(intervalId)
  }, []) // The empty array [] ensures this runs only once when the component mounts

  return (
    <div className="bg-card p-4 rounded-lg shadow h-full">
      <h2 className="font-semibold text-lg mb-4">Live Alerts</h2>
      {alerts.length > 0 ? (
        <div className="space-y-4">
          {/* 4. We now map over the 'alerts' from our state to display them */}
          {alerts.map((alert) => (
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
              <p className="font-semibold text-sm mb-3">{alert.type}</p>
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
        <p className="text-muted-foreground text-sm">No active alerts.</p>
      )}
    </div>
  )
}
