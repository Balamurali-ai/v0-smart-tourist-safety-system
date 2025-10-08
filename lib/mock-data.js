export const stats = {
  activeTourists: 1284,
  ongoingAlerts: 12,
  missingReports: 3,
  responseRate: 92,
  avgResponseTime: "7m 45s",
}

export const alerts = [
  {
    id: "A-1001",
    location: "Gateway of India, Mumbai",
    severity: "High",
    status: "New",
    timestamp: "10:24 AM",
    message: "Distress signal triggered",
  },
  {
    id: "A-1002",
    location: "India Gate, Delhi",
    severity: "Medium",
    status: "New",
    timestamp: "10:21 AM",
    message: "Prolonged inactivity detected",
  },
  {
    id: "A-1003",
    location: "Charminar, Hyderabad",
    severity: "Low",
    status: "New",
    timestamp: "10:18 AM",
    message: "Route deviation observed",
  },
  {
    id: "A-1004",
    location: "Jaipur City Palace",
    severity: "High",
    status: "New",
    timestamp: "10:15 AM",
    message: "SOS tapped",
  },
  {
    id: "A-1005",
    location: "Goa Baga Beach",
    severity: "Low",
    status: "New",
    timestamp: "10:05 AM",
    message: "Unusual clustering",
  },
  {
    id: "A-1006",
    location: "Varanasi Ghats",
    severity: "Medium",
    status: "New",
    timestamp: "09:58 AM",
    message: "Drop in movement",
  },
  {
    id: "A-1007",
    location: "Mysore Palace",
    severity: "Low",
    status: "New",
    timestamp: "09:50 AM",
    message: "Delay at checkpoint",
  },
]

export const tourists = [
  {
    id: "T-0001",
    name: "Aarav Sharma",
    itinerary: "Mumbai → Goa → Hampi",
    safetyScore: 86,
    emergencyContacts: [{ name: "R. Sharma", phone: "+91 98xxxxxx10" }],
    history: [
      { date: "2025-09-28", location: "Colaba, Mumbai", type: "Check-in", severity: "Low" },
      { date: "2025-09-29", location: "Baga Beach, Goa", type: "Delay", severity: "Low" },
    ],
  },
  {
    id: "T-0002",
    name: "Isha Verma",
    itinerary: "Delhi → Agra → Jaipur",
    safetyScore: 73,
    emergencyContacts: [{ name: "A. Verma", phone: "+91 99xxxxxx22" }],
    history: [
      { date: "2025-09-27", location: "India Gate, Delhi", type: "Route deviation", severity: "Medium" },
      { date: "2025-09-29", location: "Jaipur City Palace", type: "SOS", severity: "High" },
    ],
  },
  {
    id: "T-0003",
    name: "Carlos Santos",
    itinerary: "Hyderabad → Hampi → Goa",
    safetyScore: 90,
    emergencyContacts: [{ name: "M. Santos", phone: "+55 21xxxxxx90" }],
    history: [
      { date: "2025-09-26", location: "Charminar, Hyderabad", type: "Check-in", severity: "Low" },
      { date: "2025-09-28", location: "Hampi", type: "Prolonged inactivity", severity: "Medium" },
    ],
  },
]

export const anomalies = [
  { id: "T-0002", name: "Isha Verma", flag: "Distress", reason: "SOS + High severity alert" },
  { id: "T-0001", name: "Aarav Sharma", flag: "Silent", reason: "No movement for 2h" },
]

export const movementSeries = [
  { time: "10:00", clusterDensity: 20 },
  { time: "10:10", clusterDensity: 28 },
  { time: "10:20", clusterDensity: 24 },
  { time: "10:30", clusterDensity: 32 },
  { time: "10:40", clusterDensity: 29 },
]

export const anomalySeries = [
  { time: "10:00", count: 1 },
  { time: "10:10", count: 2 },
  { time: "10:20", count: 1 },
  { time: "10:30", count: 3 },
  { time: "10:40", count: 2 },
]

export const touristDensity = [
  { region: "Mumbai", count: 420 },
  { region: "Delhi", count: 360 },
  { region: "Goa", count: 180 },
  { region: "Jaipur", count: 140 },
]

export const alertsFrequency = [
  { day: "Mon", alerts: 8 },
  { day: "Tue", alerts: 12 },
  { day: "Wed", alerts: 10 },
  { day: "Thu", alerts: 16 },
  { day: "Fri", alerts: 11 },
  { day: "Sat", alerts: 9 },
  { day: "Sun", alerts: 7 },
]

export const responseTimes = [
  { day: "Mon", minutes: 8.2 },
  { day: "Tue", minutes: 7.5 },
  { day: "Wed", minutes: 6.9 },
  { day: "Thu", minutes: 7.8 },
  { day: "Fri", minutes: 7.1 },
  { day: "Sat", minutes: 8.0 },
  { day: "Sun", minutes: 7.4 },
]
