import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemaTypes'

export default defineConfig({
  name: 'mobikit',
  title: 'Mobikit — Gestion des Produits',
  projectId: '72y7gp1y',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Administration Mobikit')
          .items([
            S.listItem()
              .title('🛍️ Produits')
              .child(S.documentTypeList('product').title('Tous les produits')),
            S.listItem()
              .title('🏷️ Marques')
              .child(S.documentTypeList('brand').title('Toutes les marques')),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
})
