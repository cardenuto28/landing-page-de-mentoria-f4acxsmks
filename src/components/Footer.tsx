import { BRAND, FOOTER } from '@/lib/site-content'

export default function Footer() {
  return (
    <footer className="border-t border-[#262626] bg-[#0B0B0B] py-10">
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
