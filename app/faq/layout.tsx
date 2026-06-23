import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ | Questions Fréquentes — Mobikit Linge de Maison Maroc',
  description: 'Toutes les réponses sur la livraison, les retours, l\'entretien du linge de maison et nos marques (Descamps, Treca, Pyrenex). Mobikit distributeur officiel au Maroc.',
  keywords: 'faq mobikit, livraison linge maison maroc, retour linge maison, entretien linge descamps, commande linge maison maroc',
  openGraph: {
    title: 'FAQ — Questions Fréquentes | Mobikit',
    description: 'Livraison, retours, paiement, entretien — toutes les réponses sur votre boutique Mobikit.',
    url: 'https://www.mobikit.ma/faq',
  },
  alternates: { canonical: 'https://www.mobikit.ma/faq' },
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
