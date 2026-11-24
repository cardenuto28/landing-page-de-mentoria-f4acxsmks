import { useEffect, useState } from 'react'
import logoDealer from '@/assets/whatsapp-image-2026-11-24-at-20.04.35-d24d7.jpeg'

/** Cor de reserva enquanto a imagem carrega ou se a leitura falhar. */
export const FUNDO_RESERVA = '#0B0B0B'

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

/** Cor de fundo medida do logotipo; header e rodapé usam este mesmo valor. */
export function useCorFundoLogo(): string {
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

  return fundo
}
