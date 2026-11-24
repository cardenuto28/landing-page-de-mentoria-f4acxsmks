import { useState, useEffect } from 'react'
import {
  Sparkles,
  ArrowRight,
  Star,
  CheckCircle2,
  TrendingUp,
  Award,
  Users,
  Target,
  ShieldCheck,
  ChevronDown,
  Play,
  Clock,
  Calendar,
  Lock,
  Flame,
  MousePointer,
  HelpCircle,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { EnrollmentModal } from '@/components/EnrollmentModal'

export default function Index() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('Mentoria Completa')
  const [videoModalOpen, setVideoModalOpen] = useState(false)

  // Active testimonial carousel slide
  const [currentSlide, setCurrentSlide] = useState(0)

  // Countdown timer for final CTA (target 3 days from now)
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 38,
    seconds: 45,
  })

  useEffect(() => {
    document.title = 'Mentoria Ricardo Silveira | Transforme seu Esforço em Resultado Real'
  }, [])

  // Countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 }
        }
        if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        // restart with 3 days
        return { days: 2, hours: 23, minutes: 59, seconds: 59 }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Auto-play carousel every 5s unless reduced motion is active
  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }, 5500)
    return () => clearInterval(interval)
  }, [])

  const openEnrollment = (planName: string) => {
    setSelectedPlan(planName)
    setModalOpen(true)
  }

  const testimonials = [
    {
      name: 'Guilherme Rezende',
      role: 'Fundador da Agência ScaleFlow',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=14',
      badge: 'De R$ 12k para R$ 68k/mês',
      rating: 5,
      quote:
        'Eu trabalhava 14 horas por dia sem ver a cor do dinheiro. O Ricardo reestruturou meu modelo de precificação, me colocou com foco nos clientes certos e em 4 meses triplicamos o faturamento com menos estresse.',
    },
    {
      name: 'Mariana Duarte',
      role: 'Consultora de RH & Liderança',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=28',
      badge: 'Contrato corporativo de R$ 140k',
      rating: 5,
      quote:
        'O método de diagnóstico tirou a névoa dos meus olhos. Eu tinha vergonha de cobrar o valor real da minha hora. O acompanhamento semanal é o grande diferencial: você não tem como procrastinar.',
    },
    {
      name: 'Bruno Carvalho',
      role: 'Diretor de Tecnologia e Mentor Técnico',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=81',
      badge: 'Transição executiva + R$ 380k gerados',
      rating: 5,
      quote:
        'A clareza dos 4 pilares me economizou pelo menos 3 anos de erros amadores. Consegui estruturar meu produto de mentoria corporativa com margem de 85% já no segundo mês de acompanhamento.',
    },
    {
      name: 'Camila Peixoto',
      role: 'Arquiteta e Gestora de Projetos',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=94',
      badge: 'Agenda lotada por 8 meses',
      rating: 5,
      quote:
        'Não é curso, é parceria de negócios. Ricardo analisa seus números, suas mensagens para clientes e ajusta em tempo real. Foi o melhor investimento profissional da minha carreira.',
    },
  ]

  const stats = [
    { value: '+500', label: 'Alunos e mentorados formados' },
    { value: '4.9/5', label: 'Avaliação média de satisfação' },
    { value: '7 anos', label: 'De mercado acelerando líderes' },
    { value: '90%', label: 'Taxa de renovação e recomendação' },
  ]

  const painPoints = [
    {
      icon: Clock,
      title: 'Você trabalha muito, mas não vê o resultado financeiro',
      desc: 'Os dias voam em tarefas operacionais sem que sobre caixa ou tempo para pensar a longo prazo.',
    },
    {
      icon: Target,
      title: 'Falta um método claro e validado para seguir',
      desc: 'Consome podcasts, livros e vídeos, mas na hora de executar não sabe qual deve ser o próximo passo.',
    },
    {
      icon: Flame,
      title: 'Começa projetos cheios de energia e desiste no meio',
      desc: 'A síndrome da iniciativa sem acabativa te impede de colher os frutos da consistência prolongada.',
    },
    {
      icon: TrendingUp,
      title: 'Sem tempo para estruturar uma estratégia sólida',
      desc: 'Apaga incêndios o dia todo e vive na ansiedade constante de perder oportunidades do mercado.',
    },
    {
      icon: Lock,
      title: 'Medo de investir alto sem garantia de retorno',
      desc: 'Já comprou cursos que deixaram dúvidas soltas e ninguém para responder suas perguntas específicas.',
    },
    {
      icon: Users,
      title: 'Se sente sozinho nas tomadas de decisão',
      desc: 'Não tem com quem debater contratos, contratações, metas ou problemas delicados com sinceridade.',
    },
  ]

  const pillars = [
    {
      number: '01',
      title: 'Diagnóstico Cirúrgico',
      description:
        'Mapeamento completo do seu momento profissional, gargalos invisíveis, precificação e definição da meta financeira exata para os próximos 90 dias.',
    },
    {
      number: '02',
      title: 'Estratégia Sob Medida',
      description:
        'Construção de uma rota clara de ação. Adeus tarefas irrelevantes: apenas as alavancas de alto impacto que movem o ponteiro do seu negócio.',
    },
    {
      number: '03',
      title: 'Execução & Acompanhamento',
      description:
        'Encontros semanais ao vivo, feedbacks pontuais e ajustes em tempo real. Alguém experiente cobrando seus prazos e te destravando imediatamente.',
    },
    {
      number: '04',
      title: 'Escala & Consolidação',
      description:
        'Padronização de processos, posicionamento de autoridade no seu nicho e automação dos fluxos para sustentar o crescimento sem esgotamento mental.',
    },
  ]

  const inclusions = [
    'Encontros semanais ao vivo de alinhamento tático',
    'Mentorias em grupo reduzido com feedbacks pontuais',
    'Acesso direto e exclusivo ao grupo VIP no WhatsApp',
    'Materiais, planilhas financeiras e contratos prontos',
    'Suporte prioritário individual com a equipe técnica',
    'Certificado executivo de conclusão chancelado',
    'Acesso integral por 12 meses à plataforma de conteúdos',
    'Bônus: Biblioteca completa com mais de 60 estudos de caso',
  ]

  const faqs = [
    {
      q: 'Como funciona a mentoria na prática?',
      a: 'Assim que sua vaga for confirmada, você preenche o formulário detalhado de diagnóstico. Teremos encontros semanais ao vivo via Zoom, canal direto via WhatsApp para suporte diário e tarefas táticas com acompanhamento de metas a cada 15 dias.',
    },
    {
      q: 'Preciso ter experiência prévia ou faturamento alto?',
      a: 'Você precisa ter uma habilidade, serviço ou empresa em andamento, além de disposição para aplicar o método. Não é para quem procura fórmulas mágicas sem esforço, mas sim para quem quer direção profissional acelerada.',
    },
    {
      q: 'Quanto tempo preciso dedicar por semana?',
      a: 'Cerca de 2 a 3 horas semanais são suficientes para assistir aos alinhamentos e executar as metas propostas. O objetivo da mentoria é exatamente economizar seu tempo, eliminando tarefas inúteis.',
    },
    {
      q: 'Como recebo o acesso depois de pagar?',
      a: 'Imediatamente após a confirmação do pagamento, você recebe um e-mail com as credenciais da plataforma, link do grupo VIP e o agendamento da sua primeira sessão de diagnóstico.',
    },
    {
      q: 'Posso parcelar no cartão de crédito ou pagar via Pix?',
      a: 'Sim! Aceitamos cartão de crédito em até 12 vezes (com opção de usar 2 cartões diferentes caso falte limite em um só) e pagamento via Pix à vista com desconto especial.',
    },
    {
      q: 'E se eu não gostar? Tenho garantia?',
      a: 'Sim. Você conta com garantia incondicional de 7 dias. Entre, acerte seu diagnóstico, participe do primeiro encontro ao vivo. Se achar que não valeu 10x o valor investido, devolvemos 100% do seu dinheiro.',
    },
    {
      q: 'As aulas são ao vivo ou gravadas?',
      a: 'Você tem o melhor dos dois mundos: os encontros de mentoria são ao vivo com espaço para perguntas diretas, e todas as gravações ficam disponíveis imediatamente para você rever quando quiser.',
    },
    {
      q: 'Ainda tenho dúvidas antes de decidir, como falo com vocês?',
      a: 'Você pode clicar no botão verde do WhatsApp que está flutuando no canto inferior ou na nossa equipe de suporte. Nosso time técnico responde em poucos minutos.',
    },
  ]

  return (
    <div className="relative overflow-hidden">
      {/* 1. HERO SECTION (Atenção) */}
      <section
        id="hero"
        aria-label="Apresentação da Mentoria"
        className="relative min-h-[90dvh] flex items-center pt-8 pb-16 lg:py-24"
      >
        {/* Glow and background grids */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#E8A33D]/10 rounded-full blur-[130px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-[#FF6B4A]/10 rounded-full blur-[110px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline and Call to Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8A33D]/15 border border-[#E8A33D]/30 text-xs sm:text-sm font-semibold text-[#F6C56A]">
                <Sparkles className="h-4 w-4 text-[#E8A33D]" />
                Mentoria Executiva 1:1 com Acompanhamento Próximo
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Transforme seu esforço em{' '}
                <span className="bg-gradient-to-r from-[#E8A33D] via-[#F6C56A] to-[#FF6B4A] bg-clip-text text-transparent">
                  resultado financeiro real
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Você já tentou de tudo, mas sente que falta método, foco e direção? Em 90 dias, você
                sai da estagnação operacional com um plano sob medida, cobrança semanal e metas
                mensuráveis para multiplicar seu faturamento.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Button
                  size="lg"
                  onClick={() => openEnrollment('Mentoria Completa')}
                  className="w-full sm:w-auto bg-gradient-to-r from-[#E8A33D] to-[#FF6B4A] hover:opacity-95 text-[#0A0E1A] font-bold text-base px-8 py-6 rounded-xl shadow-xl shadow-[#E8A33D]/30 transition-all hover:scale-105"
                >
                  Quero ser mentorado
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="w-full sm:w-auto border-white/20 bg-white/[0.03] hover:bg-white/[0.08] text-white hover:text-[#F6C56A] px-7 py-6 rounded-xl font-medium"
                >
                  <a href="#resultados">Ver depoimentos reais</a>
                </Button>
              </div>

              {/* Social Proof Trust Row */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 border-t border-white/[0.07]">
                <div className="flex -space-x-3 overflow-hidden">
                  <img
                    src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1"
                    alt="Aluno da mentoria"
                    width={40}
                    height={40}
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-[#0A0E1A] object-cover"
                  />
                  <img
                    src="https://img.usecurling.com/ppl/thumbnail?gender=female&seed=2"
                    alt="Aluna da mentoria"
                    width={40}
                    height={40}
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-[#0A0E1A] object-cover"
                  />
                  <img
                    src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=3"
                    alt="Aluno da mentoria"
                    width={40}
                    height={40}
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-[#0A0E1A] object-cover"
                  />
                  <img
                    src="https://img.usecurling.com/ppl/thumbnail?gender=female&seed=4"
                    alt="Aluna da mentoria"
                    width={40}
                    height={40}
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-[#0A0E1A] object-cover"
                  />
                </div>

                <div className="text-left text-xs sm:text-sm">
                  <div className="flex items-center gap-1 text-[#FBBF24]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                    <span className="font-bold text-white ml-1">4.9/5</span>
                  </div>
                  <span className="text-slate-400 text-xs">
                    +500 alunos formados • +300 avaliações verificadas
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Mentor Image & Floating Stat Cards */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              {/* Radial glow background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E8A33D]/25 via-transparent to-[#FF6B4A]/20 rounded-full filter blur-2xl" />

              <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full p-2 bg-gradient-to-b from-[#E8A33D] via-[#E8A33D]/30 to-transparent shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#0A0E1A] bg-[#111827]">
                  <img
                    src="https://img.usecurling.com/ppl/large?gender=male&seed=42"
                    alt="Ricardo Silveira, Mentor Executivo de Negócios"
                    width={512}
                    height={512}
                    fetchPriority="high"
                    className="w-full h-full object-cover object-top animate-ken-burns"
                  />
                </div>
              </div>

              {/* Floating Stat Card 1 */}
              <div className="absolute -top-4 left-0 sm:-left-6 bg-[#111827]/90 backdrop-blur-md border border-[#E8A33D]/30 p-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-float">
                <div className="h-10 w-10 rounded-xl bg-[#E8A33D]/20 text-[#E8A33D] flex items-center justify-center">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Eficácia Comprovada
                  </div>
                  <div className="text-sm font-bold text-white">92% atingem meta em 6m</div>
                </div>
              </div>

              {/* Floating Stat Card 2 */}
              <div
                className="absolute -bottom-4 right-0 sm:-right-4 bg-[#111827]/90 backdrop-blur-md border border-white/[0.1] p-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-float"
                style={{ animationDelay: '2s' }}
              >
                <div className="h-10 w-10 rounded-xl bg-[#34D399]/20 text-[#34D399] flex items-center justify-center">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Impacto em Clientes
                  </div>
                  <div className="text-sm font-bold text-white">+R$ 2,4M gerados</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="mt-12 flex justify-center text-slate-500 hover:text-slate-300 transition-colors">
            <a
              href="#metodo"
              className="flex flex-col items-center gap-2 text-xs font-medium"
              aria-label="Rolar para a seção do método"
            >
              <span>Conhecer o método</span>
              <MousePointer className="h-4 w-4 animate-bounce text-[#E8A33D]" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. CREDIBILITY MARQUEE (Interesse) */}
      <section
        aria-label="Pilares e Valores da Mentoria"
        className="relative py-4 bg-[#080B14] border-y border-white/[0.08] overflow-hidden"
      >
        <div className="animate-marquee flex items-center gap-8 text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-300 whitespace-nowrap select-none">
          {[...Array(4)].map((_, groupIdx) => (
            <div key={groupIdx} className="flex items-center gap-8">
              <span>PROPÓSITO</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#E8A33D]" />
              <span>MÉTODO VALIDADO</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#E8A33D]" />
              <span>CONSISTÊNCIA ESTRATÉGICA</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#E8A33D]" />
              <span>RESULTADO FINANCEIRO</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#E8A33D]" />
              <span>TRANSFORMAÇÃO REAL</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#E8A33D]" />
              <span>COMUNIDADE VIP</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#E8A33D]" />
              <span>MENTORIA EXECUTIVA</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#E8A33D]" />
            </div>
          ))}
        </div>
      </section>

      {/* 3. NUMBERS SECTION */}
      <section
        aria-label="Resultados em Números"
        className="py-16 md:py-20 bg-gradient-to-b from-[#0A0E1A] to-[#0D1322]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#111827]/70 border border-white/[0.07] backdrop-blur-sm text-center hover:border-[#E8A33D]/40 transition-all hover:-translate-y-1"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#E8A33D] to-[#FF6B4A] bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs sm:text-sm text-slate-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PAIN POINTS SECTION (Desejo - Agitação) */}
      <section
        id="dores"
        aria-label="Pontos de dor e identificação"
        className="py-20 lg:py-28 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-[#FF6B4A] bg-[#FF6B4A]/10 px-3 py-1 rounded-full border border-[#FF6B4A]/20">
              Diagnóstico de Realidade
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Você se identifica com algum desses cenários?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              A maioria dos empresários e líderes talentosos não fracassa por falta de vontade, mas
              por insistir em remar sem mapa e sem bússola.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {painPoints.map((pain, idx) => {
              const Icon = pain.icon
              return (
                <Card
                  key={idx}
                  className="bg-[#111827]/60 border-white/[0.08] hover:border-[#E8A33D]/50 transition-all duration-300 hover:-translate-y-1.5 shadow-lg shadow-black/30 group rounded-2xl overflow-hidden"
                >
                  <CardContent className="p-7 space-y-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#1F293D] to-[#111827] border border-white/[0.1] text-[#E8A33D] flex items-center justify-center group-hover:scale-110 group-hover:border-[#E8A33D]/40 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#F6C56A] transition-colors leading-snug">
                      {pain.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{pain.desc}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Transition Line */}
          <div className="mt-16 text-center max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#1A1810] via-[#241B0E] to-[#1A1810] border border-[#E8A33D]/30 shadow-xl">
            <p className="text-base sm:text-xl font-semibold text-white leading-relaxed">
              &quot;Agora imagina acordar todos os dias com clareza absoluta, um plano cirúrgico no
              papel e alguém com ampla bagagem estratégica cobrando seus resultados semana a
              semana...&quot;
            </p>
            <div className="mt-4">
              <Button
                variant="link"
                asChild
                className="text-[#E8A33D] hover:text-[#F6C56A] font-bold text-sm inline-flex items-center gap-1"
              >
                <a href="#metodo">
                  Veja como funciona o método <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ABOUT THE MENTOR SECTION */}
      <section
        id="sobre"
        aria-label="Sobre o mentor Ricardo Silveira"
        className="py-20 lg:py-28 bg-[#0B0F1C] relative border-t border-white/[0.06]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Mentor Portrait and Quote */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl p-3 bg-gradient-to-br from-[#E8A33D]/50 via-white/10 to-transparent shadow-2xl">
                <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-[#111827]">
                  <img
                    src="https://img.usecurling.com/ppl/large?gender=male&seed=42"
                    alt="Ricardo Silveira no palco palestrando sobre negócios"
                    width={500}
                    height={625}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Floating Quote Card */}
              <div className="absolute -bottom-6 -right-2 sm:-right-6 bg-[#0E1526] border border-[#E8A33D]/30 p-4 rounded-2xl shadow-2xl max-w-xs">
                <p className="text-xs text-slate-300 italic">
                  &quot;Eu já estive exatamente onde você está hoje: trabalhando 16 horas por dia,
                  com excesso de informação e sem margem de lucro real.&quot;
                </p>
                <div className="mt-2 text-xs font-bold text-[#E8A33D]">— Ricardo Silveira</div>
              </div>
            </div>

            {/* Right: Narrative and Credentials */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase font-bold tracking-widest text-[#E8A33D] bg-[#E8A33D]/10 px-3 py-1 rounded-full border border-[#E8A33D]/20">
                Quem Conduzirá Sua Jornada
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Ricardo Silveira
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Empresário, consultor estratégico e investidor com mais de 14 anos de experiência no
                mercado corporativo e digital. Já liderou operações que ultrapassaram múltiplos 8
                dígitos em faturamento e treinou executivos das maiores empresas do país.
              </p>
              <p className="text-slate-300 text-base leading-relaxed">
                A Mentoria nasceu para eliminar a frustração de quem tem competência técnica de
                sobra, mas se sente preso na esteira do operacional e não consegue monetizar seu
                conhecimento na velocidade que merece.
              </p>

              {/* Credentials Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Mais de 14 anos de vivência executiva prática',
                  'Especialista em precificação e tração B2B/B2C',
                  'Conselheiro de 8 startups de alto crescimento',
                  '+R$ 45 milhões gerados sob sua consultoria direta',
                ].map((cred, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-slate-200">
                    <CheckCircle2 className="h-5 w-5 text-[#34D399] shrink-0 mt-0.5" />
                    <span>{cred}</span>
                  </div>
                ))}
              </div>

              {/* Video Thumbnail trigger */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(true)}
                  className="w-full sm:w-auto p-4 rounded-2xl bg-[#131B2E] border border-white/[0.1] hover:border-[#E8A33D]/50 flex items-center gap-4 group transition-all text-left"
                >
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#E8A33D] to-[#FF6B4A] flex items-center justify-center text-[#0A0E1A] shadow-md group-hover:scale-110 transition-transform">
                    <Play className="h-5 w-5 fill-current ml-0.5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white group-hover:text-[#F6C56A] transition-colors">
                      Assistir à mensagem do Ricardo (2 min)
                    </div>
                    <div className="text-xs text-slate-400">
                      Entenda por que este programa foi desenhado especialmente para o seu momento.
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. METHOD SECTION (O que você vai aprender) */}
      <section id="metodo" aria-label="Os 4 Pilares do Método" className="py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-[#E8A33D] bg-[#E8A33D]/10 px-3 py-1 rounded-full border border-[#E8A33D]/20">
              Arquitetura de Crescimento
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              O Método Ricardo Silveira
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Um passo a passo sequencial, exaustivamente testado em mais de 500 profissionais,
              desenhado para gerar tração nos primeiros 30 dias.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="relative p-7 rounded-2xl bg-[#111827]/70 border border-white/[0.08] hover:border-[#E8A33D]/50 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <span className="text-4xl font-extrabold text-[#E8A33D]/80 group-hover:text-[#F6C56A] transition-colors">
                    {pillar.number}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-4 mb-2">{pillar.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{pillar.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/[0.05] text-xs font-semibold text-[#E8A33D] flex items-center gap-1">
                  <span>Fase Estratégica</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            ))}
          </div>

          {/* O que está incluso Checklist */}
          <div className="mt-16 p-8 lg:p-12 rounded-3xl bg-[#0E1526] border border-white/[0.08] shadow-2xl">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h3 className="text-2xl font-bold text-white">O que está incluso na sua matrícula</h3>
              <p className="text-sm text-slate-400 mt-1">
                Tudo o que você precisa para executar com excelência, sem custos ocultos ou taxas
                adicionais.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {inclusions.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-[#131B2E]/60 border border-white/[0.04]"
                >
                  <CheckCircle2 className="h-5 w-5 text-[#E8A33D] shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-200 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION (Prova Social) */}
      <section
        id="resultados"
        aria-label="Resultados e depoimentos de alunos"
        className="py-20 lg:py-28 bg-[#090D18] relative border-y border-white/[0.06]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-[#34D399] bg-[#34D399]/10 px-3 py-1 rounded-full border border-[#34D399]/20">
              Transformações Verificadas
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Resultados Reais de Alunos
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Profissionais e empresários que confiaram no processo e transformaram a própria
              trajetória.
            </p>
          </div>

          {/* Testimonial Active Carousel Slide */}
          <div className="max-w-4xl mx-auto">
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#111827] to-[#131B2E] border border-[#E8A33D]/30 shadow-2xl relative">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <img
                  src={testimonials[currentSlide].avatar}
                  alt={testimonials[currentSlide].name}
                  width={96}
                  height={96}
                  loading="lazy"
                  decoding="async"
                  className="w-24 h-24 rounded-2xl object-cover ring-2 ring-[#E8A33D]/40 shadow-lg"
                />

                <div className="flex-1 space-y-3 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#34D399]/15 text-[#34D399] text-xs font-bold border border-[#34D399]/30">
                      {testimonials[currentSlide].badge}
                    </span>
                    <div className="flex text-[#FBBF24]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-slate-200 text-base sm:text-lg italic leading-relaxed">
                    &quot;{testimonials[currentSlide].quote}&quot;
                  </p>

                  <div>
                    <h3 className="text-white font-bold text-base">
                      {testimonials[currentSlide].name}
                    </h3>
                    <div className="text-xs text-slate-400">{testimonials[currentSlide].role}</div>
                  </div>
                </div>
              </div>

              {/* Carousel Navigation Dots */}
              <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-white/[0.06]">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Ver depoimento ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all ${
                      currentSlide === idx
                        ? 'w-8 bg-[#E8A33D]'
                        : 'w-2.5 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Secondary 3 Compact Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto">
            {[
              {
                text: 'A mentoria me economizou pelo menos R$ 50 mil em contratações erradas e agências que só prometiam.',
                author: 'Lucas Vianna',
                sub: 'E-commerce de Cosméticos',
              },
              {
                text: 'Sair de consultoria avulsa para contratos de retenção trimestral mudou completamente a previsibilidade do meu mês.',
                author: 'Fabiana Monteiro',
                sub: 'Consultora Tributária',
              },
              {
                text: 'Em 45 dias recuperei todo o investimento da Mentoria VIP fechando apenas 2 clientes qualificados.',
                author: 'Danilo Siqueira',
                sub: 'Software House',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#111827]/40 border border-white/[0.05] text-xs space-y-3"
              >
                <p className="text-slate-300 italic leading-relaxed">&quot;{item.text}&quot;</p>
                <div className="font-semibold text-white">
                  {item.author} <span className="text-slate-500 font-normal">• {item.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PRICING SECTION (Ação) */}
      <section
        id="investimento"
        aria-label="Planos e Investimento"
        className="py-20 lg:py-28 relative"
      >
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#E8A33D]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-[#E8A33D] bg-[#E8A33D]/10 px-3 py-1 rounded-full border border-[#E8A33D]/20">
              Escolha Sua Trajetória
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Invista no Seu Futuro Executivo
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Escolha o formato ideal para a maturidade e a velocidade que você busca para o seu
              negócio.
            </p>
          </div>

          {/* 3 Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {/* 1. Turma Online */}
            <div className="flex flex-col justify-between p-8 rounded-3xl bg-[#111827]/80 border border-white/[0.08] hover:border-white/20 transition-all shadow-xl">
              <div className="space-y-4">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Para quem quer autonomia
                </span>
                <h3 className="text-2xl font-bold text-white">Turma Online</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Ideal para quem deseja estudar no próprio ritmo e estruturar as bases com o acervo
                  gravado.
                </p>

                <div className="py-4 border-y border-white/[0.08]">
                  <div className="text-xs text-slate-400">Por apenas</div>
                  <div className="text-3xl font-extrabold text-white">12x R$ 197</div>
                  <div className="text-xs text-slate-400 mt-1">ou R$ 1.980 à vista</div>
                </div>

                <ul className="space-y-3 text-xs text-slate-300 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#E8A33D]" />
                    <span>Acesso a todas as aulas gravadas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#E8A33D]" />
                    <span>Acesso à comunidade geral de alunos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#E8A33D]" />
                    <span>Modelos de planilhas e contratos base</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#E8A33D]" />
                    <span>Acesso por 6 meses à plataforma</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Button
                  onClick={() => openEnrollment('Turma Online')}
                  variant="outline"
                  className="w-full border-white/20 hover:border-[#E8A33D] text-white hover:text-[#F6C56A] h-12 rounded-xl font-semibold"
                >
                  Garantir vaga na Turma
                </Button>
              </div>
            </div>

            {/* 2. Mentoria Completa (Highlighted Middle) */}
            <div className="relative flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#162036] via-[#111827] to-[#131B2E] border-2 border-[#E8A33D] shadow-2xl shadow-[#E8A33D]/20 lg:-translate-y-4">
              {/* Golden Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#E8A33D] to-[#FF6B4A] text-[#0A0E1A] font-extrabold text-xs uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg">
                ★ MAIS ESCOLHIDO
              </div>

              <div className="space-y-4 pt-2">
                <span className="text-xs font-semibold text-[#F6C56A] uppercase tracking-wider">
                  Aceleração com acompanhamento
                </span>
                <h3 className="text-3xl font-extrabold text-white">Mentoria Completa</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  O programa oficial com encontros semanais ao vivo, correção de rotas e comunidade
                  VIP.
                </p>

                <div className="py-4 border-y border-[#E8A33D]/30">
                  <div className="text-xs text-[#F6C56A]">Por apenas</div>
                  <div className="text-4xl font-extrabold text-white">12x R$ 497</div>
                  <div className="text-xs text-slate-300 mt-1">ou R$ 4.970 à vista no Pix</div>
                </div>

                <ul className="space-y-3 text-xs text-slate-200 pt-2">
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-[#34D399]" />
                    <span>Tudo da Turma Online incluso</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-[#34D399]" />
                    <span>Encontros semanais ao vivo com Ricardo</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-[#34D399]" />
                    <span>Plano de ação individual de 90 dias</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-[#34D399]" />
                    <span>Grupo VIP no WhatsApp com o mentor</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-[#34D399]" />
                    <span>Acesso total por 12 meses + gravações</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-[#34D399]" />
                    <span>Certificado executivo chancelado</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Button
                  onClick={() => openEnrollment('Mentoria Completa')}
                  className="w-full bg-gradient-to-r from-[#E8A33D] to-[#FF6B4A] hover:opacity-95 text-[#0A0E1A] h-12 rounded-xl font-bold text-base shadow-lg shadow-[#E8A33D]/30 pulse-glow"
                >
                  Garantir minha vaga oficial
                </Button>
              </div>
            </div>

            {/* 3. Mentoria VIP 1:1 */}
            <div className="flex flex-col justify-between p-8 rounded-3xl bg-[#111827]/80 border border-white/[0.08] hover:border-white/20 transition-all shadow-xl">
              <div className="space-y-4">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Exclusividade & Imersão
                </span>
                <h3 className="text-2xl font-bold text-white">Mentoria VIP 1:1</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Para líderes e empresários que exigem foco total e sessões individuais com Ricardo
                  Silveira.
                </p>

                <div className="py-4 border-y border-white/[0.08]">
                  <div className="text-xs text-slate-400">Por apenas</div>
                  <div className="text-3xl font-extrabold text-white">12x R$ 997</div>
                  <div className="text-xs text-slate-400 mt-1">ou R$ 9.970 à vista</div>
                </div>

                <ul className="space-y-3 text-xs text-slate-300 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#E8A33D]" />
                    <span>Tudo da Mentoria Completa incluso</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium text-white">
                    <CheckCircle2 className="h-4 w-4 text-[#E8A33D]" />
                    <span>4 sessões particulares 1:1 por mês</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium text-white">
                    <CheckCircle2 className="h-4 w-4 text-[#E8A33D]" />
                    <span>Linha direta privada de WhatsApp com Ricardo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#E8A33D]" />
                    <span>Auditoria profunda de contratos e propostas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#E8A33D]" />
                    <span>Vagas limitadas a 5 mentorados por ciclo</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Button
                  onClick={() => openEnrollment('Mentoria VIP 1:1')}
                  variant="outline"
                  className="w-full border-white/20 hover:border-[#E8A33D] text-white hover:text-[#F6C56A] h-12 rounded-xl font-semibold"
                >
                  Aplicar para Vaga VIP
                </Button>
              </div>
            </div>
          </div>

          {/* Guarantee Box */}
          <div className="mt-16 max-w-4xl mx-auto p-8 rounded-3xl bg-[#0F1628] border border-[#E8A33D]/30 flex flex-col sm:flex-row items-center gap-6 shadow-xl">
            <div className="h-16 w-16 rounded-2xl bg-[#E8A33D]/20 text-[#E8A33D] flex items-center justify-center shrink-0">
              <ShieldCheck className="h-9 w-9" />
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg font-bold text-white">Garantia Incondicional de 7 Dias</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Entre, assista às boas-vindas, participe do diagnóstico e do primeiro encontro. Se
                por qualquer motivo você achar que o programa não é para você, basta um único e-mail
                para receber 100% do seu dinheiro de volta. Sem burocracia, sem perguntas e sem
                letras miúdas.
              </p>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-[#34D399]" /> Pagamento 100% Seguro
            </span>
            <span>•</span>
            <span>Pix com aprovação imediata</span>
            <span>•</span>
            <span>Parcelamento em até 12x no cartão</span>
            <span>•</span>
            <span>Compra protegida com nota fiscal</span>
          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <section
        id="faq"
        aria-label="Perguntas frequentes sobre a mentoria"
        className="py-20 lg:py-28 bg-[#090D18] border-t border-white/[0.06]"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-[#E8A33D] bg-[#E8A33D]/10 px-3 py-1 rounded-full border border-[#E8A33D]/20">
              Transparência Total
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Perguntas Frequentes
            </h2>
            <p className="text-slate-300 text-base">
              Tudo o que você precisa saber antes de dar esse passo definitivo.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="bg-[#111827]/70 border border-white/[0.08] rounded-2xl px-6 data-[state=open]:border-[#E8A33D]/40"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-white hover:text-[#E8A33D] py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-slate-300 pb-5 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center p-6 rounded-2xl bg-[#0E1526] border border-white/[0.06]">
            <p className="text-sm text-slate-300">
              Sua dúvida não está aqui?{' '}
              <a
                href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Ainda%20tenho%20uma%20d%C3%BAvida%20sobre%20a%20mentoria."
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E8A33D] hover:underline font-bold inline-flex items-center gap-1"
              >
                <MessageCircle className="h-4 w-4" /> Converse diretamente com nossa equipe no
                WhatsApp
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA SECTION (com Countdown Timer) */}
      <section
        id="final-cta"
        aria-label="Chamada final para inscrição"
        className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-[#0A0E1A] via-[#141A2E] to-[#0A0E1A]"
      >
        <div className="absolute inset-0 bg-radial-gradient from-[#E8A33D]/15 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6B4A]/20 border border-[#FF6B4A]/40 text-xs sm:text-sm font-semibold text-[#FF6B4A]">
            <Clock className="h-4 w-4" /> As inscrições da atual turma encerram em breve
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Sua vaga na próxima turma está te esperando
          </h2>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Continuar fazendo as mesmas coisas esperando resultados diferentes é a definição de
            frustração. Dê o passo que separa o esforço cego do crescimento sustentável.
          </p>

          {/* Countdown Display */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 py-4">
            {[
              { val: String(timeLeft.days).padStart(2, '0'), label: 'Dias' },
              { val: String(timeLeft.hours).padStart(2, '0'), label: 'Horas' },
              { val: String(timeLeft.minutes).padStart(2, '0'), label: 'Minutos' },
              { val: String(timeLeft.seconds).padStart(2, '0'), label: 'Segundos' },
            ].map((unit, i) => (
              <div
                key={i}
                className="p-3 sm:p-5 rounded-2xl bg-[#0E1526]/90 border border-[#E8A33D]/30 min-w-[70px] sm:min-w-[100px] shadow-lg shadow-black/40"
              >
                <div className="text-2xl sm:text-4xl font-extrabold text-[#F6C56A] font-mono">
                  {unit.val}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>

          {/* Final CTA Button */}
          <div className="pt-2">
            <Button
              size="lg"
              onClick={() => openEnrollment('Mentoria Completa')}
              className="bg-gradient-to-r from-[#E8A33D] via-[#F6C56A] to-[#FF6B4A] hover:opacity-95 text-[#0A0E1A] font-extrabold text-lg px-10 py-7 rounded-2xl shadow-2xl shadow-[#E8A33D]/40 transition-all hover:scale-105"
            >
              Garantir minha vaga agora
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </div>

          <p className="text-xs text-slate-400">
            Acesso imediato à área de membros após a confirmação do pagamento.
          </p>
        </div>
      </section>

      {/* 11. ENROLLMENT MODAL (GLOBAL) */}
      <EnrollmentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedPlan={selectedPlan}
      />

      {/* Video Modal Player */}
      <Dialog open={videoModalOpen} onOpenChange={setVideoModalOpen}>
        <DialogContent className="sm:max-w-[720px] bg-[#0E1424] border border-[#E8A33D]/30 text-white p-6 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
              <Play className="h-5 w-5 text-[#E8A33D]" /> Mensagem do Mentor Ricardo Silveira
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-black/80 flex flex-col items-center justify-center p-6 text-center border border-white/[0.08]">
            <div className="h-16 w-16 rounded-full bg-[#E8A33D]/20 text-[#E8A33D] flex items-center justify-center mb-4">
              <Play className="h-8 w-8 fill-current ml-1" />
            </div>
            <h3 className="text-base font-bold text-white">
              Vídeo institucional em alta definição
            </h3>
            <p className="text-xs text-slate-400 max-w-md mt-1">
              &quot;Por que método e cobrança estratégica geram 5x mais resultados que motivação
              vazia.&quot;
            </p>
            <div className="mt-6">
              <Button
                onClick={() => {
                  setVideoModalOpen(false)
                  openEnrollment('Mentoria Completa')
                }}
                className="bg-gradient-to-r from-[#E8A33D] to-[#FF6B4A] text-[#0A0E1A] font-bold text-xs"
              >
                Gostei da visão, quero me inscrever
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
