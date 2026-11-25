import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useSeo } from '@/hooks/use-seo'

export default function Termos() {
  useSeo({
    title: 'Termos de Uso | Dealer Evolution',
    description:
      'Termos de Uso da Dealer Evolution: condições dos programas de mentoria e do diagnóstico estratégico.',
  })

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-5 py-16 sm:py-24">
      <div>
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-[#969696] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5AC42]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Voltar para o início
        </Link>
        <h1 className="text-3xl font-bold text-[#F5F5F5] sm:text-4xl">Termos de Uso</h1>
        <p className="mt-1 text-xs text-[#969696]">Última atualização: Janeiro de 2025</p>
      </div>

      {/* Texto legal PENDENTE de definição do proprietário — conteúdo atual é o anterior à prancha */}
      <div className="space-y-6 rounded-[14px] border border-[#262626] bg-[#141414] p-8 text-[17px] leading-relaxed text-[#BDBDBD]">
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
            <a href="mailto:contato@dealerevolution.com.br" className="text-[#ED7620] underline">
              contato@dealerevolution.com.br
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
