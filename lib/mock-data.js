// This is the correct content for lib/mock-data.js

export const stats = {
  activeTourists: 1284,
  ongoingAlerts: 12,
  missingReports: 3,
  responseRate: 92,
  avgResponseTime: "7m 45s",
};

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
];

// ... the rest of your data arrays (tourists, anomalies, etc.) can also go here
