'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, ShoppingBag, User, Menu, X, Phone, Mail, ChevronDown, Instagram, Facebook, Linkedin } from 'lucide-react'

const PinterestIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
)

const TikTokIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.15 8.15 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
  </svg>
)

const categories = [
  { name: 'Linge de Lit', href: '/boutique/linge-de-lit' },
  { name: 'Linge de Table', href: '/boutique/linge-de-table' },
  { name: 'Linge de Bain', href: '/boutique/linge-de-bain' },
  { name: 'Senteurs & Bougies', href: '/boutique/senteurs-bougies' },
  { name: 'Literie de Luxe', href: '/boutique/literie' },
  { name: 'Mobilier', href: '/boutique/mobilier' },
  { name: 'Décoration', href: '/boutique/decoration' },
]

const brands = [
  'Descamps',
  'Le Jacquard Français',
  'Esteban Parfums',
  'Aquanova',
  'Blomus',
  'Cosmic',
  'Pilus',
  'Brun de Vian-Tiran',
  'Ilum',
  'Oscar',
  'Geodesis',
  'La Savonnerie Royale',
  'Treca',
  'Vispring',
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  const [brandsOpen, setBrandsOpen] = useState(false)
  const [cartCount] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Top bar */}
      <div className="bg-charcoal-dark text-white text-xs py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-cream">
              <Phone size={11} />
              +212 666-427890
            </span>
            <span className="flex items-center gap-2 text-cream">
              <Mail size={11} />
              contact@mobikit.ma
            </span>
          </div>
          <p className="tracking-widest uppercase text-gold text-[10px]">
            LIVRAISON GRATUITE À CASABLANCA DÈS 500DH
          </p>
          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com/descamps_maroc/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors"><Instagram size={12} /></a>
            <a href="https://www.facebook.com/p/descamps_maroc-100064763023390/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors"><Facebook size={12} /></a>
            <a href="https://fr.pinterest.com/mobikit97/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors"><PinterestIcon /></a>
            <a href="https://www.tiktok.com/@descamps.maroc/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors"><TikTokIcon /></a>
            <a href="https://www.linkedin.com/company/mobikit-sarl/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors"><Linkedin size={12} /></a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-sm' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">

            {/* Left nav */}
            <nav className="hidden lg:flex items-center gap-8">
              <div className="relative group">
                <button
                  className="nav-link flex items-center gap-1"
                  onMouseEnter={() => setShopOpen(true)}
                  onMouseLeave={() => setShopOpen(false)}
                >
                  Boutique <ChevronDown size={12} />
                </button>
                {shopOpen && (
                  <div
                    className="absolute top-full left-0 bg-white shadow-lg border-t-2 border-gold min-w-[220px] py-4 z-50"
                    onMouseEnter={() => setShopOpen(true)}
                    onMouseLeave={() => setShopOpen(false)}
                  >
                    {categories.map(cat => (
                      <Link key={cat.href} href={cat.href}
                        className="block px-6 py-2.5 text-xs tracking-widest uppercase text-charcoal hover:text-gold hover:pl-8 transition-all duration-200">
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  className="nav-link flex items-center gap-1"
                  onMouseEnter={() => setBrandsOpen(true)}
                  onMouseLeave={() => setBrandsOpen(false)}
                >
                  Nos Marques <ChevronDown size={12} />
                </button>
                {brandsOpen && (
                  <div
                    className="absolute top-full left-0 bg-white shadow-lg border-t-2 border-gold min-w-[220px] py-4 z-50"
                    onMouseEnter={() => setBrandsOpen(true)}
                    onMouseLeave={() => setBrandsOpen(false)}
                  >
                    {brands.map(brand => (
                      <Link key={brand} href={`/marques/${brand.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-6 py-2.5 text-xs tracking-widest uppercase text-charcoal hover:text-gold hover:pl-8 transition-all duration-200">
                        {brand}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/showroom" className="nav-link">Showroom</Link>
            </nav>

            {/* Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-center">
              <div className="font-serif text-3xl font-light tracking-wide text-charcoal-dark leading-none">
                Mobikit
              </div>
              <div className="text-[9px] tracking-ultra-wide uppercase text-gold font-medium mt-0.5">
                Home Collections
              </div>
            </Link>

            {/* Right icons */}
            <div className="flex items-center gap-5 ml-auto">
              <button className="text-charcoal hover:text-gold transition-colors hidden md:block">
                <Search size={18} />
              </button>
              <Link href="/compte" className="text-charcoal hover:text-gold transition-colors hidden md:block">
                <User size={18} />
              </Link>
              <Link href="/panier" className="text-charcoal hover:text-gold transition-colors relative">
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button className="lg:hidden text-charcoal" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Secondary nav */}
        <div className="hidden lg:block border-t border-cream-dark">
          <div className="max-w-7xl mx-auto px-6">
            <nav className="flex justify-center gap-10 py-3">
              <Link href="/a-propos" className="nav-link text-[10px]">À Propos</Link>
              <Link href="/blog" className="nav-link text-[10px]">Inspirations</Link>
              <Link href="/contact" className="nav-link text-[10px]">Contact</Link>
              <Link href="/faq" className="nav-link text-[10px]">FAQ</Link>
            </nav>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-cream-dark">
            <div className="px-6 py-4 space-y-4">
              <p className="section-subtitle text-[10px]">Boutique</p>
              {categories.map(cat => (
                <Link key={cat.href} href={cat.href} className="block nav-link text-[10px]" onClick={() => setMobileOpen(false)}>
                  {cat.name}
                </Link>
              ))}
              <div className="border-t border-cream-dark pt-4 space-y-3">
                <Link href="/a-propos" className="block nav-link text-[10px]" onClick={() => setMobileOpen(false)}>À Propos</Link>
                <Link href="/marques" className="block nav-link text-[10px]" onClick={() => setMobileOpen(false)}>Nos Marques</Link>
                <Link href="/showroom" className="block nav-link text-[10px]" onClick={() => setMobileOpen(false)}>Showroom</Link>
                <Link href="/blog" className="block nav-link text-[10px]" onClick={() => setMobileOpen(false)}>Inspirations</Link>
                <Link href="/contact" className="block nav-link text-[10px]" onClick={() => setMobileOpen(false)}>Contact</Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
