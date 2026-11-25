import { MessageCircle } from 'lucide-react'
import { useContatos } from '@/hooks/use-contatos'

const MENSAGEM = 'Olá! Quero saber mais sobre a mentoria.'

/**
 * Botão flutuante de WhatsApp. Usa o número cadastrado em `configuracoes`;
 * sem número cadastrado, não renderiza nada.
 */
export default function WhatsappFlutuante() {
  const { whatsapp } = useContatos()
  const numero = whatsapp.replace(/\D/g, '')
  if (numero === '') return null

  const href = `https://wa.me/${numero}?text=${encodeURIComponent(MENSAGEM)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Dealer Evolution pelo WhatsApp (abre em nova aba)"
      className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0B] motion-reduce:transition-none sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
    >
      <MessageCircle aria-hidden="true" className="h-7 w-7 sm:h-8 sm:w-8" />
    </a>
  )
}
