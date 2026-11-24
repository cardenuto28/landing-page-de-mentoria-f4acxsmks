import { QUEM_CONDUZ } from '@/lib/site-content'
import fotoRicardo from '@/assets/retrato-elegante-no-lounge-bmw-fa119.png'

export default function QuemConduz() {
  return (
    <section className="bg-[#0B0B0B] py-24">
      <div className="mx-auto grid max-w-[1160px] items-center gap-14 px-5 md:grid-cols-[1fr_1.2fr]">
        {/* Coluna esquerda — foto do fundador (retrato vertical, proporção natural) */}
        <figure className="relative mx-auto w-full max-w-[480px] overflow-hidden rounded-2xl md:mx-0">
          <img
            src={fotoRicardo}
            alt={QUEM_CONDUZ.photoCaption1}
            loading="lazy"
            width={1024}
            height={1536}
            className="h-auto w-full"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-5 pb-5 pt-16 text-sm">
            <p className="font-semibold text-white">{QUEM_CONDUZ.photoCaption1}</p>
            <p className="text-[#BDBDBD]">{QUEM_CONDUZ.photoCaption2}</p>
          </figcaption>
        </figure>

        {/* Coluna direita */}
        <div>
          <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-[#BDBDBD]">
            {QUEM_CONDUZ.eyebrow}
          </p>
          <h2 className="mb-6 text-3xl font-bold leading-snug text-white sm:text-4xl">
            {QUEM_CONDUZ.title.before}
            <em className="text-[#ED7620]">{QUEM_CONDUZ.title.em}</em>
          </h2>
          <p className="mb-8 text-lg text-[#BDBDBD]">{QUEM_CONDUZ.intro}</p>

          <div className="divide-y divide-[#262626] border-y border-[#262626]">
            {QUEM_CONDUZ.linhas.map((linha) => (
              <div key={linha} className="flex items-start gap-3 py-4">
                <span aria-hidden="true" className="text-lg font-bold text-[#F5AC42]">
                  ✓
                </span>
                <p className="text-[17px] text-white">{linha}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a href="#diagnostico" className="btn-primary">
              {QUEM_CONDUZ.cta} <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
