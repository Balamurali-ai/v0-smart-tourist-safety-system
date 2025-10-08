import { anomalies, movementSeries, anomalySeries } from "@/lib/mock-data"

export async function GET() {
  return Response.json({ anomalies, movementSeries, anomalySeries })
}
