import { Catalog } from '@/components/catalog'
import { Comparator } from '@/components/comparator'
import { Configurator } from '@/components/configurator'
import { Gallery } from '@/components/gallery'
import { HeroCarousel } from '@/components/hero-carousel'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroCarousel />
        <Catalog />
        <Comparator />
        <Configurator />
        <Gallery />
      </main>
      <SiteFooter />
    </>
  )
}
