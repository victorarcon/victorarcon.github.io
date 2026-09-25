'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { Modal } from '@/components/modal'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/utils'

const photos = [
  { src: '/gallery/interior.png', title: 'Interior clásico', aspect: 'aspect-[3/4]' },
  { src: '/gallery/circuito.png', title: 'Curva en el circuito', aspect: 'aspect-video' },
  { src: '/cars/lamborghini-countach.png', title: 'Countach en el parking', aspect: 'aspect-[4/3]' },
  { src: '/gallery/rueda.png', title: 'Llanta y pinza de freno', aspect: 'aspect-square' },
  { src: '/gallery/faro.png', title: 'Faro cromado', aspect: 'aspect-[3/4]' },
  { src: '/cars/toyota-supra.png', title: 'Supra en Tokio', aspect: 'aspect-video' },
  { src: '/gallery/motor.png', title: 'Vano motor V12', aspect: 'aspect-[4/3]' },
  { src: '/gallery/garaje.png', title: 'Taller de restauración', aspect: 'aspect-[3/4]' },
  { src: '/cars/mini-cooper.png', title: 'Mini por Londres', aspect: 'aspect-[4/3]' },
  { src: '/cars/ford-mustang.png', title: 'Mustang en el desierto', aspect: 'aspect-video' },
]

export function Gallery() {
  const [active, setActive] = useState<number | null>(null)
  const step = (delta: number) =>
    setActive((i) => (i === null ? null : (i + delta + photos.length) % photos.length))
  const photo = active !== null ? photos[active] : null

  return (
    <section aria-labelledby="galeria-titulo" id="galeria" className="bg-muted">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-20 md:px-8 md:py-28">
        <SectionHeading
          id="galeria-titulo"
          eyebrow={`${photos.length} fotografías`}
          title="Galería"
          description="Detalles, motores y carreteras. Pulsa cualquier imagen para verla a pantalla completa y usa las flechas del teclado para navegar."
        />

        <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {photos.map((p, i) => (
            <li key={p.src} className="mb-4 break-inside-avoid">
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group relative block w-full overflow-hidden rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className={cn('relative block w-full', p.aspect)}>
                  <Image
                    src={p.src || '/placeholder.svg'}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </span>
                <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-foreground/80 to-transparent p-4 text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="text-sm font-semibold">{p.title}</span>
                  <Expand className="size-4" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Modal
        open={photo !== null}
        onClose={() => setActive(null)}
        label={photo ? photo.title : 'Visor de imágenes'}
        className="w-[min(80rem,calc(100vw-1.5rem))] bg-foreground text-background"
      >
        {photo && active !== null ? (
          <div
            className="flex flex-col"
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight') step(1)
              if (event.key === 'ArrowLeft') step(-1)
            }}
          >
            <div className="relative h-[70svh] w-full">
              <Image
                key={photo.src}
                src={photo.src || '/placeholder.svg'}
                alt={photo.title}
                fill
                sizes="100vw"
                className="object-contain animate-in fade-in-0 zoom-in-95 duration-300"
              />
            </div>
            <div className="flex items-center justify-between gap-4 p-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="flex size-10 items-center justify-center rounded-full border border-background/30 transition-colors hover:bg-background hover:text-foreground"
                >
                  <ChevronLeft className="size-5" />
                  <span className="sr-only">Imagen anterior</span>
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground"
                >
                  <ChevronRight className="size-5" />
                  <span className="sr-only">Imagen siguiente</span>
                </button>
              </div>
              <p className="flex-1 truncate text-center text-sm font-semibold">
                {photo.title}
                <span className="ml-3 font-mono text-background/60">
                  {active + 1} / {photos.length}
                </span>
              </p>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="flex size-10 items-center justify-center rounded-full border border-background/30 transition-colors hover:bg-background hover:text-foreground"
              >
                <X className="size-5" />
                <span className="sr-only">Cerrar visor</span>
              </button>
            </div>
          </div>
        ) : null}
      </Modal>
    </section>
  )
}
