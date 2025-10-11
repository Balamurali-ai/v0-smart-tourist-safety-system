import { Shield } from "lucide-react" // 1. Add this import for the shield icon

export default function Logo({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* 2. Replace the <img> tag with the Shield icon component */}
      <Shield className="h-6 w-6" />
      <span className="font-semibold text-foreground">Smart Tourist Safety</span>
    </div>
  )
}
