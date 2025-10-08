export default function Logo({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img src="/placeholder-logo.svg" alt="Smart Tourist Safety logo" className="h-6 w-6" />
      <span className="font-semibold text-foreground">Smart Tourist Safety</span>
    </div>
  )
}
