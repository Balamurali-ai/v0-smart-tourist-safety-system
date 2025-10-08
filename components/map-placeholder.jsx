export default function MapPlaceholder() {
  return (
    <div className="rounded border bg-muted/30 text-muted-foreground p-4 h-[320px] flex flex-col">
      <div className="text-sm mb-2">Map View (mock)</div>
      <div className="flex-1 grid place-items-center text-xs">
        <div className="text-center">
          {"Tourist clusters: ●●● (blue)"}
          <br />
          {"Risk zones: ▇▇▇ (red heatmap)"}
        </div>
      </div>
      <div className="mt-2 flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-blue-500" /> Cluster
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 bg-red-500" /> Risk Zone
        </div>
      </div>
    </div>
  )
}
