import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BRAND } from '@/lib/dealer-content'

export default function Obrigado() {
  useEffect(() => {
    document.title = 'Obrigado | Dealer Evolution'
  }, [])

  return (
    <div className="flex items-center justify-center py-24 px-4">
      <div className="max-w-xl w-full text-center space-y-6 bg-[#0C1018] border border-white/[0.08] rounded-2xl p-8 sm:p-12">
        <CheckCircle2 className="h-14 w-14 text-[#E11D2E] mx-auto" aria-hidden="true" />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Recebemos seu contato!</h1>
        <p className="text-slate-300 leading-relaxed">
          Obrigado pelo interesse na Dealer Evolution. Nossa equipe vai analisar seu desafio e
          entrar em contato em breve para agendar seu{' '}
          <strong className="text-[#FF5A6B]">diagnóstico estratégico gratuito</strong>.
        </p>
        <p className="text-sm text-slate-400">
          Se preferir falar agora, chame direto no WhatsApp ou envie um e-mail para{' '}
          <a href={`mailto:${BRAND.email}`} className="text-[#E11D2E] underline">
            {BRAND.email}
          </a>
          .
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button
            asChild
            className="bg-[#25D366] hover:bg-[#1FB857] text-[#06130A] font-bold rounded-xl border-0"
          >
            <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer">
              Falar no WhatsApp
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-white/15 text-slate-200 hover:bg-white/5 rounded-xl"
          >
            <Link to="/">Voltar para o início</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
