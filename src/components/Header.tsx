import { useEffect } from 'react'
import { BRAND, HERO } from '@/lib/site-content'
import logoDealer from '@/assets/whatsapp-image-2026-11-24-at-20.04.35-d24d7.jpeg'

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
        <a
          href="/"
          className="flex shrink-0 items-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E11D2E]"
        >
          <img
            src={logoDealer}
            alt={BRAND.name}
            width={1280}
            height={256}
            className="h-10 w-auto sm:h-12 md:h-14"
          />
        </a>
        <a href="#diagnostico" className="btn-primary btn-small">
          Solicitar diagnóstico
        </a>
      </div>
    </header>
  )
}
