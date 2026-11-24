import { useEffect } from 'react'
import { BRAND, HERO } from '@/lib/site-content'
import logoDealer from '@/assets/preto-logo-4c160.png'

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
          className="flex shrink-0 items-center rounded-md bg-white px-2 py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E11D2E]"
        >
          <img
            src={logoDealer}
            alt={BRAND.name}
            width={1660}
            height={330}
            className="h-9 w-auto sm:h-11 md:h-[52px]"
          />
        </a>
        <a href="#diagnostico" className="btn-primary btn-small">
          Solicitar diagnóstico
        </a>
      </div>
    </header>
  )
}
