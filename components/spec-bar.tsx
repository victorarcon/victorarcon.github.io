type SpecBarProps = {
  label: string
  value: string
  ratio: number
}

export function SpecBar({ label, value, ratio }: SpecBarProps) {
  const width = `${Math.round(Math.max(0.04, Math.min(1, ratio)) * 100)}%`
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{label}</span>
        <span className="font-mono text-sm font-semibold">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted" aria-hidden="true">
        <div
          className="h-full origin-left rounded-full bg-primary transition-[width] duration-700 ease-out"
          style={{ width }}
        />
      </div>
    </div>
  )
}
