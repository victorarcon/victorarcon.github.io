'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#comparador', label: 'Comparador' },
  { href: '#configurador', label: 'Configurador' },
  { href: '#galeria', label: 'Galería' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || menuOpen

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-colors duration-300',
        solid ? 'bg-background/95 text-foreground shadow-sm backdrop-blur' : 'bg-transparent text-background',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <a href="#inicio" className="flex items-center gap-3" aria-label="BOXES, volver al inicio">
          <span className="flex h-7 w-10 flex-col overflow-hidden rounded-sm" aria-hidden="true">
            <span className="flex-1 bg-primary" />
            <span className="h-2 bg-accent" />
            <span className="flex-1 bg-primary" />
          </span>
          <span className="text-lg font-black tracking-tight [font-stretch:125%]">BOXES</span>
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-semibold uppercase tracking-widest opacity-80 transition-opacity hover:opacity-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-md md:hidden"
          aria-expanded={menuOpen}
          aria-controls="menu-movil"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          <span className="sr-only">{menuOpen ? 'Cerrar menú' : 'Abrir menú'}</span>
        </button>
      </div>

      {menuOpen ? (
        <nav id="menu-movil" aria-label="Móvil" className="border-t border-border md:hidden">
          <ul className="flex flex-col px-4 py-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 text-base font-semibold uppercase tracking-widest"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
