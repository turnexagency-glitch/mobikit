'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const login = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.error || 'Erreur de connexion')
      }
    } catch {
      setError('Erreur réseau')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="font-serif text-3xl font-light text-charcoal">Mobikit</div>
          <div className="text-[10px] tracking-ultra-wide uppercase text-gold mt-1">Administration</div>
        </div>
        <div className="bg-white p-8 border border-cream-dark">
          <div className="relative mb-4">
            <input
              type={showPwd ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !loading && login()}
              placeholder="Mot de passe"
              className="w-full border border-cream-dark px-4 py-3 text-sm focus:outline-none focus:border-gold pr-10"
            />
            <button
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-light"
            >
              {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {error && <p className="text-xs text-red-500 mb-3">{error}</p>}
          <button onClick={login} disabled={loading} className="btn-primary w-full">
            {loading ? 'Connexion...' : 'Connexion'}
          </button>
        </div>
      </div>
    </div>
  )
}
