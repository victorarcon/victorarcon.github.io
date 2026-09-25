'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { formatPrice } from '@/lib/cars'
import { cn } from '@/lib/utils'

const BASE_PRICE = 98500

const colors = [
  { id: 'azul', name: 'Azul Gulf', swatch: '#9fcde6', image: '/config/azul.png', price: 0 },
  { id: 'naranja', name: 'Naranja Carrera', swatch: '#ef6a2a', image: '/config/naranja.png', price: 1800 },
  { id: 'plata', name: 'Plata Ártico', swatch: '#c3c8cc', image: '/config/plata.png', price: 900 },
  { id: 'negro', name: 'Negro Medianoche', swatch: '#15191d', image: '/config/negro.png', price: 1200 },
]

const wheels = [
  { id: '19', name: '19" Estándar', price: 0 },
  { id: '20', name: '20" Forjadas', price: 3200 },
  { id: '21', name: '21" Carbono', price: 7400 },
]

const extras = [
  { id: 'carbono', name: 'Pack exterior de carbono', price: 5600 },
  { id: 'frenos', name: 'Frenos carbocerámicos', price: 8900 },
  { id: 'escape', name: 'Escape deportivo', price: 3100 },
  { id: 'baquet', name: 'Asientos baquet', price: 4200 },
]

export function Configurator() {
  const [colorId, setColorId] = useState(colors[0].id)
  const [wheelId, setWheelId] = useState(wheels[0].id)
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])
  const [copied, setCopied] = useState(false)

  const color = colors.find((c) => c.id === colorId) ?? colors[0]
  const wheel = wheels.find((w) => w.id === wheelId) ?? wheels[0]
  const chosenExtras = extras.filter((e) => selectedExtras.includes(e.id))
  const total = BASE_PRICE + color.price + wheel.price + chosenExtras.reduce((sum, e) => sum + e.price, 0)

  const toggleExtra = (id: string) =>
    setSelectedExtras((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const copySummary = async () => {
    const summary = [
      'Mi coupé BOXES',
      `Color: ${color.name}`,
      `Llantas: ${wheel.name}`,
      `Extras: ${chosenExtras.map((e) => e.name).join(', ') || 'ninguno'}`,
      `Total: ${formatPrice(total)}`,
    ].join('\n')
    try {
      await navigator.clipboard.writeText(summary)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section
      id="configurador"
      aria-labelledby="configurador-titulo"
      className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-20 md:px-8 md:py-28"
    >
      <SectionHeading
        id="configurador-titulo"
        eyebrow="Hazlo tuyo"
        title="Configurador"
        description="Elige la pintura, las llantas y los extras de tu coupé. El precio se actualiza al instante."
      />

      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="flex flex-col gap-4">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
            {colors.map((c) => (
              <Image
                key={c.id}
                src={c.image || '/placeholder.svg'}
                alt={c.id === colorId ? `Coupé en color ${c.name}` : ''}
                aria-hidden={c.id !== colorId}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className={cn(
                  'object-cover transition-all duration-700 ease-out',
                  c.id === colorId ? 'scale-100 opacity-100' : 'scale-105 opacity-0',
                )}
              />
            ))}
            <div className="absolute bottom-4 left-4 rounded-md bg-background/90 px-3 py-2 backdrop-blur">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Color</p>
              <p className="text-sm font-bold">{color.name}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <fieldset className="flex flex-col gap-3">
            <legend className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Pintura
            </legend>
            <div className="flex flex-wrap gap-3">
              {colors.map((c) => (
                <label key={c.id} className="cursor-pointer">
                  <input
                    type="radio"
                    name="color"
                    value={c.id}
                    checked={colorId === c.id}
                    onChange={() => setColorId(c.id)}
                    className="peer sr-only"
                  />
                  <span
                    className="flex size-12 items-center justify-center rounded-full border-2 border-border ring-offset-2 ring-offset-background transition-all peer-checked:ring-2 peer-checked:ring-accent peer-focus-visible:ring-2 peer-focus-visible:ring-ring hover:scale-110"
                    style={{ backgroundColor: c.swatch }}
                  >
                    {colorId === c.id ? <Check className="size-4 text-card mix-blend-difference" /> : null}
                  </span>
                  <span className="sr-only">
                    {c.name} {c.price > 0 ? `(+${formatPrice(c.price)})` : '(incluido)'}
                  </span>
                </label>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {color.name} · {color.price > 0 ? `+${formatPrice(color.price)}` : 'Incluido'}
            </p>
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <legend className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Llantas
            </legend>
            <div className="grid grid-cols-3 gap-2">
              {wheels.map((w) => (
                <label key={w.id} className="cursor-pointer">
                  <input
                    type="radio"
                    name="wheels"
                    value={w.id}
                    checked={wheelId === w.id}
                    onChange={() => setWheelId(w.id)}
                    className="peer sr-only"
                  />
                  <span className="flex h-full flex-col gap-1 rounded-md border border-border bg-card p-3 text-sm transition-colors peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background peer-focus-visible:ring-2 peer-focus-visible:ring-ring">
                    <span className="font-semibold">{w.name}</span>
                    <span className="font-mono text-xs opacity-70">
                      {w.price > 0 ? `+${formatPrice(w.price)}` : 'Incluido'}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <legend className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Extras
            </legend>
            {extras.map((e) => {
              const active = selectedExtras.includes(e.id)
              return (
                <label
                  key={e.id}
                  className={cn(
                    'flex cursor-pointer items-center justify-between gap-3 rounded-md border px-4 py-3 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring',
                    active ? 'border-accent bg-accent/10' : 'border-border bg-card hover:border-foreground',
                  )}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() => toggleExtra(e.id)}
                      className="size-4 accent-[var(--accent)]"
                    />
                    <span className="font-medium">{e.name}</span>
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">+{formatPrice(e.price)}</span>
                </label>
              )
            })}
          </fieldset>

          <div className="flex flex-col gap-4 rounded-xl bg-foreground p-5 text-background">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-mono text-xs uppercase tracking-widest text-background/60">Precio total</span>
              <span key={total} className="font-mono text-2xl font-bold animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
                {formatPrice(total)}
              </span>
            </div>
            <button
              type="button"
              onClick={copySummary}
              className="flex h-11 items-center justify-center gap-2 rounded-md bg-accent text-sm font-bold uppercase tracking-widest text-accent-foreground transition-opacity hover:opacity-90"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? 'Copiado' : 'Copiar configuración'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
