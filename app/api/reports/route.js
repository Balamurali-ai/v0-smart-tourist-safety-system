import { touristDensity, alertsFrequency, responseTimes } from "@/lib/mock-data"

export async function GET() {
  return Response.json({ touristDensity, alertsFrequency, responseTimes })
}
