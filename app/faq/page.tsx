'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Quels sont les délais de livraison au Maroc ?', acceptedAnswer: { '@type': 'Answer', text: 'Nous livrons dans tout le Maroc sous 3 à 5 jours ouvrables pour les grandes villes (Casablanca, Rabat, Marrakech, Fès), et 5 à 7 jours pour les autres régions.' } },
    { '@type': 'Question', name: 'La livraison est-elle gratuite ?', acceptedAnswer: { '@type': 'Answer', text: 'La livraison est offerte pour toute commande supérieure à 2 000 MAD.' } },
    { '@type': 'Question', name: 'Quels modes de paiement acceptez-vous ?', acceptedAnswer: { '@type': 'Answer', text: 'Nous acceptons le paiement à la livraison (cash on delivery) pour les commandes jusqu\'à 5 000 MAD, ainsi que le virement bancaire pour les grandes commandes.' } },
    { '@type': 'Question', name: 'Les produits sont-ils authentiques ?', acceptedAnswer: { '@type': 'Answer', text: 'Absolument. Mobikit est distributeur officiel de toutes les marques présentes sur notre site. Chaque produit est accompagné de sa garantie fabricant d\'origine.' } },
    { '@type': 'Question', name: 'Quelle est votre politique de retour ?', acceptedAnswer: { '@type': 'Answer', text: 'Vous disposez de 14 jours à partir de la réception de votre commande pour retourner un article dans son emballage d\'origine, non utilisé et non lavé.' } },
    { '@type': 'Question', name: 'Comment entretenir mon linge de maison ?', acceptedAnswer: { '@type': 'Answer', text: 'Chaque produit est livré avec ses instructions d\'entretien. En général, nous recommandons un lavage à 40°C maximum pour préserver la qualité des fibres.' } },
    { '@type': 'Question', name: 'Proposez-vous des conseils personnalisés ?', acceptedAnswer: { '@type': 'Answer', text: 'Oui ! Notre équipe de conseillers est disponible par téléphone, email ou en showroom pour vous aider à choisir les produits adaptés à vos besoins et votre budget.' } },
  ],
}

const faqs = [
  {
    category: 'Commandes & Livraison',
    questions: [
      { q: 'Quels sont les délais de livraison au Maroc ?', a: 'Nous livrons dans tout le Maroc sous 3 à 5 jours ouvrables pour les grandes villes (Casablanca, Rabat, Marrakech, Fès), et 5 à 7 jours pour les autres régions.' },
      { q: 'La livraison est-elle gratuite ?', a: 'La livraison est offerte pour toute commande supérieure à 2 000 MAD. En dessous de ce montant, des frais de livraison s\'appliquent selon la destination.' },
      { q: 'Puis-je suivre ma commande ?', a: 'Oui, vous recevrez un email de confirmation avec un numéro de suivi dès que votre colis sera pris en charge par notre transporteur.' },
      { q: 'Proposez-vous la livraison express ?', a: 'Oui, nous proposons une livraison express 24h pour Casablanca et Rabat. Contactez-nous pour plus d\'informations.' },
    ]
  },
  {
    category: 'Paiement',
    questions: [
      { q: 'Quels modes de paiement acceptez-vous ?', a: 'Nous acceptons les paiements par carte bancaire (CMI), le paiement à la livraison (cash on delivery) pour les commandes jusqu\'à 5 000 MAD, ainsi que le virement bancaire pour les grandes commandes.' },
      { q: 'Le paiement en ligne est-il sécurisé ?', a: 'Oui, notre plateforme de paiement utilise la technologie CMI avec cryptage SSL. Vos données bancaires ne sont jamais stockées sur nos serveurs.' },
      { q: 'Puis-je payer en plusieurs fois ?', a: 'Nous étudions les demandes de paiement échelonné pour les commandes importantes. Contactez notre service client pour plus d\'informations.' },
    ]
  },
  {
    category: 'Retours & Remboursements',
    questions: [
      { q: 'Quelle est votre politique de retour ?', a: 'Vous disposez de 14 jours à partir de la réception de votre commande pour retourner un article dans son emballage d\'origine, non utilisé et non lavé.' },
      { q: 'Comment effectuer un retour ?', a: 'Contactez notre service client par email ou téléphone. Nous organiserons le retour et vous rembourserons sous 7 à 10 jours ouvrables après réception du colis.' },
      { q: 'Les frais de retour sont-ils à ma charge ?', a: 'En cas de produit défectueux ou d\'erreur de notre part, les frais de retour sont pris en charge. Pour les autres cas, les frais restent à la charge du client.' },
    ]
  },
  {
    category: 'Produits & Marques',
    questions: [
      { q: 'Les produits sont-ils authentiques ?', a: 'Absolument. Mobikit est distributeur officiel de toutes les marques présentes sur notre site. Chaque produit est accompagné de sa garantie fabricant d\'origine.' },
      { q: 'Comment entretenir mon linge de maison ?', a: 'Chaque produit est livré avec ses instructions d\'entretien. En général, nous recommandons un lavage à 40°C maximum pour préserver la qualité des fibres. Consultez notre blog pour des conseils détaillés.' },
      { q: 'Proposez-vous des conseils personnalisés ?', a: 'Oui ! Notre équipe de conseillers est disponible par téléphone, email ou en showroom pour vous aider à choisir les produits adaptés à vos besoins et votre budget.' },
    ]
  },
]

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-cream-dark">
      <button
        className="w-full flex items-center justify-between py-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-light text-charcoal pr-4">{question}</span>
        <ChevronDown size={16} className={`text-gold flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <p className="text-sm text-charcoal-light leading-relaxed pb-5">{answer}</p>
      )}
    </div>
  )
}

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="bg-cream py-16 px-6 text-center">
        <p className="section-subtitle mb-3">Aide</p>
        <h1 className="section-title">Questions Fréquentes</h1>
        <div className="gold-divider" />
        <p className="text-sm text-charcoal-light max-w-xl mx-auto mt-4">
          Retrouvez les réponses aux questions les plus fréquentes. Vous ne trouvez pas votre réponse ? Contactez-nous.
        </p>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          {faqs.map((section) => (
            <div key={section.category} className="mb-12">
              <h2 className="font-serif text-2xl font-light text-charcoal mb-2">{section.category}</h2>
              <div className="w-8 h-px bg-gold mb-6" />
              <div>
                {section.questions.map((item) => (
                  <AccordionItem key={item.q} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          ))}

          <div className="mt-16 p-10 bg-cream text-center border border-gold">
            <h3 className="font-serif text-2xl font-light text-charcoal mb-2">Besoin d&apos;Aide Supplémentaire ?</h3>
            <p className="text-sm text-charcoal-light mb-6">Notre équipe est là pour vous accompagner.</p>
            <Link href="/contact" className="btn-primary">Contactez-Nous</Link>
          </div>
        </div>
      </section>
    </>
  )
}
