import { NextResponse } from "next/server";
import { alerts } from "@/lib/mock-data"; // Import your mock alerts

export async function GET(request: Request) {
  // To make it feel "live", we'll randomly slice the alerts each time
  const start = Math.floor(Math.random() * (alerts.length - 2));
  const end = start + 3 + Math.floor(Math.random() * 3);
  const liveAlerts = alerts.slice(start, end);

  return NextResponse.json({ alerts: liveAlerts });
}
