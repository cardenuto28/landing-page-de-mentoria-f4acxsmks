import { useEffect, useState } from 'react'
import { BRAND, HERO } from '@/lib/site-content'
import logoDealer from '@/assets/whatsapp-image-2026-11-24-at-20.04.35-d24d7.jpeg'

const FUNDO_RESERVA = '#0B0B0B'

/** Lê a cor média do canto superior esquerdo do logotipo, que é o fundo sólido da imagem. */
function corDeFundoDoLogo(src: string): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        const amostra = 4
        canvas.width = amostra
        canvas.height = amostra
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        if (!ctx) return resolve(null)
        // Recorte 4×4 do canto superior esquerdo, copiado 1:1 (sem reamostrar o logo inteiro).
        ctx.drawImage(img, 0, 0, amostra, amostra, 0, 0, amostra, amostra)
        const { data } = ctx.getImageData(0, 0, amostra, amostra)
        let r = 0
        let g = 0
        let b = 0
        const n = data.length / 4
        for (let i = 0; i < data.length; i += 4) {
          r += data[i]
          g += data[i + 1]
          b += data[i + 2]
        }
        const hex = (v: number) =>
          Math.round(v / n)
            .toString(16)
            .padStart(2, '0')
        resolve(`#${hex(r)}${hex(g)}${hex(b)}`.toUpperCase())
      } catch {
        resolve(null)
      }
    }
    img.onerror = () => resolve(null)
    img.src = src
  })
}

export default function Header() {
  const [fundo, setFundo] = useState(FUNDO_RESERVA)

  useEffect(() => {
    let ativo = true
    corDeFundoDoLogo(logoDealer).then((cor) => {
      if (ativo && cor) setFundo(cor)
    })
    return () => {
      ativo = false
    }
  }, [])

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
    <header className="border-b border-[#262626]" style={{ backgroundColor: fundo }}>
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
