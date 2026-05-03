'use client'
import { useRouter } from 'next/navigation'
import { ShoppingBag } from 'lucide-react'

export default function AddToCartButton({ product }: { product: any }) {
  const router = useRouter()

  const handleCommander = () => {
    router.push('/commande')
  }

  return (
    <div className="mb-5">
      <button
        onClick={handleCommander}
        className="w-full flex items-center justify-center gap-2 py-4 bg-charcoal text-white text-xs tracking-widest uppercase font-medium hover:bg-gold transition-colors duration-300"
      >
        <ShoppingBag size={16} />
        Commander
      </button>
    </div>
  )
}
