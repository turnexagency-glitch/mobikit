import Image from 'next/image'
import Link from 'next/link'

const values = [
  {
    title: 'Excellence',
    desc: 'Nous ne sélectionnons que des maisons reconnues mondialement pour la qualité irréprochable de leurs produits.',
  },
  {
    title: 'Authenticité',
    desc: 'Chaque marque distribuée possède une histoire, un savoir-faire unique transmis de génération en génération.',
  },
  {
    title: 'Élégance',
    desc: 'Un art de vivre raffiné qui se traduit dans chaque produit, chaque matière, chaque détail de nos collections.',
  },
  {
    title: 'Service',
    desc: 'Un accompagnement personnalisé pour vous aider à créer un intérieur à la hauteur de vos aspirations.',
  },
]

const timeline = [
  { year: '1997', event: 'Fondation de Mobikit et premiers partenariats avec des maisons européennes.' },
  { year: '2003', event: 'Ouverture du premier showroom à Casablanca et élargissement du portfolio de marques.' },
  { year: '2010', event: 'Partenariat officiel avec Treca Paris et Descamps pour le Maroc.' },
  { year: '2018', event: 'Lancement de collections décoration et mobilier haut de gamme.' },
  { year: '2024', event: 'Lancement de la plateforme e-commerce pour servir toute la clientèle marocaine.' },
]

export default function AProposPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-80 flex items-center justify-center overflow-hidden">
        <Image
          src="/images/showroom-mobikit.webp"
          alt="Mobikit Showroom"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-6">
          <p className="section-subtitle text-gold mb-3">Depuis 1997</p>
          <h1 className="font-serif text-5xl font-light">Notre Histoire</h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-subtitle mb-4">Qui Sommes-Nous</p>
              <h2 className="section-title mb-6">Une Passion pour<br /><span className="italic text-gold">l&apos;Art de Vivre</span></h2>
              <div className="w-12 h-px bg-gold mb-6" />
              <div className="space-y-4 text-sm text-charcoal-light leading-relaxed">
                <p>
                  Fondée en 1997, <strong className="text-charcoal">Mobikit</strong> s&apos;est imposée comme le distributeur de référence des grandes maisons européennes de linge de maison, literie, mobilier et décoration au Maroc.
                </p>
                <p>
                  Depuis plus de 25 ans, nous sélectionnons avec exigence des maisons prestigieuses reconnues pour leur savoir-faire, leur qualité et leur élégance : <strong className="text-charcoal">Descamps, Treca Paris, Pyrenex, Le Jacquard Français, Esteban Parfums</strong> et bien d&apos;autres.
                </p>
                <p>
                  Animée par une passion pour le raffinement et l&apos;art de vivre à la française, Mobikit propose des collections haut de gamme alliant design, confort et excellence artisanale, afin d&apos;offrir une expérience unique à sa clientèle.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image src="/images/showroom-descamps-facade.webp" alt="Mobikit Showroom Descamps" fill className="object-cover" />
                </div>
                <div className="relative aspect-[3/4] overflow-hidden mt-8">
                  <Image src="/images/showroom-linge.webp" alt="Mobikit Collections" fill className="object-cover" />
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gold text-white px-8 py-4 text-center">
                <div className="font-serif text-3xl font-light">1997</div>
                <div className="text-[9px] tracking-ultra-wide uppercase mt-1">Fondée</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              ['25+', 'Années d\'expérience'],
              ['13+', 'Marques de prestige'],
              ['5000+', 'Clients satisfaits'],
              ['2', 'Showrooms au Maroc'],
            ].map(([num, label]) => (
              <div key={label}>
                <div className="font-serif text-5xl font-light text-gold mb-2">{num}</div>
                <div className="text-[10px] tracking-widest uppercase text-charcoal-light">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-subtitle mb-3">Ce Qui Nous Guide</p>
            <h2 className="section-title">Nos Valeurs</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={v.title} className="text-center p-8 border border-cream-dark hover:border-gold transition-colors duration-300">
                <div className="font-serif text-5xl font-light text-gold/30 mb-4">0{i + 1}</div>
                <h3 className="font-serif text-xl font-light text-charcoal mb-3">{v.title}</h3>
                <div className="w-8 h-px bg-gold mx-auto mb-4" />
                <p className="text-xs text-charcoal-light leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-charcoal-dark px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-ultra-wide uppercase text-gold mb-3">25 Ans</p>
            <h2 className="font-serif text-4xl font-light text-white">Notre Parcours</h2>
            <div className="gold-divider" />
          </div>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div key={item.year} className="flex gap-8 items-start">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-12 h-12 rounded-full border-2 border-gold flex items-center justify-center">
                    <span className="text-[10px] font-medium text-gold">{item.year}</span>
                  </div>
                  {i < timeline.length - 1 && <div className="w-px h-12 bg-gold/30 mt-2" />}
                </div>
                <div className="pt-3 pb-8">
                  <p className="text-sm text-white/80 leading-relaxed">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center bg-cream">
        <p className="section-subtitle mb-3">Rejoignez-Nous</p>
        <h2 className="section-title mb-4">Visitez Notre Showroom</h2>
        <div className="gold-divider" />
        <p className="text-sm text-charcoal-light mt-4 mb-8 max-w-md mx-auto">
          Venez découvrir nos collections et laissez-vous inspirer par l&apos;univers Mobikit.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/showroom" className="btn-primary">Visiter le Showroom</Link>
          <Link href="/contact" className="btn-outline">Nous Contacter</Link>
        </div>
      </section>
    </>
  )
}
