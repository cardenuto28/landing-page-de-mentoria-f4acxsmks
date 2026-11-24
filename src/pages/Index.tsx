import { useEffect, useRef, useState } from 'react'
import { formatPhoneBR } from '@/lib/masks'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Gauge,
  Timer,
  Flag,
  Trophy,
  TrendingUp,
  Users,
  Building2,
  Car,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  BRAND,
  HERO,
  STATS,
  PILARES,
  PILARES_INTRO,
  METODOLOGIA,
  FUNDADOR,
  CTA_FINAL,
} from '@/lib/dealer-content'

const PILAR_ICONS = [Gauge, Building2, Car]
const PILAR_DETAILS = [
  { duration: '60 dias', label: 'programa intensivo' },
  { label: 'mentoria executiva', icon: Users },
  { label: 'setor automotivo premium', icon: Car },
]
const STEP_ICONS = [Flag, Trophy, TrendingUp, Users, Gauge]

/* ---------- Reveal on scroll ---------- */
function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'li' | 'span'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const Comp = Tag as 'div'
  return (
    <Comp
      ref={ref}
      className={`${className} transition-all duration-700 motion-reduce:transition-none ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Comp>
  )
}

/* ---------- Animated counter ---------- */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setDisplay(value)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1600
          const start = performance.now()
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setDisplay(Math.round(eased * value))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

/* ---------- Parallax hero background ---------- */
function useParallax() {
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setOffset(window.scrollY))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])
  return offset
}

export default function Index() {
  const navigate = useNavigate()
  const parallaxY = useParallax()
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', desafio: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    navigate('/obrigado')
  }

  return (
    <div className="bg-[#07090F] text-slate-100">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden" aria-labelledby="hero-title">
        {/* Parallax background image */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <img
            src={HERO.image}
            alt=""
            width={1920}
            height={1080}
            className="h-[120%] w-full object-cover opacity-25"
            style={{ transform: `translateY(${parallaxY * 0.25}px) scale(1.1)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07090F]/80 via-[#07090F]/60 to-[#07090F]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07090F]/80 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-40 md:pb-24">
          <Reveal className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E11D2E]/40 bg-[#E11D2E]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A6B]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E11D2E] animate-pulse motion-reduce:animate-none" />
              {HERO.badge}
            </span>
          </Reveal>

          <Reveal delay={120} className="max-w-4xl mt-6">
            <h1
              id="hero-title"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-white"
            >
              Evolua seu negócio para o{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E11D2E] to-[#FF7A45]">
                próximo nível.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={220} className="max-w-2xl mt-6">
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">{HERO.subtitle}</p>
          </Reveal>

          <Reveal delay={320} className="mt-9 flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-[#E11D2E] hover:bg-[#c11426] text-white font-bold px-8 py-6 text-base rounded-xl shadow-xl shadow-[#E11D2E]/30 hover:scale-[1.02] transition-all border-0"
            >
              <a href="#contato">
                Começar Agora <ArrowRight className="h-5 w-5 ml-1" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5 hover:text-white px-8 py-6 text-base rounded-xl"
            >
              <a href="#metodologia">Conhecer Metodologia</a>
            </Button>
          </Reveal>
        </div>

        {/* Stats strip */}
        <div className="relative border-t border-white/[0.08] bg-[#0A0D14]/80 backdrop-blur-sm">
          <dl className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 py-12">
            {STATS.map((stat, i) => (
              <Reveal
                key={stat.label}
                delay={i * 100}
                className="text-center lg:text-left lg:border-l lg:border-white/[0.08] lg:pl-8 first:border-l-0 first:pl-0"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </dd>
                <dd className="mt-2 text-sm text-slate-400 leading-snug max-w-[16rem] mx-auto lg:mx-0">
                  {stat.label}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* ============ PILARES ============ */}
      <section id="pilares" className="relative py-20 md:py-28" aria-labelledby="pilares-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#FF5A6B]">
              Mentoria Empresarial
            </span>
            <h2
              id="pilares-title"
              className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold text-white"
            >
              Pilares de Atuação
            </h2>
            <p className="mt-5 text-slate-400 leading-relaxed">{PILARES_INTRO}</p>
          </Reveal>

          <div className="mt-16 space-y-16 md:space-y-24">
            {PILARES.map((pilar, idx) => {
              const Icon = PILAR_ICONS[idx]
              const detail = PILAR_DETAILS[idx]
              const flip = idx % 2 === 1
              return (
                <Reveal key={pilar.number}>
                  <article className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
                    <div className={`${flip ? 'lg:order-2' : ''} relative`}>
                      <div
                        className="absolute -top-6 -left-2 z-10 text-7xl md:text-8xl font-extrabold text-white/[0.07] select-none"
                        aria-hidden="true"
                      >
                        {pilar.number}
                      </div>
                      <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/50">
                        <img
                          src={pilar.image}
                          alt={pilar.kicker}
                          width={1200}
                          height={700}
                          loading="lazy"
                          className="w-full aspect-[16/10] object-cover hover:scale-105 transition-transform duration-700 motion-reduce:transition-none"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#07090F]/70 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-[#07090F]/80 backdrop-blur px-3 py-1.5 text-xs font-semibold text-slate-200 border border-white/10">
                          <Icon className="h-4 w-4 text-[#E11D2E]" aria-hidden="true" />
                          {detail.duration ? (
                            <>
                              <Timer className="h-3.5 w-3.5" aria-hidden="true" /> {detail.duration}{' '}
                              — {detail.label}
                            </>
                          ) : (
                            detail.label
                          )}
                        </div>
                      </div>
                    </div>

                    <div className={flip ? 'lg:order-1' : ''}>
                      <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF5A6B]">
                        {pilar.number} · {pilar.kicker}
                      </span>
                      <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold text-white">
                        {pilar.title}
                      </h3>
                      {pilar.quote && (
                        <p className="mt-4 text-lg font-semibold text-[#FF5A6B] border-l-4 border-[#E11D2E] pl-4">
                          {pilar.quote}
                        </p>
                      )}
                      <p className="mt-4 text-slate-300 leading-relaxed">{pilar.description}</p>
                      {pilar.tags.length > 0 && (
                        <ul className="mt-6 flex flex-wrap gap-2.5" aria-label="Áreas do programa">
                          {pilar.tags.map((tag) => (
                            <li
                              key={tag}
                              className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-slate-200"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>

          <Reveal className="mt-16 text-center">
            <Button
              asChild
              size="lg"
              className="bg-[#E11D2E] hover:bg-[#c11426] text-white font-bold px-8 py-6 text-base rounded-xl shadow-xl shadow-[#E11D2E]/25 border-0"
            >
              <a href="#contato">
                Agendar Diagnóstico <ArrowRight className="h-5 w-5 ml-1" />
              </a>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ============ METODOLOGIA ============ */}
      <section
        id="metodologia"
        className="relative py-20 md:py-28 bg-[#0A0D14] border-y border-white/[0.06]"
        aria-labelledby="metodologia-title"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto">
            <h2
              id="metodologia-title"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white"
            >
              {METODOLOGIA.title}
            </h2>
            <p className="mt-5 text-slate-400 leading-relaxed">{METODOLOGIA.subtitle}</p>
          </Reveal>

          <div className="mt-14 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/50">
              <img
                src={METODOLOGIA.image}
                alt="Metodologia Dealer Evolution"
                width={1200}
                height={800}
                loading="lazy"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E11D2E]/20 via-transparent to-transparent" />
            </Reveal>

            <ol className="relative space-y-8 border-l border-white/[0.1] pl-8">
              {METODOLOGIA.steps.map((step, i) => {
                const Icon = STEP_ICONS[i]
                return (
                  <Reveal as="li" key={step.number} delay={i * 90} className="relative">
                    <span
                      className="absolute -left-[3.35rem] top-0 flex h-11 w-11 items-center justify-center rounded-full bg-[#0A0D14] border border-[#E11D2E]/40 text-[#E11D2E]"
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="text-xs font-bold tracking-[0.25em] text-[#FF5A6B]">
                      {step.number}
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-white">{step.title}</h3>
                    <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </Reveal>
                )
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* ============ FUNDADOR ============ */}
      <section id="fundador" className="py-20 md:py-28" aria-labelledby="fundador-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            <Reveal className="lg:col-span-2">
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/50">
                <img
                  src={FUNDADOR.photo}
                  alt={`Foto de ${FUNDADOR.name}`}
                  width={512}
                  height={512}
                  loading="lazy"
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#07090F] to-transparent p-5 pt-16">
                  <p className="text-lg font-bold text-white">{FUNDADOR.name}</p>
                  <p className="text-xs text-slate-300">{FUNDADOR.role}</p>
                </div>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Áreas de expertise">
                {FUNDADOR.expertise.map((area) => (
                  <li
                    key={area}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-slate-300"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={150} className="lg:col-span-3">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#FF5A6B]">
                Sobre o Fundador
              </span>
              <h2
                id="fundador-title"
                className="mt-3 text-3xl sm:text-4xl font-extrabold text-white"
              >
                {FUNDADOR.name}
              </h2>
              <p className="mt-1.5 text-sm font-semibold text-slate-300">{FUNDADOR.role}</p>
              <div className="mt-6 space-y-4 text-slate-300 leading-relaxed">
                {FUNDADOR.bio.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
              <blockquote className="mt-8 rounded-2xl border border-[#E11D2E]/25 bg-[#E11D2E]/[0.06] p-6">
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic">
                  "{FUNDADOR.commitment}"
                </p>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ CTA / CONTATO ============ */}
      <section
        id="contato"
        className="relative py-20 md:py-28 bg-[#0A0D14] border-t border-white/[0.06] overflow-hidden"
        aria-labelledby="contato-title"
      >
        <div
          className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-[#E11D2E]/15 blur-[120px]"
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto">
            <h2
              id="contato-title"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white"
            >
              {CTA_FINAL.title}
            </h2>
            <p className="mt-5 text-slate-400 leading-relaxed">{CTA_FINAL.subtitle}</p>
          </Reveal>

          <div className="mt-14 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Contact channels */}
            <Reveal>
              <h3 className="text-lg font-bold text-white">{CTA_FINAL.contactTitle}</h3>
              <ul className="mt-6 space-y-5">
                <li className="flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E11D2E]/15 text-[#E11D2E]">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                      E-mail
                    </p>
                    <a
                      href={`mailto:${BRAND.email}`}
                      className="text-white font-medium hover:text-[#FF5A6B] transition-colors"
                    >
                      {BRAND.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#25D366]">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                      Telefone / WhatsApp
                    </p>
                    <a
                      href={BRAND.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-medium hover:text-[#25D366] transition-colors"
                    >
                      {BRAND.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E11D2E]/15 text-[#E11D2E]">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                      Endereço
                    </p>
                    <p className="text-white font-medium">Jundiaí — São Paulo, Brasil</p>
                  </div>
                </li>
              </ul>
              <Button
                asChild
                size="lg"
                className="mt-7 w-full sm:w-auto bg-[#25D366] hover:bg-[#1FB857] text-[#06130A] font-bold px-8 py-6 text-base rounded-xl shadow-xl shadow-[#25D366]/20 border-0"
              >
                <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 mr-2" /> Falar no WhatsApp
                </a>
              </Button>
            </Reveal>

            {/* Diagnostic form */}
            <Reveal delay={150}>
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-white/[0.08] bg-[#0C1018] p-6 sm:p-8 space-y-5 shadow-2xl shadow-black/40"
                aria-label="Formulário de agendamento de diagnóstico"
              >
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-slate-200 text-sm font-medium">
                    Nome Completo
                  </Label>
                  <Input
                    id="nome"
                    name="nome"
                    autoComplete="name"
                    required
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    className="bg-white/[0.05] border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-[#E11D2E]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-200 text-sm font-medium">
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="bg-white/[0.05] border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-[#E11D2E]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone" className="text-slate-200 text-sm font-medium">
                    Telefone <span className="text-[#E11D2E]">*</span>
                  </Label>
                  <Input
                    id="telefone"
                    name="telefone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    value={form.telefone}
                    onChange={(e) => setForm({ ...form, telefone: formatPhoneBR(e.target.value) })}
                    className="bg-white/[0.05] border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-[#E11D2E]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="desafio" className="text-slate-200 text-sm font-medium">
                    Desafio Atual
                  </Label>
                  <Textarea
                    id="desafio"
                    name="desafio"
                    rows={4}
                    value={form.desafio}
                    onChange={(e) => setForm({ ...form, desafio: e.target.value })}
                    placeholder="Conte brevemente o momento do seu negócio..."
                    className="bg-white/[0.05] border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-[#E11D2E] resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={sent}
                  className="w-full bg-[#E11D2E] hover:bg-[#c11426] text-white font-bold py-6 text-base rounded-xl shadow-xl shadow-[#E11D2E]/25 border-0"
                >
                  Agendar Diagnóstico <ArrowRight className="h-5 w-5 ml-1" />
                </Button>
                <p className="text-[11px] text-slate-500 text-center">
                  Ao enviar, você concorda com nossa{' '}
                  <a href="/privacidade" className="underline hover:text-slate-300">
                    Política de Privacidade
                  </a>
                  .
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
