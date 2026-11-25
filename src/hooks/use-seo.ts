import { useEffect } from 'react'

interface SeoOptions {
  title: string
  description: string
}

/**
 * Define título e meta description da página enquanto ela estiver montada.
 * Ao sair, restaura os valores anteriores (os padrões de index.html).
 */
export function useSeo({ title, description }: SeoOptions) {
  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const previousTitle = document.title
    const previousDescription = meta?.getAttribute('content') ?? ''

    document.title = title
    meta?.setAttribute('content', description)

    return () => {
      document.title = previousTitle
      meta?.setAttribute('content', previousDescription)
    }
  }, [title, description])
}
