'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { Heart, Search } from 'lucide-react'
import { CarDialog } from '@/components/car-dialog'
import { SectionHeading } from '@/components/section-heading'
import { cars, categories, formatNumber, type Car, type Category } from '@/lib/cars'
import { cn } from '@/lib/utils'

type SortKey = 'power' | 'topSpeed' | 'acceleration' | 'year' | 'price'

const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'power', label: 'Más potentes' },
  { value: 'topSpeed', label: 'Más rápidos' },
  { value: 'acceleration', label: 'Mejor aceleración' },
  { value: 'year', label: 'Más recientes' },
  { value: 'price', label: 'Más caros' },
]

function sortCars(list: Car[], key: SortKey) {
  return [...list].sort((a, b) => (key === 'acceleration' ? a[key] - b[key] : b[key] - a[key]))
}

export function Catalog() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category | 'Todos'>('Todos')
  const [sort, setSort] = useState<SortKey>('power')
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = cars.filter((car) => {
      if (category !== 'Todos' && car.category !== category) return false
      if (onlyFavorites && !favorites.has(car.id)) return false
      if (q && !`${car.brand} ${car.model} ${car.year}`.toLowerCase().includes(q)) return false
      return true
    })
    return sortCars(filtered, sort)
  }, [query, category, sort, onlyFavorites, favorites])

  const toggleFavorite = (id: string) =>
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const navigationList = visible.length > 0 ? visible : cars
  const selectedIndex = navigationList.findIndex((car) => car.id === selectedId)
  const selected = selectedIndex >= 0 ? navigationList[selectedIndex] : null
  const step = (delta: number) => {
    const next = (selectedIndex + delta + navigationList.length) % navigationList.length
    setSelectedId(navigationList[next].id)
  }

  return (
    <section aria-labelledby="catalogo-titulo" id="catalogo" className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-20 md:px-8 md:py-28">
      <SectionHeading
        id="catalogo-titulo"
        eyebrow={`${cars.length} modelos en boxes`}
        title="Catálogo"
        description="Filtra por categoría, busca tu modelo favorito y ordénalos por prestaciones. Pulsa en cualquier coche para abrir su ficha técnica."
      />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
          {(['Todos', ...categories] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={cn(
                'h-10 rounded-full border px-4 text-sm font-semibold transition-colors',
                category === item
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border bg-card hover:border-foreground',
              )}
            >
              {item}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setOnlyFavorites((v) => !v)}
            aria-pressed={onlyFavorites}
            className={cn(
              'flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors',
              onlyFavorites
                ? 'border-accent bg-accent text-accent-foreground'
                : 'border-border bg-card hover:border-accent',
            )}
          >
            <Heart className={cn('size-4', onlyFavorites && 'fill-current')} />
            Mi garaje ({favorites.size})
          </button>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="relative flex items-center">
            <span className="sr-only">Buscar coche</span>
            <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar marca o modelo"
              className="h-10 w-full rounded-md border border-input bg-card pl-9 pr-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-64"
            />
          </label>
          <label className="flex items-center gap-2">
            <span className="sr-only">Ordenar</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="h-10 w-full rounded-md border border-input bg-card px-3 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} coches mostrados
      </p>

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border px-6 py-20 text-center">
          <p className="text-lg font-semibold">No hay coches que coincidan</p>
          <p className="text-muted-foreground">
            {onlyFavorites ? 'Tu garaje está vacío: pulsa el corazón en cualquier coche.' : 'Prueba con otra búsqueda o categoría.'}
          </p>
        </div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((car, i) => (
            <li
              key={car.id}
              className="animate-in fade-in-0 slide-in-from-bottom-4 fill-mode-both duration-500"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-xl">
                <button
                  type="button"
                  onClick={() => setSelectedId(car.id)}
                  className="flex flex-1 flex-col text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                >
                  <span className="relative block aspect-[4/3] overflow-hidden bg-muted">
                    <Image
                      src={car.image || '/placeholder.svg'}
                      alt={`${car.brand} ${car.model}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <span className="absolute left-3 top-3 rounded-sm bg-background/90 px-2 py-1 font-mono text-xs font-semibold uppercase tracking-wider">
                      {car.category}
                    </span>
                    <span className="absolute inset-x-0 bottom-0 translate-y-full bg-accent py-2 text-center text-xs font-bold uppercase tracking-widest text-accent-foreground transition-transform duration-300 group-hover:translate-y-0">
                      Ver ficha técnica
                    </span>
                  </span>
                  <span className="flex flex-1 flex-col gap-4 p-5">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="flex flex-col">
                        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          {car.brand}
                        </span>
                        <span className="text-xl font-black uppercase tracking-tight [font-stretch:115%]">
                          {car.model}
                        </span>
                      </span>
                      <span className="font-mono text-sm text-muted-foreground">{car.year}</span>
                    </span>
                    <span className="mt-auto grid grid-cols-3 gap-2 border-t border-border pt-4 font-mono text-sm">
                      <span className="flex flex-col">
                        <span className="text-[0.7rem] uppercase text-muted-foreground">CV</span>
                        <span className="font-semibold">{formatNumber(car.power)}</span>
                      </span>
                      <span className="flex flex-col">
                        <span className="text-[0.7rem] uppercase text-muted-foreground">km/h</span>
                        <span className="font-semibold">{car.topSpeed}</span>
                      </span>
                      <span className="flex flex-col">
                        <span className="text-[0.7rem] uppercase text-muted-foreground">0–100</span>
                        <span className="font-semibold">{car.acceleration.toFixed(1)} s</span>
                      </span>
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => toggleFavorite(car.id)}
                  aria-pressed={favorites.has(car.id)}
                  className={cn(
                    'absolute right-3 top-3 flex size-10 items-center justify-center rounded-full transition-all hover:scale-110',
                    favorites.has(car.id) ? 'bg-accent text-accent-foreground' : 'bg-background/90 text-foreground',
                  )}
                >
                  <Heart className={cn('size-4', favorites.has(car.id) && 'fill-current')} />
                  <span className="sr-only">
                    {favorites.has(car.id) ? `Quitar ${car.model} de mi garaje` : `Añadir ${car.model} a mi garaje`}
                  </span>
                </button>
              </article>
            </li>
          ))}
        </ul>
      )}

      <CarDialog
        car={selected}
        isFavorite={selected ? favorites.has(selected.id) : false}
        onToggleFavorite={toggleFavorite}
        onClose={() => setSelectedId(null)}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </section>
  )
}
