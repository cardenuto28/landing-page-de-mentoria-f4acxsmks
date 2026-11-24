import { useState, useEffect, useRef } from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import {
  X,
  Menu,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Instagram,
  Linkedin,
  Youtube,
  ShieldCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

export default function Layout() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const lastPath = useRef(pathname)

  const [announcementDismissed, setAnnouncementDismissed] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showMobileBottomBar, setShowMobileBottomBar] = useState(false)

  // Handle route changes and scroll to top
  useEffect(() => {
    if (lastPath.current === pathname) return
    lastPath.current = pathname
    window.scrollTo({ top: 0, behavior: 'instant' })
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  // Track scroll position for header glass effect and sticky mobile CTA
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 40)

      // Check if pricing section is in view to hide bottom mobile CTA
      const pricingEl = document.getElementById('investimento')
      let inPricing = false
      if (pricingEl) {
        const rect = pricingEl.getBoundingClientRect()
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          inPricing = true
        }
      }

      // Show mobile CTA after hero (e.g. scroll > 450) and hide when in pricing
      setShowMobileBottomBar(scrollY > 450 && !inPricing)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Sobre', href: '#sobre' },
    { name: 'Método', href: '#metodo' },
    { name: 'Resultados', href: '#resultados' },
    { name: 'Investimento', href: '#investimento' },
    { name: 'FAQ', href: '#faq' },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname !== '/') {
      return
    }
    if (href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        const headerOffset = 80
        const elementPosition = target.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }
      setMobileMenuOpen(false)
    }
  }

  const currentMonth = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(new Date())
  const capitalizedMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)

  return (
    <div className="min-h-dvh flex flex-col bg-[#0A0E1A] text-slate-100 selection:bg-[#E8A33D] selection:text-[#0A0E1A]">
      {/* Skip to content link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[#E8A33D] focus:text-[#0A0E1A] focus:px-4 focus:py-2 focus:font-semibold focus:ring-2 focus:ring-white"
      >
        Pular para o conteúdo principal
      </a>

      {/* Top Announcement Bar */}
      {!announcementDismissed && (
        <aside
          aria-label="Aviso de turmas abertas"
          className="relative z-50 bg-gradient-to-r from-[#1A130A] via-[#2D1B05] to-[#1A130A] border-b border-[#E8A33D]/30 px-4 py-2 text-center text-xs md:text-sm text-slate-200 transition-all duration-300"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 pr-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8A33D] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B4A]"></span>
            </span>
            <span>
              <strong className="text-[#F6C56A]">Últimas 4 vagas</strong> da turma de{' '}
              <span className="capitalize font-semibold text-white">{capitalizedMonth}</span> —
              inscrições encerram neste domingo!
            </span>
            <a
              href="#investimento"
              onClick={(e) => handleNavClick(e, '#investimento')}
              className="hidden sm:inline-flex items-center gap-1 font-medium text-[#E8A33D] hover:text-[#F6C56A] underline ml-2 transition-colors"
            >
              Garantir vaga <ArrowRight className="h-3 w-3" />
            </a>
          </div>
          <button
            type="button"
            onClick={() => setAnnouncementDismissed(true)}
            aria-label="Fechar aviso"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-white/10 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </aside>
      )}

      {/* Navigation Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0E1A]/85 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/40 py-3'
            : 'bg-transparent py-4 md:py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33D] rounded-lg p-1"
            aria-label="Mentoria Ricardo Silveira - Página inicial"
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#E8A33D] to-[#FF6B4A] flex items-center justify-center text-[#0A0E1A] font-bold text-lg shadow-md shadow-[#E8A33D]/20 group-hover:scale-105 transition-transform">
              <Sparkles className="h-5 w-5 text-[#0A0E1A]" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white flex items-center gap-1">
                Mentoria <span className="text-[#E8A33D]">Ricardo Silveira</span>
              </span>
              <span className="text-[11px] uppercase tracking-widest text-slate-400 font-medium">
                Alta Performance & Negócios
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Navegação principal" className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-slate-300 hover:text-[#E8A33D] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33D] rounded-md px-1.5 py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              asChild
              className="bg-gradient-to-r from-[#E8A33D] to-[#FF6B4A] hover:opacity-95 text-[#0A0E1A] font-semibold px-5 py-2 rounded-xl shadow-lg shadow-[#E8A33D]/25 hover:shadow-[#E8A33D]/40 transition-all hover:scale-[1.02] border-0"
            >
              <a href="#investimento" onClick={(e) => handleNavClick(e, '#investimento')}>
                Garantir minha vaga
              </a>
            </Button>
          </div>

          {/* Mobile Hamburger Drawer */}
          <div className="flex md:hidden items-center gap-2">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-200 hover:text-white hover:bg-white/10"
                  aria-label="Abrir menu de navegação"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[85vw] max-w-sm bg-[#0E1424] border-l border-white/[0.08] p-6 text-white flex flex-col justify-between"
              >
                <div>
                  <SheetHeader className="text-left mb-6">
                    <SheetTitle className="text-white flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#E8A33D] to-[#FF6B4A] flex items-center justify-center text-[#0A0E1A]">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <span className="font-bold text-base">Mentoria Ricardo Silveira</span>
                    </SheetTitle>
                  </SheetHeader>

                  <nav aria-label="Navegação móvel" className="flex flex-col gap-4 mt-6">
                    {navLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="text-lg font-medium text-slate-200 hover:text-[#E8A33D] py-2 border-b border-white/[0.05] transition-colors"
                      >
                        {link.name}
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="space-y-4 pt-6">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-[#E8A33D] to-[#FF6B4A] text-[#0A0E1A] font-bold py-6 text-base rounded-xl shadow-lg shadow-[#E8A33D]/20"
                  >
                    <a
                      href="#investimento"
                      onClick={(e) => {
                        handleNavClick(e, '#investimento')
                        setMobileMenuOpen(false)
                      }}
                    >
                      Garantir minha vaga
                    </a>
                  </Button>

                  <div className="flex items-center justify-center gap-5 pt-4 text-slate-400">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#E8A33D] transition-colors p-2"
                      aria-label="Instagram de Ricardo Silveira (abre em nova aba)"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#E8A33D] transition-colors p-2"
                      aria-label="YouTube de Ricardo Silveira (abre em nova aba)"
                    >
                      <Youtube className="h-5 w-5" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#E8A33D] transition-colors p-2"
                      aria-label="LinkedIn de Ricardo Silveira (abre em nova aba)"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Outlet for Pages */}
      <main id="main" ref={mainRef} tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>

      {/* Floating WhatsApp Action Button */}
      <aside aria-label="Atendimento via WhatsApp">
        <a
          href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Quero%20saber%20mais%20sobre%20a%20mentoria."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Tirar dúvidas no WhatsApp (abre em nova aba)"
          className={`fixed right-5 z-40 flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 hover:scale-110 active:scale-95 transition-all duration-300 ${
            showMobileBottomBar ? 'bottom-20 md:bottom-6' : 'bottom-6'
          }`}
        >
          <span className="sr-only">Falar pelo WhatsApp</span>
          <MessageCircle className="h-7 w-7" />
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping -z-10" />
        </a>
      </aside>

      {/* Sticky Mobile CTA Bar */}
      {showMobileBottomBar && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0E1A]/95 backdrop-blur-lg border-t border-white/[0.1] px-4 py-3 flex items-center justify-between gap-3 shadow-2xl animate-slide-up">
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#FF6B4A] flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B4A] animate-pulse" /> Vagas
              limitadas
            </span>
            <span className="text-xs text-slate-300 font-medium">Turma fecha em breve</span>
          </div>
          <Button
            asChild
            size="sm"
            className="bg-gradient-to-r from-[#E8A33D] to-[#FF6B4A] text-[#0A0E1A] font-bold px-4 py-2 rounded-lg text-xs"
          >
            <a href="#investimento" onClick={(e) => handleNavClick(e, '#investimento')}>
              Quero minha vaga
            </a>
          </Button>
        </div>
      )}

      {/* Global Footer */}
      <footer className="bg-[#060911] border-t border-white/[0.07] pt-16 pb-12 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/[0.06]">
            {/* Brand column */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#E8A33D] to-[#FF6B4A] flex items-center justify-center text-[#0A0E1A] font-bold">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="font-bold text-white text-base">Mentoria Ricardo Silveira</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Aceleração estratégica de carreira e negócios. Mais de 500 profissionais conduzidos
                com clareza, método e resultados concretos.
              </p>
              <div className="flex items-center gap-4 pt-1">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-[#E8A33D] transition-colors"
                  aria-label="Instagram (abre em nova aba)"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-[#E8A33D] transition-colors"
                  aria-label="YouTube (abre em nova aba)"
                >
                  <Youtube className="h-4 w-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-[#E8A33D] transition-colors"
                  aria-label="LinkedIn (abre em nova aba)"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Navigation links */}
            <div>
              <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
                Navegação
              </h3>
              <ul className="space-y-2.5 text-xs">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="hover:text-[#E8A33D] transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
                Legal & Conformidade
              </h3>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <Link to="/termos" className="hover:text-[#E8A33D] transition-colors">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link to="/privacidade" className="hover:text-[#E8A33D] transition-colors">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <span className="flex items-center gap-1 text-slate-400">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#34D399]" /> Garantia de 7 dias
                  </span>
                </li>
              </ul>
            </div>

            {/* Support & Contact */}
            <div>
              <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
                Suporte & Contato
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Dúvidas sobre o formato ou matrículas empresariais? Fale diretamente com a equipe.
              </p>
              <a
                href="mailto:contato@mentoriaricardosilveira.com.br"
                className="text-xs text-[#E8A33D] hover:underline block mb-2"
              >
                contato@mentoriaricardosilveira.com.br
              </a>
              <span className="text-[11px] text-slate-500 block">
                Atendimento de Segunda a Sexta, das 9h às 18h
              </span>
            </div>
          </div>

          {/* Compliance Disclaimer & Copyright */}
          <div className="pt-8 space-y-4 text-center md:text-left text-xs text-slate-500">
            <p className="leading-relaxed">
              <strong>Aviso legal importante:</strong> Os resultados podem variar de pessoa para
              pessoa e dependem exclusivamente da aplicação prática individual das estratégias
              ensinadas. Esta página e a mentoria não prometem nem garantem ganhos financeiros
              imediatos ou facilidades. Todos os estudos de caso apresentados representam históricos
              reais de mentorados aplicados.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2 border-t border-white/[0.04]">
              <p>
                © {new Date().getFullYear()} Mentoria Ricardo Silveira. Todos os direitos
                reservados. CNPJ 38.192.481/0001-92.
              </p>
              <p className="text-slate-500 text-[11px]">
                Desenvolvido com excelência estratégica para alta conversão.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
