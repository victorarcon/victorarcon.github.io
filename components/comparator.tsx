'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ArrowLeftRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { accelerationScore, cars, formatNumber, specLimits, type Car } from '@/lib/cars'
import { cn } from '@/lib/utils'

type Row = {
  label: string
  format: (car: Car) => string
  score: (car: Car) => number
  lowerIsBetter?: boolean
  raw: (car: Car) => number
}

const rows: Row[] = [
  {
    label: 'Potencia',
    format: (c) => `${formatNumber(c.power)} CV`,
    score: (c) => c.power / specLimits.power,
    raw: (c) => c.power,
  },
  {
    label: 'Velocidad máx.',
    format: (c) => `${c.topSpeed} km/h`,
    score: (c) => c.topSpeed / specLimits.topSpeed,
    raw: (c) => c.topSpeed,
  },
  {
    label: '0–100 km/h',
    format: (c) => `${c.acceleration.toFixed(1)} s`,
    score: (c) => accelerationScore(c.acceleration),
    raw: (c) => c.acceleration,
    lowerIsBetter: true,
  },
  {
    label: 'Peso',
    format: (c) => `${formatNumber(c.weight)} kg`,
    score: (c) => 1 - c.weight / specLimits.weight + 0.15,
    raw: (c) => c.weight,
    lowerIsBetter: true,
  },
  {
    label: 'CV por tonelada',
    format: (c) => `${Math.round((c.power / c.weight) * 1000)}`,
    score: (c) => (c.power / c.weight) * 1000 / 450,
    raw: (c) => c.power / c.weight,
  },
]

function CarPicker({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-md border border-input bg-card px-3 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {cars.map((car) => (
          <option key={car.id} value={car.id}>
            {car.brand} {car.model} ({car.year})
          </option>
        ))}
      </select>
    </div>
  )
}

export function Comparator() {
  const [leftId, setLeftId] = useState('ford-gt40')
  const [rightId, setRightId] = useState('porsche-taycan')
  const left = cars.find((c) => c.id === leftId) ?? cars[0]
  const right = cars.find((c) => c.id === rightId) ?? cars[1]

  const wins = rows.reduce(
    (acc, row) => {
      const a = row.raw(left)
      const b = row.raw(right)
      if (a === b) return acc
      const leftWins = row.lowerIsBetter ? a < b : a > b
      return leftWins ? { ...acc, left: acc.left + 1 } : { ...acc, right: acc.right + 1 }
    },
    { left: 0, right: 0 },
  )

  return (
    <section id="comparador" aria-labelledby="comparador-titulo" className="bg-foreground text-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-20 md:px-8 md:py-28">
        <div className="[&_p.text-muted-foreground]:text-background/70">
          <SectionHeading
            id="comparador-titulo"
            eyebrow="Cara a cara"
            title="Comparador"
            description="Enfrenta dos coches y descubre quién gana en cada prestación. Las barras naranjas marcan al vencedor."
          />
        </div>

        <div className="grid items-end gap-4 text-foreground md:grid-cols-[1fr_auto_1fr]">
          <div className="[&_label]:text-background/70">
            <CarPicker id="coche-a" label="Coche A" value={leftId} onChange={setLeftId} />
          </div>
          <button
            type="button"
            onClick={() => {
              setLeftId(rightId)
              setRightId(leftId)
            }}
            className="flex size-11 items-center justify-center justify-self-center rounded-full bg-primary text-primary-foreground transition-transform hover:rotate-180"
            style={{ transitionDuration: '400ms' }}
          >
            <ArrowLeftRight className="size-5" />
            <span className="sr-only">Intercambiar coches</span>
          </button>
          <div className="[&_label]:text-background/70">
            <CarPicker id="coche-b" label="Coche B" value={rightId} onChange={setRightId} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-8">
          {[left, right].map((car, i) => (
            <figure key={`${car.id}-${i}`} className="flex flex-col gap-3 animate-in fade-in-0 duration-500">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={car.image || '/placeholder.svg'}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  sizes="(min-width: 768px) 45vw, 50vw"
                  className="object-cover"
                />
                <span
                  className={cn(
                    'absolute top-3 rounded-sm px-2 py-1 font-mono text-xs font-bold',
                    i === 0 ? 'left-3' : 'right-3',
                    (i === 0 ? wins.left > wins.right : wins.right > wins.left)
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-background/90 text-foreground',
                  )}
                >
                  {i === 0 ? wins.left : wins.right} / {rows.length}
                </span>
              </div>
              <figcaption className={cn('flex flex-col', i === 1 && 'items-end text-right')}>
                <span className="text-xs font-semibold uppercase tracking-widest text-background/60">
                  {car.brand} · {car.year}
                </span>
                <span className="text-lg font-black uppercase leading-tight tracking-tight [font-stretch:115%] md:text-2xl">
                  {car.model}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <ul className="flex flex-col gap-6">
          {rows.map((row) => {
            const a = row.raw(left)
            const b = row.raw(right)
            const leftWins = a !== b && (row.lowerIsBetter ? a < b : a > b)
            const rightWins = a !== b && !leftWins
            return (
              <li key={row.label} className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between font-mono text-sm">
                  <span className={cn('font-semibold', leftWins && 'text-accent')}>{row.format(left)}</span>
                  <span className="text-xs uppercase tracking-widest text-background/60">{row.label}</span>
                  <span className={cn('font-semibold', rightWins && 'text-accent')}>{row.format(right)}</span>
                </div>
                <div className="grid grid-cols-2 gap-1" aria-hidden="true">
                  <div className="flex h-3 justify-end overflow-hidden rounded-l-full bg-background/10">
                    <div
                      className={cn('h-full rounded-l-full transition-[width] duration-700 ease-out', leftWins ? 'bg-accent' : 'bg-primary')}
                      style={{ width: `${Math.round(Math.min(1, Math.max(0.04, row.score(left))) * 100)}%` }}
                    />
                  </div>
                  <div className="flex h-3 overflow-hidden rounded-r-full bg-background/10">
                    <div
                      className={cn('h-full rounded-r-full transition-[width] duration-700 ease-out', rightWins ? 'bg-accent' : 'bg-primary')}
                      style={{ width: `${Math.round(Math.min(1, Math.max(0.04, row.score(right))) * 100)}%` }}
                    />
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
