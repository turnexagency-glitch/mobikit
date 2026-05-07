'use client'
import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (i: number) => {
    setLightboxIndex(i)
    setLightbox(true)
  }

  const prev = () => setLightboxIndex(i => (i - 1 + images.length) % images.length)
  const next = () => setLightboxIndex(i => (i + 1) % images.length)

  if (!images || images.length === 0) {
    return <div className="aspect-square bg-cream-dark flex items-center justify-center text-sm text-charcoal-light">Photo à venir</div>
  }

  return (
    <>
      {/* Main image */}
      <div
        className="relative aspect-square overflow-hidden bg-cream mb-3 cursor-zoom-in group"
        onClick={() => openLightbox(active)}
      >
        <Image
          src={images[active]}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
        <div className="absolute top-3 right-3 bg-white/80 p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn size={16} className="text-charcoal" />
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative aspect-square overflow-hidden border-2 transition-all duration-200 ${
                active === i ? 'border-gold scale-105' : 'border-transparent hover:border-gold/50'
              }`}
            >
              <Image src={img} alt={`${name} ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={() => setLightbox(false)}>
          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white z-10"
            onClick={() => setLightbox(false)}
          >
            <X size={28} />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-widest">
            {lightboxIndex + 1} / {images.length}
          </div>

          {/* Prev */}
          {images.length > 1 && (
            <button
              className="absolute left-4 text-white/70 hover:text-white z-10 p-2"
              onClick={e => { e.stopPropagation(); prev() }}
            >
              <ChevronLeft size={36} />
            </button>
          )}

          {/* Main image */}
          <div
            className="relative w-full max-w-3xl max-h-[85vh] aspect-square mx-16"
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex]}
              alt={name}
              fill
              className="object-contain"
              quality={95}
            />
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              className="absolute right-4 text-white/70 hover:text-white z-10 p-2"
              onClick={e => { e.stopPropagation(); next() }}
            >
              <ChevronRight size={36} />
            </button>
          )}

          {/* Thumbnails strip */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); setLightboxIndex(i) }}
                  className={`relative w-12 h-12 overflow-hidden border-2 transition-all ${
                    lightboxIndex === i ? 'border-gold' : 'border-white/20 hover:border-white/60'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
