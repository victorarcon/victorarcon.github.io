export type Category = 'Deportivo' | 'Clásico' | 'Eléctrico' | 'Todoterreno'

export type Car = {
  id: string
  brand: string
  model: string
  year: number
  category: Category
  image: string
  power: number
  topSpeed: number
  acceleration: number
  weight: number
  engine: string
  price: number
  featured?: boolean
  tagline: string
  description: string
}

export const categories: Category[] = ['Deportivo', 'Clásico', 'Eléctrico', 'Todoterreno']

export const cars: Car[] = [
  {
    id: 'ford-gt40',
    brand: 'Ford',
    model: 'GT40 Mk I',
    year: 1966,
    category: 'Clásico',
    image: '/cars/ford-gt40.png',
    power: 385,
    topSpeed: 320,
    acceleration: 4.2,
    weight: 1000,
    engine: 'V8 4.7 L',
    price: 9000000,
    featured: true,
    tagline: 'El coche que humilló a Ferrari en Le Mans',
    description:
      'Nacido de una rivalidad personal entre Henry Ford II y Enzo Ferrari, el GT40 ganó las 24 Horas de Le Mans cuatro años seguidos. Su librea azul celeste y naranja es hoy un icono del automovilismo.',
  },
  {
    id: 'porsche-taycan',
    brand: 'Porsche',
    model: 'Taycan Turbo S',
    year: 2024,
    category: 'Eléctrico',
    image: '/cars/porsche-taycan.png',
    power: 761,
    topSpeed: 260,
    acceleration: 2.8,
    weight: 2295,
    engine: 'Doble motor eléctrico',
    price: 205000,
    featured: true,
    tagline: 'Un Porsche de verdad, sin una gota de gasolina',
    description:
      'Arquitectura de 800 voltios, caja de dos velocidades en el eje trasero y una aceleración que desafía a los superdeportivos. El Taycan demostró que lo eléctrico también puede emocionar.',
  },
  {
    id: 'toyota-supra',
    brand: 'Toyota',
    model: 'Supra MK4 Turbo',
    year: 1998,
    category: 'Deportivo',
    image: '/cars/toyota-supra.png',
    power: 330,
    topSpeed: 250,
    acceleration: 4.9,
    weight: 1510,
    engine: '6 en línea 3.0 L biturbo',
    price: 120000,
    featured: true,
    tagline: 'La leyenda del motor 2JZ',
    description:
      'Su motor 2JZ-GTE es famoso por soportar más de 1000 CV con preparación. Convertido en estrella del cine y de la cultura JDM, el Supra MK4 es uno de los japoneses más buscados.',
  },
  {
    id: 'land-rover-defender',
    brand: 'Land Rover',
    model: 'Defender 110',
    year: 1990,
    category: 'Todoterreno',
    image: '/cars/land-rover-defender.png',
    power: 111,
    topSpeed: 140,
    acceleration: 15.0,
    weight: 1900,
    engine: 'Diésel 2.5 L Tdi',
    price: 45000,
    featured: true,
    tagline: 'Si no puede llegar, no hay camino',
    description:
      'Chasis de largueros, carrocería de aluminio y tracción total permanente. El Defender ha cruzado desiertos, selvas y glaciares, y sigue siendo la referencia de los todoterreno puros.',
  },
  {
    id: 'porsche-911',
    brand: 'Porsche',
    model: '911 GT3',
    year: 2022,
    category: 'Deportivo',
    image: '/cars/porsche-911.png',
    power: 510,
    topSpeed: 318,
    acceleration: 3.4,
    weight: 1435,
    engine: 'Bóxer 6 cil. 4.0 L',
    price: 200000,
    tagline: 'Un coche de carreras con matrícula',
    description:
      'Motor atmosférico que gira hasta 9000 rpm, suspensión delantera de doble horquilla heredada de la competición y un alerón de cuello de cisne. Precisión alemana en estado puro.',
  },
  {
    id: 'ferrari-250',
    brand: 'Ferrari',
    model: '250 GTO',
    year: 1962,
    category: 'Clásico',
    image: '/cars/ferrari-250.png',
    power: 300,
    topSpeed: 280,
    acceleration: 5.8,
    weight: 880,
    engine: 'V12 3.0 L',
    price: 48000000,
    tagline: 'El coche más caro jamás subastado',
    description:
      'Solo se fabricaron 36 unidades. Diseñado para homologar en la categoría GT, hoy es el santo grial de los coleccionistas y ha superado los 45 millones en subasta.',
  },
  {
    id: 'ford-mustang',
    brand: 'Ford',
    model: 'Mustang Fastback',
    year: 1967,
    category: 'Clásico',
    image: '/cars/ford-mustang.png',
    power: 320,
    topSpeed: 200,
    acceleration: 7.0,
    weight: 1400,
    engine: 'V8 6.4 L',
    price: 90000,
    tagline: 'El nacimiento del muscle car',
    description:
      'Capó largo, zaga corta y un V8 con un sonido inconfundible. El Mustang Fastback del 67 definió una época y protagonizó persecuciones míticas en la gran pantalla.',
  },
  {
    id: 'lamborghini-countach',
    brand: 'Lamborghini',
    model: 'Countach LP5000 QV',
    year: 1985,
    category: 'Deportivo',
    image: '/cars/lamborghini-countach.png',
    power: 455,
    topSpeed: 295,
    acceleration: 4.9,
    weight: 1490,
    engine: 'V12 5.2 L',
    price: 500000,
    tagline: 'El póster de todas las habitaciones de los 80',
    description:
      'Forma de cuña, puertas de tijera y un V12 detrás de los asientos. Marcello Gandini dibujó un coche tan radical que todavía parece venir del futuro.',
  },
  {
    id: 'mini-cooper',
    brand: 'Mini',
    model: 'Cooper S',
    year: 1964,
    category: 'Clásico',
    image: '/cars/mini-cooper.png',
    power: 76,
    topSpeed: 145,
    acceleration: 12.9,
    weight: 650,
    engine: '4 cil. 1.3 L',
    price: 40000,
    tagline: 'Pequeño, ligero y ganador del Montecarlo',
    description:
      'Motor transversal y ruedas en las esquinas: una revolución en envase diminuto. Su agilidad le permitió ganar el Rally de Montecarlo frente a coches mucho más potentes.',
  },
  {
    id: 'audi-etron-gt',
    brand: 'Audi',
    model: 'RS e-tron GT',
    year: 2023,
    category: 'Eléctrico',
    image: '/cars/audi-etron-gt.png',
    power: 646,
    topSpeed: 250,
    acceleration: 3.3,
    weight: 2347,
    engine: 'Doble motor eléctrico',
    price: 150000,
    tagline: 'Gran turismo silencioso y brutal',
    description:
      'Comparte base con el Taycan pero con un carácter más relajado y un diseño escultural. Tracción quattro eléctrica y confort para cruzar el continente.',
  },
]

export const specLimits = {
  power: 800,
  topSpeed: 350,
  weight: 2500,
}

export function accelerationScore(seconds: number) {
  return Math.max(0, Math.min(1, (16 - seconds) / 14))
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat('es-ES').format(value)
}
