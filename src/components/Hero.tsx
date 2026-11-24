import { HERO } from '@/lib/site-content'
import fotoPendente from '@/assets/foto-pendente-placeholder.svg'

export default function Hero() {
  return (
    <section id="hero" className="bg-[#0B0B0B] py-24">
      <div className="mx-auto grid max-w-[1160px] items-center gap-14 px-5 md:grid-cols-[1.2fr_1fr]">
        {/* Coluna de texto */}
        <div>
          <p className="mb-6 inline-block border border-[#F5AC42] px-4 py-2 text-xs font-semibold tracking-[0.18em] text-[#F5AC42]">
            {HERO.eyebrow}
          </p>
          <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-[68px]">
            {HERO.title.before}
            <em className="text-[#ED7620]">{HERO.title.em}</em>
          </h1>
          <p className="mb-10 text-lg text-[#BDBDBD] sm:text-xl">{HERO.subtitle}</p>
          <a href="#diagnostico" className="btn-primary">
            {HERO.cta} <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Coluna da foto (retrato 4:5, 480×600) */}
        <figure className="relative mx-auto w-full max-w-[480px] overflow-hidden rounded-2xl md:mx-0">
          <img
            src="/visual-edits/fotos-rick2-ede6bf0a.jpg"
            alt={HERO.photoAlt}
            loading="eager"
            width={480}
            height={600}
            className="h-auto w-full"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 text-sm">
            <p className="font-semibold text-white">{HERO.photoCaption1}</p>
            <p className="text-[#BDBDBD]">{HERO.photoCaption2}</p>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
