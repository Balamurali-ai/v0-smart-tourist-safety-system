"use client"
import { useMemo, useState } from "react"
import useSWR from "swr"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function TouristsPage() {
  const { data } = useSWR("/api/tourists", fetcher)
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState(null)
  const tourists = data?.tourists || []

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return tourists
    return tourists.filter((t) => t.id.toLowerCase().includes(q) || t.name.toLowerCase().includes(q))
  }, [query, tourists])

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
      <div className="lg:col-span-1 space-y-3">
        <Input placeholder="Search by ID or name" value={query} onChange={(e) => setQuery(e.target.value)} />
        <div className="rounded border divide-y max-h-[420px] overflow-auto bg-background">
          {filtered.map((t) => (
            <button
              key={t.id}
              className={`w-full text-left px-3 py-2 hover:bg-accent ${selected?.id === t.id ? "bg-muted" : ""}`}
              onClick={() => setSelected(t)}
            >
              <div className="font-medium text-foreground">{t.name}</div>
              <div className="text-xs text-muted-foreground">ID: {t.id}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="lg:col-span-2 space-y-4">
        {selected ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">{selected.name}</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div>
                    <span className="text-muted-foreground">Digital ID:</span> {selected.id}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Safety Score:</span> {selected.safetyScore}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Itinerary:</span> {selected.itinerary}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Emergency Contacts:</div>
                  <ul className="list-disc pl-5">
                    {selected.emergencyContacts.map((c, i) => (
                      <li key={i}>
                        {c.name} - {c.phone}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Alerts / History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Severity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selected.history.map((h, i) => (
                      <TableRow key={i}>
                        <TableCell>{h.date}</TableCell>
                        <TableCell>{h.location}</TableCell>
                        <TableCell>{h.type}</TableCell>
                        <TableCell>{h.severity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Button onClick={() => alert("E-FIR generated (mock).")}>Generate E-FIR</Button>
          </>
        ) : (
          <div className="text-muted-foreground">Select a tourist to view details.</div>
        )}
      </div>
    </div>
  )
}
