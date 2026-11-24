import { Link } from 'react-router-dom'
import { ArrowLeft, Compass } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-dvh flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-6">
        <Compass className="h-14 w-14 text-[#E11D2E] mx-auto" aria-hidden="true" />
        <p className="text-sm font-bold uppercase tracking-widest text-[#FF5A6B]">Erro 404</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Ops! Página não encontrada.
        </h1>
        <p className="text-slate-400">
          A página que você procura não existe ou foi movida. Volte para a home e continue sua
          evolução.
        </p>
        <Button
          asChild
          className="bg-[#E11D2E] hover:bg-[#c11426] text-white font-bold rounded-xl border-0"
        >
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para a Home
          </Link>
        </Button>
      </div>
    </div>
  )
}
