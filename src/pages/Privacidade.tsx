import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Privacidade() {
  useEffect(() => {
    document.title = 'Política de Privacidade | Dealer Evolution'
  }, [])

  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <div>
        <Button asChild variant="ghost" size="sm" className="text-slate-400 hover:text-white mb-6">
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para o início
          </Link>
        </Button>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 mb-3">
          <Lock className="h-3.5 w-3.5" /> Segurança dos Seus Dados
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Política de Privacidade</h1>
        <p className="text-xs text-slate-400 mt-1">
          Em conformidade com a LGPD (Lei nº 13.709/2018)
        </p>
      </div>

      <div className="space-y-6 text-sm text-slate-300 leading-relaxed bg-[#0C1018] p-8 rounded-2xl border border-white/[0.08]">
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
