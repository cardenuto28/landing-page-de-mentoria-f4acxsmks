import { FUTURO } from '@/lib/site-content'

export default function Futuro() {
  return (
    <section className="bg-[#0B0B0B] py-24">
      <div className="mx-auto max-w-[860px] px-5 text-center">
        <p className="mb-6 text-2xl font-bold leading-snug text-white sm:text-3xl">
          {FUTURO.texto.before}
          <em className="text-[#ED7620]">{FUTURO.texto.em}</em>
        </p>
        <p className="mb-10 text-lg text-[#BDBDBD]">{FUTURO.complemento}</p>
        <a href="#diagnostico" className="btn-primary">
          {FUTURO.cta} <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  )
}
