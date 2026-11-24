import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Privacidade() {
  useEffect(() => {
    document.title = 'Política de Privacidade | Dealer Evolution'
  }, [])

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-5 py-16 sm:py-24">
      <div>
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-[#969696] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5AC42]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Voltar para o início
        </Link>
        <h1 className="text-3xl font-bold text-[#F5F5F5] sm:text-4xl">Política de Privacidade</h1>
        <p className="mt-1 text-xs text-[#969696]">
          Em conformidade com a LGPD (Lei nº 13.709/2018)
        </p>
      </div>

      {/* Texto legal PENDENTE de definição do proprietário — conteúdo atual é o anterior à prancha */}
      <div className="space-y-6 rounded-[14px] border border-[#262626] bg-[#141414] p-8 text-[17px] leading-relaxed text-[#BDBDBD]">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Informações Coletadas</h2>
          <p>
            Coletamos apenas as informações estritamente necessárias para processar seu contato,
            viabilizar o agendamento do diagnóstico estratégico e fornecer o suporte adequado: nome
            completo, endereço de e-mail, telefone/WhatsApp e descrição do seu desafio atual.
          </p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. Finalidade do Tratamento</h2>
          <p>
            Seus dados são tratados com o objetivo de retornar seu contato, agendar a consultoria
            estratégica, incluir você nos canais de comunicação da mentoria e aprimorar os conteúdos
            e serviços oferecidos.
          </p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Compartilhamento e Sigilo</h2>
          <p>
            Não comercializamos, alugamos nem transferimos seus dados pessoais a terceiros com fins
            publicitários. O compartilhamento ocorre apenas com provedores tecnológicos
            indispensáveis (plataformas de comunicação e hospedagem), sob estritos acordos de
            confidencialidade.
          </p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">4. Seus Direitos como Titular</h2>
          <p>
            Você tem o direito de solicitar a confirmação da existência de tratamento, a retificação
            de dados incompletos ou a exclusão definitiva dos seus dados de nossas bases de
            comunicação ativa a qualquer momento, bastando enviar um e-mail para nossa equipe de
            suporte.
          </p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">5. Contato do Encarregado de Dados</h2>
          <p>
            Dúvidas sobre o tratamento de dados pessoais devem ser encaminhadas diretamente para{' '}
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
