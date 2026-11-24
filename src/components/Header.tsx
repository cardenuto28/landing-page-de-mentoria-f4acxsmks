import { useEffect } from 'react'
import { BRAND, HERO } from '@/lib/site-content'

export default function Header() {
  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === '#diagnostico') {
        document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth' })
      }
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <header className="border-b border-[#262626] bg-[#0B0B0B]">
      <div className="mx-auto flex h-20 max-w-[1160px] items-center justify-between px-5">
        <a href="/" className="text-lg font-bold tracking-[0.2em] text-white">
          {BRAND.name}
        </a>
        <a href="#diagnostico" className="btn-primary btn-small">
          Solicitar diagnóstico
        </a>
      </div>
    </header>
  )
}
