'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

export interface CartItem {
  id: string
  name: string
  brand: string
  price: number
  image: string
  slug: string
  qty: number
}

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'qty'>) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  openCart: () => void
  closeCart: () => void
  total: number
  count: number
}

const CartContext = createContext<CartContextType>({} as CartContextType)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const addItem = (item: Omit<CartItem, 'qty'>) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === item.id)
      if (exists) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...item, qty: 1 }]
    })
    setIsOpen(true)
  }

  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id))

  const updateQty = (id: string, qty: number) => {
    if (qty < 1) { removeItem(id); return }
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  const total = items.reduce((s, i) => s + i.price * i.qty, 0)
  const count = items.reduce((s, i) => s + i.qty, 0)

  return (
    <CartContext.Provider value={{
      items, isOpen, addItem, removeItem, updateQty,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      total, count,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
