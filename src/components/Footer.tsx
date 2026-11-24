import { BRAND, FOOTER } from '@/lib/site-content'
import { useCorFundoLogo } from '@/hooks/use-cor-fundo-logo'

export default function Footer() {
  const fundo = useCorFundoLogo()

  return (
    <footer className="border-t border-[#262626] py-10" style={{ backgroundColor: fundo }}>
      <div className="mx-auto flex max-w-[1160px] flex-col items-center justify-between gap-4 px-5 text-sm text-[#969696] sm:flex-row">
        <p>
          {BRAND.name.charAt(0) + BRAND.name.slice(1).toLowerCase()} · Alta Performance Comercial no
          Mercado Premium · © 2026
        </p>
        <div className="flex gap-6">
          <a href="/termos" className="underline underline-offset-2 hover:text-white">
            {FOOTER.direitaTermos}
          </a>
          <a href="/privacidade" className="underline underline-offset-2 hover:text-white">
            {FOOTER.direitaPrivacidade}
          </a>
        </div>
      </div>
    </footer>
  )
}
