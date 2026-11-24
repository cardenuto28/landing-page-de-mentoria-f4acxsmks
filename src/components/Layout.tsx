import { useState, useEffect, useRef } from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import {
  X,
  Menu,
  MessageCircle,
  ArrowRight,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { BRAND } from '@/lib/dealer-content'

const navLinks = [
  { name: 'Pilares', href: '#pilares' },
  { name: 'Metodologia', href: '#metodologia' },
  { name: 'Fundador', href: '#fundador' },
  { name: 'Contato', href: '#contato' },
]

export default function Layout() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const lastPath = useRef(pathname)

  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Handle route changes and scroll to top
  useEffect(() => {
    if (lastPath.current === pathname) return
    lastPath.current = pathname
    window.scrollTo({ top: 0, behavior: 'instant' })
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  // Track scroll position for header glass effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname !== '/') return
    if (href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        const headerOffset = 76
        const elementPosition = target.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
      }
      setMobileMenuOpen(false)
    }
  }

  // Brand mark: monogram over a red arrow evoking the "corrida" theme of the art board
  const BrandMark = ({ size = 'md' }: { size?: 'md' | 'sm' }) => (
    <div
      className={`${size === 'md' ? 'h-10 w-10' : 'h-8 w-8'} rounded-lg bg-gradient-to-br from-[#E11D2E] to-[#8B0F1C] flex items-center justify-center shadow-md shadow-[#E11D2E]/30 group-hover:scale-105 transition-transform`}
      aria-hidden="true"
    >
      <ArrowRight
        className={`${size === 'md' ? 'h-5 w-5' : 'h-4 w-4'} -rotate-45 text-white`}
        strokeWidth={3}
      />
    </div>
  )

  return (
    <div className="min-h-dvh flex flex-col bg-[#07090F] text-slate-100 selection:bg-[#E11D2E] selection:text-white">
      {/* Skip to content link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[#E11D2E] focus:text-white focus:px-4 focus:py-2 focus:font-semibold focus:ring-2 focus:ring-white"
      >
        Pular para o conteúdo principal
      </a>

      {/* Navigation Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#07090F]/85 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/40 py-3'
            : 'bg-transparent py-4 md:py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D2E] rounded-lg p-1"
            aria-label="Dealer Evolution - Página inicial"
          >
            <BrandMark />
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                DEALER <span className="text-[#E11D2E]">EVOLUTION</span>
              </span>
              <span className="text-[11px] uppercase tracking-widest text-slate-400 font-medium">
                Mentoria Empresarial
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
                className="text-sm font-medium text-slate-300 hover:text-[#E11D2E] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D2E] rounded-md px-1.5 py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              asChild
              className="bg-[#E11D2E] hover:bg-[#c11426] text-white font-semibold px-5 py-2 rounded-xl shadow-lg shadow-[#E11D2E]/25 transition-all hover:scale-[1.02] border-0"
            >
              <a href="#contato" onClick={(e) => handleNavClick(e, '#contato')}>
                Agendar Diagnóstico
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
                className="w-[85vw] max-w-sm bg-[#0C1018] border-l border-white/[0.08] p-6 text-white flex flex-col justify-between"
              >
                <div>
                  <SheetHeader className="text-left mb-6">
                    <SheetTitle className="text-white flex items-center gap-2">
                      <BrandMark size="sm" />
                      <span className="font-bold text-base">DEALER EVOLUTION</span>
                    </SheetTitle>
                  </SheetHeader>

                  <nav aria-label="Navegação móvel" className="flex flex-col gap-4 mt-6">
                    {navLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="text-lg font-medium text-slate-200 hover:text-[#E11D2E] py-2 border-b border-white/[0.05] transition-colors"
                      >
                        {link.name}
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="space-y-4 pt-6">
                  <Button
                    asChild
                    className="w-full bg-[#E11D2E] hover:bg-[#c11426] text-white font-bold py-6 text-base rounded-xl shadow-lg shadow-[#E11D2E]/20"
                  >
                    <a
                      href="#contato"
                      onClick={(e) => {
                        handleNavClick(e, '#contato')
                        setMobileMenuOpen(false)
                      }}
                    >
                      Agendar Diagnóstico
                    </a>
                  </Button>

                  <div className="flex items-center justify-center gap-5 pt-4 text-slate-400">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#E11D2E] transition-colors p-2"
                      aria-label="Instagram da Dealer Evolution (abre em nova aba)"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#E11D2E] transition-colors p-2"
                      aria-label="LinkedIn da Dealer Evolution (abre em nova aba)"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href={`mailto:${BRAND.email}`}
                      className="hover:text-[#E11D2E] transition-colors p-2"
                      aria-label="Enviar e-mail para a Dealer Evolution"
                    >
                      <Mail className="h-5 w-5" />
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
          href={BRAND.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp com a Dealer Evolution (abre em nova aba)"
          className="fixed right-5 bottom-6 z-40 flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 hover:scale-110 active:scale-95 transition-all duration-300"
        >
          <span className="sr-only">Falar pelo WhatsApp</span>
          <MessageCircle className="h-7 w-7" />
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping -z-10 motion-reduce:animate-none" />
        </a>
      </aside>

      {/* Global Footer */}
      <footer className="bg-[#04060A] border-t border-white/[0.07] pt-16 pb-12 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/[0.06]">
            {/* Brand column */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-2">
                <BrandMark size="sm" />
                <span className="font-bold text-white text-base">
                  DEALER <span className="text-[#E11D2E]">EVOLUTION</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Evoluímos empresas. Desenvolvemos líderes. Construímos resultados.
              </p>
              <div className="flex items-center gap-4 pt-1">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-[#E11D2E] transition-colors"
                  aria-label="Instagram (abre em nova aba)"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-[#E11D2E] transition-colors"
                  aria-label="LinkedIn (abre em nova aba)"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={BRAND.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-[#E11D2E] transition-colors"
                  aria-label="WhatsApp (abre em nova aba)"
                >
                  <MessageCircle className="h-4 w-4" />
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
                      className="hover:text-[#E11D2E] transition-colors"
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
                  <Link to="/termos" className="hover:text-[#E11D2E] transition-colors">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link to="/privacidade" className="hover:text-[#E11D2E] transition-colors">
                    Política de Privacidade
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support & Contact */}
            <div>
              <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
                Contato
              </h3>
              <a
                href={`mailto:${BRAND.email}`}
                className="text-xs text-slate-300 hover:text-[#E11D2E] transition-colors flex items-center gap-2 mb-2.5"
              >
                <Mail className="h-3.5 w-3.5 text-[#E11D2E]" aria-hidden="true" />
                {BRAND.email}
              </a>
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-300 hover:text-[#E11D2E] transition-colors flex items-center gap-2 mb-2.5"
              >
                <Phone className="h-3.5 w-3.5 text-[#E11D2E]" aria-hidden="true" />
                {BRAND.phone}
              </a>
              <span className="text-xs text-slate-400 flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#E11D2E] mt-0.5" aria-hidden="true" />
                Jundiaí — São Paulo, Brasil
              </span>
            </div>
          </div>

          {/* Compliance Disclaimer & Copyright */}
          <div className="pt-8 space-y-4 text-center md:text-left text-xs text-slate-500">
            <p className="leading-relaxed">
              <strong>Aviso legal importante:</strong> Os resultados podem variar de empresa para
              empresa e dependem da aplicação prática das estratégias trabalhadas em mentoria. Esta
              página não promete nem garante ganhos financeiros imediatos.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2 border-t border-white/[0.04]">
              <p>© {new Date().getFullYear()} Dealer Evolution. Todos os direitos reservados.</p>
              <p className="text-slate-500 text-[11px]">dealerevolution.com.br</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
