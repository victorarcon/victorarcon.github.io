'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight, Heart, X } from 'lucide-react'
import { Modal } from '@/components/modal'
import { SpecBar } from '@/components/spec-bar'
import { accelerationScore, formatNumber, formatPrice, specLimits, type Car } from '@/lib/cars'
import { cn } from '@/lib/utils'

type CarDialogProps = {
  car: Car | null
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function CarDialog({ car, isFavorite, onToggleFavorite, onClose, onPrev, onNext }: CarDialogProps) {
  return (
    <Modal open={car !== null} onClose={onClose} label={car ? `${car.brand} ${car.model}` : 'Ficha del coche'}>
      {car ? (
        <div
          className="grid max-h-[92svh] overflow-y-auto md:grid-cols-[1.2fr_1fr]"
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight') onNext()
            if (event.key === 'ArrowLeft') onPrev()
          }}
        >
          <div className="relative aspect-[4/3] bg-foreground md:aspect-auto md:min-h-[32rem]">
            <Image
              key={car.id}
              src={car.image || '/placeholder.svg'}
              alt={`${car.brand} ${car.model} ${car.year}`}
              fill
              sizes="(min-width: 768px) 55vw, 100vw"
              className="object-cover animate-in fade-in-0 duration-500"
            />
            <div className="absolute inset-x-0 bottom-0 flex justify-between p-4">
              <button
                type="button"
                onClick={onPrev}
                className="flex size-10 items-center justify-center rounded-full bg-background/90 text-foreground transition-transform hover:scale-105"
              >
                <ChevronLeft className="size-5" />
                <span className="sr-only">Coche anterior</span>
              </button>
              <button
                type="button"
                onClick={onNext}
                className="flex size-10 items-center justify-center rounded-full bg-background/90 text-foreground transition-transform hover:scale-105"
              >
                <ChevronRight className="size-5" />
                <span className="sr-only">Coche siguiente</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6 p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-2">
                <p className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                  {car.category} · {car.year}
                </p>
                <h3 className="text-3xl font-black uppercase leading-none tracking-tight [font-stretch:125%]">
                  <span className="block text-base text-muted-foreground">{car.brand}</span>
                  {car.model}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted transition-colors hover:bg-border"
              >
                <X className="size-4" />
                <span className="sr-only">Cerrar ficha</span>
              </button>
            </div>

            <p className="text-pretty leading-relaxed text-muted-foreground">{car.description}</p>

            <div className="flex flex-col gap-4">
              <SpecBar label="Potencia" value={`${formatNumber(car.power)} CV`} ratio={car.power / specLimits.power} />
              <SpecBar
                label="Velocidad máxima"
                value={`${car.topSpeed} km/h`}
                ratio={car.topSpeed / specLimits.topSpeed}
              />
              <SpecBar
                label="0–100 km/h"
                value={`${car.acceleration.toFixed(1)} s`}
                ratio={accelerationScore(car.acceleration)}
              />
            </div>

            <dl className="grid grid-cols-2 gap-4 border-t border-border pt-5">
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">Motor</dt>
                <dd className="font-mono text-sm font-semibold">{car.engine}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">Peso</dt>
                <dd className="font-mono text-sm font-semibold">{formatNumber(car.weight)} kg</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">Valor estimado</dt>
                <dd className="font-mono text-xl font-semibold">{formatPrice(car.price)}</dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={() => onToggleFavorite(car.id)}
              aria-pressed={isFavorite}
              className={cn(
                'mt-auto flex h-12 items-center justify-center gap-2 rounded-md text-sm font-bold uppercase tracking-widest transition-colors',
                isFavorite
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-foreground text-background hover:bg-foreground/85',
              )}
            >
              <Heart className={cn('size-4', isFavorite && 'fill-current')} />
              {isFavorite ? 'En tu garaje' : 'Añadir a mi garaje'}
            </button>
          </div>
        </div>
      ) : null}
    </Modal>
  )
}
