import { ArrowUp } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="flex h-3 flex-col" aria-hidden="true">
        <span className="flex-1 bg-primary" />
        <span className="h-1 bg-accent" />
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-14 md:flex-row md:items-end md:justify-between md:px-8">
        <div className="flex flex-col gap-3">
          <p className="text-5xl font-black tracking-tight [font-stretch:125%] md:text-7xl">BOXES</p>
          <p className="max-w-sm leading-relaxed text-background/70">
            Una web de fans del motor. Las fichas técnicas y valores son aproximados y tienen fines informativos.
          </p>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <nav aria-label="Pie de página">
            <ul className="flex flex-wrap gap-6 text-sm font-semibold uppercase tracking-widest">
              <li>
                <a href="#catalogo" className="opacity-80 hover:opacity-100">Catálogo</a>
              </li>
              <li>
                <a href="#comparador" className="opacity-80 hover:opacity-100">Comparador</a>
              </li>
              <li>
                <a href="#configurador" className="opacity-80 hover:opacity-100">Configurador</a>
              </li>
              <li>
                <a href="#galeria" className="opacity-80 hover:opacity-100">Galería</a>
              </li>
            </ul>
          </nav>
          <a
            href="#inicio"
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary hover:underline"
          >
            <ArrowUp className="size-4" />
            Volver arriba
          </a>
          <p className="font-mono text-xs text-background/50">© {new Date().getFullYear()} BOXES</p>
        </div>
      </div>
    </footer>
  )
}
