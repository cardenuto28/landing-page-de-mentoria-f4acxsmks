import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BRAND } from '@/lib/site-content'

export default function Obrigado() {
  useEffect(() => {
    document.title = 'Obrigado | Dealer Evolution'
  }, [])

  return (
    <div className="flex items-center justify-center py-24 px-4">
      <div className="max-w-xl w-full text-center space-y-6 bg-[#121212] border border-[#262626] rounded-2xl p-8 sm:p-12">
        <CheckCircle2 className="h-14 w-14 text-[#ED7620] mx-auto" aria-hidden="true" />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Recebemos seu contato!</h1>
        <p className="text-[#BDBDBD] leading-relaxed">
          Obrigado pelo interesse na Dealer Evolution. Nossa equipe vai analisar seu desafio e
          entrar em contato em breve.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button
            asChild
            className="bg-gradient-to-r from-[#F5AC42] to-[#ED7620] text-[#0B0B0B] font-bold rounded-xl border-0 hover:opacity-90"
          >
            <Link to="/">Voltar para o início</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
