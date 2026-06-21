export default {
  name: 'product',
  title: 'Produit',
  type: 'document',
  groups: [
    { name: 'info', title: 'Informations' },
    { name: 'media', title: 'Photos' },
    { name: 'details', title: 'Détails' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    {
      name: 'name',
      title: 'Nom du produit',
      type: 'string',
      group: 'info',
      validation: (R: any) => R.required(),
    },
    {
      name: 'brand',
      title: 'Marque',
      type: 'reference',
      to: [{ type: 'brand' }],
      group: 'info',
      validation: (R: any) => R.required(),
    },
    {
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      group: 'info',
      options: {
        list: [
          { title: 'Linge de Lit', value: 'linge-de-lit' },
          { title: 'Linge de Table', value: 'linge-de-table' },
          { title: 'Linge de Bain', value: 'linge-de-bain' },
          { title: 'Senteurs & Bougies', value: 'senteurs-bougies' },
          { title: 'Literie de Luxe', value: 'literie' },
          { title: 'Mobilier', value: 'mobilier' },
          { title: 'Décoration & Maison', value: 'decoration' },
          { title: 'Accessoires Salle de Bain', value: 'accessoires-sdb' },
        ],
      },
      validation: (R: any) => R.required(),
    },
    {
      name: 'price',
      title: 'Prix (MAD)',
      type: 'number',
      group: 'info',
      validation: (R: any) => R.required().positive(),
    },
    {
      name: 'oldPrice',
      title: 'Ancien prix (MAD) — optionnel',
      type: 'number',
      group: 'info',
    },
    {
      name: 'badge',
      title: 'Badge',
      type: 'string',
      group: 'info',
      options: {
        list: [
          { title: 'Nouveau', value: 'Nouveau' },
          { title: 'Bestseller', value: 'Bestseller' },
          { title: 'Exclusif', value: 'Exclusif' },
          { title: 'Promo', value: 'Promo' },
          { title: 'Premium', value: 'Premium' },
        ],
      },
    },
    {
      name: 'inStock',
      title: 'En stock',
      type: 'boolean',
      group: 'info',
      initialValue: true,
    },
    {
      name: 'featured',
      title: 'Produit mis en avant (page d\'accueil)',
      type: 'boolean',
      group: 'info',
      initialValue: false,
    },
    {
      name: 'images',
      title: 'Photos du produit',
      type: 'array',
      group: 'media',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (R: any) => R.required().min(1),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      group: 'details',
    },
    {
      name: 'sizes',
      title: 'Dimensions disponibles',
      type: 'array',
      group: 'details',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'colors',
      title: 'Couleurs disponibles',
      type: 'array',
      group: 'details',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Nom de la couleur', type: 'string' },
            { name: 'hex', title: 'Code couleur (ex: #FFFFFF)', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'weight',
      title: 'Poids (Kg)',
      type: 'number',
      group: 'details',
      description: 'Poids du produit en kilogrammes — utilisé pour calculer les frais de livraison',
      validation: (R: any) => R.positive(),
    },
    {
      name: 'specs',
      title: 'Caractéristiques techniques',
      type: 'array',
      group: 'details',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Intitulé', type: 'string' },
            { name: 'value', title: 'Valeur', type: 'string' },
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
        },
      ],
    },
    {
      name: 'slug',
      title: 'URL (générée automatiquement)',
      type: 'slug',
      group: 'seo',
      options: { source: 'name', maxLength: 96 },
      validation: (R: any) => R.required(),
    },
    {
      name: 'metaDescription',
      title: 'Description SEO',
      type: 'text',
      rows: 2,
      group: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'name',
      brandName: 'brand.name',
      price: 'price',
      media: 'images.0',
    },
    prepare({ title, brandName, price, media }: any) {
      return {
        title,
        subtitle: `${brandName || ''} — ${price ? price.toLocaleString('fr-MA') + ' MAD' : ''}`,
        media,
      }
    },
  },
}
