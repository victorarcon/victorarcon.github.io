'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { cars, formatNumber } from '@/lib/cars'
import { cn } from '@/lib/utils'

const featured = cars.filter((car) => car.featured)
const SLIDE_MS = 6000

export function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const current = featured[index]

  const go = (next: number) => setIndex((next + featured.length) % featured.length)

  useEffect(() => {
    if (paused) return
    const id = setTimeout(() => setIndex((i) => (i + 1) % featured.length), SLIDE_MS)
    return () => clearTimeout(id)
  }, [index, paused])

  return (
    <section
      id="inicio"
      aria-roledescription="carrusel"
      aria-label="Coches destacados"
      className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden bg-foreground text-background"
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') go(index + 1)
        if (event.key === 'ArrowLeft') go(index - 1)
      }}
    >
      {featured.map((car, i) => (
        <div
          key={car.id}
          aria-hidden={i !== index}
          className={cn('absolute inset-0', i === index ? 'opacity-100 scale-100' : 'opacity-0 scale-110')}
          style={{ transition: 'opacity 1.1s ease, transform 7s ease-out' }}
        >
          <Image
            src={car.image || '/placeholder.svg'}
            alt={`${car.brand} ${car.model}`}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}
      <div
        className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-foreground/10"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pb-10 pt-32 md:px-8 md:pb-14">
        <div key={current.id} className="flex max-w-4xl flex-col gap-5 animate-in fade-in-0 slide-in-from-bottom-6 duration-700">
          <p className="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-widest text-primary">
            <span className="rounded-sm bg-accent px-2 py-1 text-accent-foreground">{current.category}</span>
            {current.brand} · {current.year}
          </p>
          <h1 className="text-balance text-5xl font-black uppercase leading-[0.9] tracking-tight [font-stretch:125%] sm:text-7xl lg:text-8xl">
            {current.model}
          </h1>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-background/85">{current.tagline}</p>

          <dl className="flex flex-wrap gap-x-10 gap-y-4 border-t border-background/20 pt-5 font-mono">
            <div>
              <dt className="text-xs uppercase tracking-widest text-background/60">Potencia</dt>
              <dd className="text-2xl font-semibold">{formatNumber(current.power)} CV</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-background/60">Vel. máxima</dt>
              <dd className="text-2xl font-semibold">{current.topSpeed} km/h</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-background/60">0–100 km/h</dt>
              <dd className="text-2xl font-semibold">{current.acceleration.toFixed(1)} s</dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <ol className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:w-[36rem]">
            {featured.map((car, i) => (
              <li key={car.id}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={i === index}
                  aria-label={`Ver ${car.brand} ${car.model}`}
                  className={cn(
                    'group flex w-full flex-col gap-2 text-left transition-opacity',
                    i === index ? 'opacity-100' : 'opacity-60 hover:opacity-100',
                  )}
                >
                  <span className="relative block h-0.5 w-full overflow-hidden bg-background/25">
                    {i === index ? (
                      <span
                        key={`${index}-${paused}`}
                        className={cn(
                          'absolute inset-0 origin-left bg-accent',
                          paused ? 'scale-x-100' : 'animate-progress',
                        )}
                      />
                    ) : null}
                  </span>
                  <span className="relative aspect-video overflow-hidden rounded-md">
                    <Image
                      src={car.image || '/placeholder.svg'}
                      alt=""
                      fill
                      sizes="160px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </span>
                  <span className="truncate text-xs font-semibold uppercase tracking-wider">{car.model}</span>
                </button>
              </li>
            ))}
          </ol>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="flex size-11 items-center justify-center rounded-full border border-background/30 transition-colors hover:bg-background hover:text-foreground"
            >
              <ChevronLeft className="size-5" />
              <span className="sr-only">Anterior</span>
            </button>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="flex size-11 items-center justify-center rounded-full border border-background/30 transition-colors hover:bg-background hover:text-foreground"
            >
              {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
              <span className="sr-only">{paused ? 'Reanudar carrusel' : 'Pausar carrusel'}</span>
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="flex size-11 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform hover:scale-105"
            >
              <ChevronRight className="size-5" />
              <span className="sr-only">Siguiente</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
