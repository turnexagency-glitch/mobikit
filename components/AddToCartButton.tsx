'use client'
import { useState } from 'react'
import { ShoppingBag, Check } from 'lucide-react'

export default function AddToCartButton({ product }: { product: any }) {
  const [selectedSize, setSelectedSize] = useState('')
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    if (product.sizes?.length > 0 && !selectedSize) return
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <div>
      {product.sizes?.length > 0 && (
        <div className="mb-5">
          <p className="text-[10px] tracking-widest uppercase text-charcoal font-medium mb-3">
            Choisir la dimension
          </p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size: string) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 text-xs border transition-all ${
                  selectedSize === size
                    ? 'border-charcoal bg-charcoal text-white'
                    : 'border-cream-dark text-charcoal hover:border-gold'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {!selectedSize && (
            <p className="text-[10px] text-gold mt-2">* Veuillez sélectionner une dimension</p>
          )}
        </div>
      )}

      <div className="flex gap-3 mb-5">
        <div className="flex items-center border border-cream-dark">
          <button
            onClick={() => setQty(q => Math.max(1, q - 1))}
            className="w-10 h-12 flex items-center justify-center hover:bg-cream transition-colors text-lg"
          >−</button>
          <span className="w-10 text-center text-sm font-medium">{qty}</span>
          <button
            onClick={() => setQty(q => q + 1)}
            className="w-10 h-12 flex items-center justify-center hover:bg-cream transition-colors text-lg"
          >+</button>
        </div>
        <button
          onClick={handleAdd}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs tracking-widest uppercase font-medium transition-all duration-300 ${
            added
              ? 'bg-green-600 text-white'
              : 'bg-charcoal text-white hover:bg-gold'
          }`}
        >
          {added
            ? <><Check size={14} /> Commandé ✓</>
            : <><ShoppingBag size={14} /> Commander</>
          }
        </button>
      </div>
    </div>
  )
}
