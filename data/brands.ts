export interface Brand {
  slug: string
  name: string
  tagline: string
  country: string
  description: string
  featured: boolean
  categories: string[]
  sageNames: string[]
  coverImage?: string
}

export const brands: Brand[] = [
  {
    slug: 'descamps',
    name: 'Descamps',
    tagline: 'Filatier · Drapier depuis 1802',
    country: 'France · Paris',
    description: "Maison fondée en 1802, Descamps incarne l'excellence du linge de maison français. Percale, satin et matières nobles pour un sommeil d'exception.",
    featured: true,
    categories: ['Linge de Lit', 'Linge de Bain'],
    sageNames: ['Descamps'],
  },
  {
    slug: 'treca',
    name: 'Treca Paris',
    tagline: 'Literie de Prestige',
    country: 'France · Paris',
    description: "Manufactures françaises d'excellence, Treca crée depuis des décennies des matelas et sommiers sur mesure pour les plus grands hôtels du monde.",
    featured: true,
    categories: ['Literie', 'Matelas', 'Sommiers'],
    sageNames: ['Treca Paris'],
  },
  {
    slug: 'pyrenex',
    name: 'Pyrenex',
    tagline: 'Duvet & Plumes des Pyrénées',
    country: 'France · Pyrénées',
    description: "Spécialiste du duvet depuis 1859, Pyrenex sélectionne les meilleures plumes d'oie pour des couettes et oreillers d'une légèreté incomparable.",
    featured: true,
    categories: ['Couettes', 'Oreillers', 'Couvertures'],
    sageNames: ['Pyrenex'],
  },
  {
    slug: 'le-jacquard-francais',
    name: 'Le Jacquard Français',
    tagline: 'Art du Tissu depuis 1888',
    country: 'France · Vosges',
    description: "Tisseur d'excellence depuis 1888, Le Jacquard Français perpétue l'art du jacquard pour des linges de table et de bain d'une beauté rare.",
    featured: false,
    categories: ['Linge de Table', 'Linge de Bain'],
    sageNames: ['Le Jacquard Français'],
  },
  {
    slug: 'esteban-parfums',
    name: 'Esteban Parfums',
    tagline: "Parfums & Senteurs d'Intérieur",
    country: 'France · Paris',
    description: "Maison de parfums d'intérieur parisienne, Esteban crée des fragrances raffinées pour sublimer votre espace de vie.",
    featured: false,
    categories: ['Bougies', 'Diffuseurs', 'Parfums'],
    sageNames: ['Esteban Paris', 'Esteban Parfums'],
  },
  {
    slug: 'aquanova',
    name: 'Aquanova',
    tagline: 'Design Belge',
    country: 'Belgique',
    description: "Marque belge au design épuré, Aquanova propose des accessoires et textiles de salle de bain alliant fonctionnalité et esthétique contemporaine.",
    featured: false,
    categories: ['Linge de Bain', 'Accessoires SDB'],
    sageNames: ['Aquanova'],
  },
  {
    slug: 'blomus',
    name: 'Blomus',
    tagline: 'Design Contemporain & Fonctionnel',
    country: 'Allemagne',
    description: "Marque allemande reconnue pour son design industriel épuré en acier inoxydable et béton. Accessoires haut de gamme pour la maison.",
    featured: false,
    categories: ['Décoration', 'Accessoires'],
    sageNames: ['Blomus'],
  },
  {
    slug: 'brun-de-vian-tiran',
    name: 'Brun de Vian-Tiran',
    tagline: 'Couvertures en Laine · Depuis 1808',
    country: 'France · Provence',
    description: "Manufacture provençale fondée en 1808, BVT tisse des couvertures en laine mérinos et cachemire d'une douceur et d'un luxe incomparables.",
    featured: false,
    categories: ['Couvertures', 'Plaids', 'Couettes'],
    sageNames: ['Brun de Vian-Tiran'],
  },
  {
    slug: 'pilus',
    name: 'Pilus',
    tagline: 'Luxe & Raffinement',
    country: 'Europe',
    description: "Marque de luxe proposant des collections haut de gamme de linge de maison et accessoires décoratifs pour un intérieur d'exception.",
    featured: false,
    categories: ['Linge de Maison', 'Décoration'],
    sageNames: ['Pilus'],
  },
  {
    slug: 'ilum',
    name: 'Ilum · Max Benjamin',
    tagline: 'Bougies Artisanales',
    country: 'Irlande',
    description: "Bougies et parfums d'intérieur artisanaux créés avec les meilleures matières premières pour une expérience olfactive unique.",
    featured: false,
    categories: ['Bougies', 'Senteurs'],
    sageNames: ['Ilum · Max Benjamin', 'Max Benjamin'],
  },
  {
    slug: 'oscar',
    name: 'Oscar',
    tagline: 'Art de Vivre',
    country: 'Europe',
    description: "Collections haut de gamme pour la maison, alliant esthétique contemporaine et qualité des matières pour un intérieur d'exception.",
    featured: false,
    categories: ['Linge de Maison', 'Décoration'],
    sageNames: ['Oscar'],
  },
  {
    slug: 'geodesis',
    name: 'Geodesis',
    tagline: 'Parfums & Senteurs Rares',
    country: 'France',
    description: "Maison de parfums d'intérieur d'exception, Geodesis sélectionne des matières rares et précieuses pour des fragrances uniques.",
    featured: false,
    categories: ['Senteurs', 'Bougies', 'Diffuseurs'],
    sageNames: ['Geodesis'],
  },
  {
    slug: 'cosmic',
    name: 'Cosmic',
    tagline: 'Design & Innovation',
    country: 'Europe',
    description: "Marque au design avant-gardiste proposant des collections décoratives et textiles qui mêlent créativité et qualité premium.",
    featured: false,
    categories: ['Décoration', 'Accessoires'],
    sageNames: ['Cosmic'],
  },
  {
    slug: 'vispring',
    name: 'Vispring',
    tagline: "Literie d'Exception · Depuis 1901",
    country: 'Royaume-Uni',
    description: "Manufacture britannique fondée en 1901, Vispring crée à la main les matelas les plus luxueux au monde, avec des ressorts ensachés et des matières naturelles rares.",
    featured: false,
    categories: ['Matelas', 'Literie de Luxe', 'Sommiers'],
    sageNames: ['Vispring'],
  },
  {
    slug: 'la-savonnerie-royale',
    name: 'La Savonnerie Royale',
    tagline: "Savons & Soins d'Exception · Versailles",
    country: 'France · Versailles',
    description: "Savons artisanaux et produits de soin luxueux, fabriqués selon des recettes traditionnelles avec des ingrédients nobles et naturels.",
    featured: false,
    categories: ['Salle de Bain', 'Soins', 'Accessoires'],
    sageNames: ['La Savonnerie Royale'],
  },
]

export function getBrand(slug: string): Brand | undefined {
  return brands.find(b => b.slug === slug)
}
