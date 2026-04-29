export default {
  name: 'brand',
  title: 'Marque',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nom de la marque',
      type: 'string',
      validation: (R: any) => R.required(),
    },
    {
      name: 'tagline',
      title: 'Slogan',
      type: 'string',
    },
    {
      name: 'country',
      title: 'Pays d\'origine',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
    },
    {
      name: 'coverImage',
      title: 'Image de couverture',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'featured',
      title: 'Marque phare',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'slug',
      title: 'URL',
      type: 'slug',
      options: { source: 'name' },
      validation: (R: any) => R.required(),
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'country', media: 'logo' },
  },
}
