import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CheckCircle2, ArrowLeft, MessageCircle, Mail, Sparkles, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Obrigado() {
  const location = useLocation()
  const [leadData, setLeadData] = useState<{ plan?: string; name?: string } | null>(null)

  useEffect(() => {
    document.title = 'Inscrição Recebida | Mentoria Ricardo Silveira'
  }, [])

  useEffect(() => {
    // Read from route state or fallback to sessionStorage
    const statePlan = location.state?.plan
    const stateName = location.state?.name

    if (statePlan || stateName) {
      setLeadData({ plan: statePlan, name: stateName })
    } else {
      const stored = sessionStorage.getItem('mentoria_enrollment')
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          setLeadData({ plan: parsed.plan, name: parsed.name })
        } catch {
          // ignore parsing error
        }
      }
    }
  }, [location.state])

  const planName = leadData?.plan || 'Mentoria Completa'
  const studentName = leadData?.name ? `, ${leadData.name.split(' ')[0]}` : ''

  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center space-y-8">
      {/* Success Animated Icon */}
      <div className="relative inline-flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-[#E8A33D]/20 animate-ping opacity-60" />
        <div className="relative h-24 w-24 rounded-full bg-gradient-to-tr from-[#E8A33D] to-[#FF6B4A] flex items-center justify-center text-[#0A0E1A] shadow-2xl shadow-[#E8A33D]/40">
          <CheckCircle2 className="h-12 w-12 stroke-[2.5]" />
        </div>
      </div>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#34D399]/15 text-[#34D399] border border-[#34D399]/30">
          <Sparkles className="h-3.5 w-3.5" /> Inscrição Confirmada com Sucesso
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Parabéns{studentName}!
        </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Sua solicitação de vaga foi registrada com prioridade. Você deu o primeiro e mais
          importante passo para transformar seu esforço em resultado palpável.
        </p>
      </div>

      {/* Plan Card Summary */}
      <div className="p-6 rounded-2xl bg-[#0E1526] border border-[#E8A33D]/40 shadow-xl text-left max-w-xl mx-auto space-y-3">
        <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
          Resumo do Seu Plano
        </div>
        <div className="text-xl font-bold text-white flex items-center justify-between">
          <span>{planName}</span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-[#E8A33D]/20 text-[#E8A33D] font-semibold">
            Vaga Reservada
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed border-t border-white/[0.08] pt-3">
          As instruções de acesso à plataforma de aulas, convite para o grupo exclusivo de WhatsApp
          e link direto do primeiro diagnóstico foram enviadas para a sua caixa de entrada.
        </p>
      </div>

      {/* Next Steps List */}
      <div className="p-6 rounded-2xl bg-[#111827]/70 border border-white/[0.08] max-w-xl mx-auto text-left space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#F6C56A]">
          Próximos passos imediatos:
        </h2>
        <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
          <li className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-[#E8A33D] shrink-0 mt-0.5" />
            <div>
              <strong>Verifique seu e-mail:</strong> Procure pela mensagem de boas-vindas da
              Mentoria Ricardo Silveira (confira também a pasta de spam/promoções).
            </div>
          </li>
          <li className="flex items-start gap-3">
            <MessageCircle className="h-5 w-5 text-[#25D366] shrink-0 mt-0.5" />
            <div>
              <strong>Fale no WhatsApp de integração:</strong> Nosso time entrará em contato para
              liberar seu acesso prioritário ao grupo de alunos.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-[#34D399] shrink-0 mt-0.5" />
            <div>
              <strong>Preencha o formulário de diagnóstico:</strong> Ele levará cerca de 7 minutos e
              será o ponto de partida para suas metas individuais.
            </div>
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Button
          asChild
          className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-7 py-6 rounded-xl shadow-lg shadow-[#25D366]/25"
        >
          <a
            href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Acabei%20de%20me%20inscrever%20na%20mentoria%20e%20quero%20agilizar%20meu%20acesso."
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="h-5 w-5 mr-2" /> Falar com Suporte no WhatsApp
          </a>
        </Button>

        <Button
          asChild
          variant="outline"
          className="w-full sm:w-auto border-white/20 text-slate-200 hover:text-white px-6 py-6 rounded-xl"
        >
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para a página inicial
          </Link>
        </Button>
      </div>
    </div>
  )
}
