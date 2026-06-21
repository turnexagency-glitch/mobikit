import Link from 'next/link'
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react'

const PinterestIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
)

const TikTokIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.15 8.15 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
  </svg>
)

export default function Footer() {
  return (
    <footer className="bg-charcoal-dark text-white">
      {/* Newsletter */}
      <div className="bg-charcoal py-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="section-subtitle text-gold text-[10px] mb-3">Restez Inspiré</p>
          <h3 className="font-serif text-2xl font-light mb-2">Rejoignez l&apos;Univers Mobikit</h3>
          <p className="text-xs text-gray-400 tracking-wide mb-6">
            Recevez nos nouvelles collections, inspirations et offres exclusives
          </p>
          <form className="flex gap-0 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder-gray-500 px-4 py-3 text-xs focus:outline-none focus:border-gold"
            />
            <button type="submit" className="bg-gold text-white px-6 py-3 text-xs tracking-widest uppercase hover:bg-gold-dark transition-colors">
              S&apos;inscrire
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="font-serif text-2xl font-light tracking-wide mb-1">Mobikit</div>
            <div className="text-[9px] tracking-ultra-wide uppercase text-gold mb-5">Home Collections</div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Depuis 1997, distributeur exclusif des plus grandes maisons européennes de linge de maison, literie, mobilier et décoration au Maroc.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://www.instagram.com/descamps_maroc/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors" title="Instagram">
                <Instagram size={16} />
              </a>
              <a href="https://www.facebook.com/p/descamps_maroc-100064763023390/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors" title="Facebook">
                <Facebook size={16} />
              </a>
              <a href="https://fr.pinterest.com/mobikit97/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors" title="Pinterest">
                <PinterestIcon />
              </a>
              <a href="https://www.tiktok.com/@descamps.maroc/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors" title="TikTok">
                <TikTokIcon />
              </a>
              <a href="https://www.linkedin.com/company/mobikit-sarl/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors" title="LinkedIn">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Boutique */}
          <div>
            <h4 className="text-[10px] tracking-ultra-wide uppercase text-gold mb-5">Boutique</h4>
            <ul className="space-y-3">
              {[
                ['Linge de Lit', '/boutique/linge-de-lit'],
                ['Linge de Table', '/boutique/linge-de-table'],
                ['Linge de Bain', '/boutique/linge-de-bain'],
                ['Senteurs & Bougies', '/boutique/senteurs-bougies'],
                ['Literie de Luxe', '/boutique/literie'],
                ['Mobilier', '/boutique/mobilier'],
                ['Décoration', '/boutique/decoration'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-xs text-gray-300 hover:text-gold transition-colors tracking-wide">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h4 className="text-[10px] tracking-ultra-wide uppercase text-gold mb-5">Informations</h4>
            <ul className="space-y-3">
              {[
                ['À Propos', '/a-propos'],
                ['Nos Marques', '/marques'],
                ['Showroom', '/showroom'],
                ['Blog & Inspirations', '/blog'],
                ['FAQ', '/faq'],
                ['Livraison & Retours', '/livraison'],
                ['Conditions Générales', '/cgv'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-xs text-gray-300 hover:text-gold transition-colors tracking-wide">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] tracking-ultra-wide uppercase text-gold mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-gold mt-0.5 flex-shrink-0" />
                <span className="text-xs text-gray-300 leading-relaxed">
                  Casablanca, Maroc<br />Showroom sur rendez-vous
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-gold flex-shrink-0" />
                <a href="tel:+212666427890" className="text-xs text-gray-300 hover:text-gold transition-colors">
                  +212 666-427890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-gold flex-shrink-0" />
                <a href="mailto:mobikit@mobikit.ma" className="text-xs text-gray-300 hover:text-gold transition-colors">
                  mobikit@mobikit.ma
                </a>
              </li>
            </ul>

            <div className="mt-6 p-4 border border-white/20">
              <p className="text-[10px] text-gray-400 tracking-wide mb-1">Paiement Sécurisé</p>
              <p className="text-xs text-gray-300">CMI · Carte Bancaire · Paiement à la livraison</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[10px] text-gray-400 tracking-wide">
            © {new Date().getFullYear()} Mobikit Home Collections. Tous droits réservés.
          </p>
          <p className="text-[10px] text-gray-400 tracking-wide">
            Made with ♥ by{' '}
            <a
              href="https://www.turnexagency.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-light transition-colors font-medium"
            >
              TURNEX AGENCY
            </a>
          </p>
          <div className="flex gap-6">
            <Link href="/cgv" className="text-[10px] text-gray-400 hover:text-gold transition-colors tracking-wide">
              Conditions Générales
            </Link>
            <Link href="/confidentialite" className="text-[10px] text-gray-400 hover:text-gold transition-colors tracking-wide">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
