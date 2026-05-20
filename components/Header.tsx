'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
  { name: 'Esteban Parfums', href: '/boutique/esteban-parfums' },
  { name: 'Literie de Luxe', href: '/boutique/literie' },
  { name: 'Mobilier', href: '/boutique/mobilier' },
  { name: 'Décoration', href: '/boutique/decoration' },
]

const brands = [
  { name: 'Descamps',            slug: 'descamps',             logo: '/logos/descamps.png',             w: 160, h: 65, removeBg: true  },
  { name: 'Le Jacquard Français',slug: 'le-jacquard-francais', logo: '/logos/le-jacquard-francais.png', w: 155, h: 68, removeBg: true  },
  { name: 'Esteban Parfums',     slug: 'esteban-parfums',      logo: '/logos/esteban.png',              w: 150, h: 62, removeBg: true  },
  { name: 'Aquanova',            slug: 'aquanova',             logo: '/logos/aquanova.png',             w: 110, h: 50, removeBg: false },
  { name: 'Blomus',              slug: 'blomus',               logo: '/logos/blomus.png',               w: 140, h: 52, removeBg: true  },
  { name: 'Cosmic',              slug: 'cosmic',               logo: '/logos/cosmic.png',               w: 90,  h: 40, removeBg: false },
  { name: 'Pilus',               slug: 'pilus',                logo: '/logos/pilus.png',                w: 130, h: 55, removeBg: true  },
  { name: 'Brun de Vian-Tiran',  slug: 'brun-de-vian-tiran',   logo: '/logos/bvt.png',                  w: 75,  h: 62, removeBg: false },
  { name: 'Ilum',                slug: 'ilum',                 logo: '/logos/ilum.png',                 w: 140, h: 60, removeBg: true  },
  { name: 'Oscar',               slug: 'oscar',                logo: '/logos/oscar.png',                w: 80,  h: 40, removeBg: false },
  { name: 'Geodesis',            slug: 'geodesis',             logo: '/logos/geodesis.png',             w: 100, h: 40, removeBg: false },
  { name: 'La Savonnerie Royale',slug: 'la-savonnerie-royale', logo: '/logos/savonnerie-royale.png',    w: 120, h: 58, removeBg: false },
  { name: 'Treca',               slug: 'treca',                logo: '/logos/treca.png',                w: 140, h: 56, removeBg: true  },
  { name: 'Vispring',            slug: 'vispring',             logo: '/logos/vispring.png',             w: 150, h: 58, removeBg: true  },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  const [brandsOpen, setBrandsOpen] = useState(false)

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
      <header className={`sticky top-0 z-50 transition-all duration-300 bg-white ${scrolled ? 'shadow-sm' : ''}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">

            {/* Left nav : À Propos - Boutique - Nos Marques */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/a-propos" className="nav-link">À Propos</Link>

              <div className="relative">
                <button
                  className="nav-link flex items-center gap-1"
                  onMouseEnter={() => setShopOpen(true)}
                  onMouseLeave={() => setShopOpen(false)}
                >
                  Nos Produits <ChevronDown size={12} />
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
                      <Link key={brand.slug} href={`/marques/${brand.slug}`}
                        className="block px-6 py-2.5 text-xs tracking-widest uppercase text-charcoal hover:text-gold hover:pl-8 transition-all duration-200">
                        {brand.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Logo centré */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-center">
              <div className="font-serif text-3xl font-light tracking-wide text-charcoal-dark leading-none">
                Mobikit
              </div>
              <div className="text-[9px] tracking-ultra-wide uppercase text-gold font-medium mt-0.5">
                Home Collections
              </div>
            </Link>

            {/* Right nav : Showroom - Inspirations - Contact */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/showroom" className="nav-link">Showroom</Link>
              <Link href="/blog" className="nav-link">Inspirations</Link>
              <Link href="/contact" className="nav-link">Contact</Link>
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-5 lg:hidden ml-auto">
              <Link href="/panier" className="text-charcoal hover:text-gold transition-colors relative">
                <ShoppingBag size={18} />
              </Link>
              <button className="text-charcoal" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
            <div className="hidden lg:flex items-center gap-4 absolute right-6">
              <button className="text-charcoal hover:text-gold transition-colors">
                <Search size={18} />
              </button>
              <Link href="/compte" className="text-charcoal hover:text-gold transition-colors">
                <User size={18} />
              </Link>
              <Link href="/panier" className="text-charcoal hover:text-gold transition-colors relative">
                <ShoppingBag size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Brand logos bar */}
        <div className="hidden lg:block border-t border-b border-cream-dark bg-white">
          <div className="w-full px-6">
            <div className="flex items-center justify-between py-4 gap-3">
              {brands.map(brand => (
                <Link
                  key={brand.slug}
                  href={`/marques/${brand.slug}`}
                  title={brand.name}
                  className="flex items-center justify-center group shrink-0 opacity-75 hover:opacity-100 hover:scale-105 transition-all duration-300"
                >
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={brand.w}
                    height={brand.h}
                    style={{
                      width: brand.w,
                      height: brand.h,
                      objectFit: 'contain',
                      mixBlendMode: brand.removeBg ? 'multiply' : 'normal',
                    }}
                    onError={(e: any) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-cream-dark">
            <div className="px-6 py-4 space-y-3">
              <Link href="/a-propos" className="block nav-link text-[10px]" onClick={() => setMobileOpen(false)}>À Propos</Link>
              <p className="section-subtitle text-[10px] pt-2">Nos Produits</p>
              {categories.map(cat => (
                <Link key={cat.href} href={cat.href} className="block nav-link text-[10px] pl-3" onClick={() => setMobileOpen(false)}>
                  {cat.name}
                </Link>
              ))}
              <div className="border-t border-cream-dark pt-3 space-y-3">
                <Link href="/marques" className="block nav-link text-[10px]" onClick={() => setMobileOpen(false)}>Nos Marques</Link>
                <Link href="/showroom" className="block nav-link text-[10px]" onClick={() => setMobileOpen(false)}>Showroom</Link>
                <Link href="/blog" className="block nav-link text-[10px]" onClick={() => setMobileOpen(false)}>Inspirations</Link>
                <Link href="/contact" className="block nav-link text-[10px]" onClick={() => setMobileOpen(false)}>Contact</Link>
                <Link href="/faq" className="block nav-link text-[10px]" onClick={() => setMobileOpen(false)}>FAQ</Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
