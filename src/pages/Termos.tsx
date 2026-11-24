import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Termos() {
  useEffect(() => {
    document.title = 'Termos de Uso | Dealer Evolution'
  }, [])

  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <div>
        <Button asChild variant="ghost" size="sm" className="text-slate-400 hover:text-white mb-6">
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para o início
          </Link>
        </Button>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E11D2E]/10 text-[#FF5A6B] border border-[#E11D2E]/20 mb-3">
          <Shield className="h-3.5 w-3.5" /> Condições Gerais
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Termos de Uso</h1>
        <p className="text-xs text-slate-400 mt-1">Última atualização: Janeiro de 2025</p>
      </div>

      <div className="space-y-6 text-sm text-slate-300 leading-relaxed bg-[#0E1526] p-8 rounded-2xl border border-white/[0.08]">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Objeto e Natureza do Serviço</h2>
          <p>
            Os programas de mentoria da Dealer Evolution consistem em serviços educacionais e de
            orientação estratégica executiva fornecidos em formato híbrido (encontros ao vivo,
            sessões individuais e materiais de apoio, a depender do programa contratado), com base
            na metodologia Dealer Evolution®.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. Propriedade Intelectual</h2>
          <p>
            Todos os materiais didáticos, frameworks, apresentações, planilhas e gravações
            disponibilizados durante os programas são de titularidade exclusiva da Dealer Evolution
            e protegidos pela Lei de Direitos Autorais. É estritamente vedado o compartilhamento,
            reprodução, revenda ou cessão de acessos a terceiros sem autorização prévia por escrito.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Agendamento e Remarcação de Sessões</h2>
          <p>
            As sessões de diagnóstico e de mentoria devem ser agendadas com antecedência mínima de
            24 horas. Remarcações solicitadas com menos de 24 horas de antecedência ou ausências não
            comunicadas poderão ser consideradas sessão realizada.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">4. Isenção de Promessa de Ganhos Fixos</h2>
          <p>
            A mentoria fornece ferramentas metodológicas, orientações analíticas e direcionamento
            tático. Os resultados comerciais, financeiros e organizacionais dependem da execução
            individual, da dedicação e das condições de mercado de cada empresa. Nenhuma promessa de
            faturamento automático ou garantia de êxito econômico é expressa ou implícita.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">5. Canal de Atendimento</h2>
          <p>
            Para esclarecimentos sobre estes termos ou solicitações administrativas, entre em
            contato via e-mail em{' '}
            <a href="mailto:contato@dealerevolution.com.br" className="text-[#E11D2E] underline">
              contato@dealerevolution.com.br
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
