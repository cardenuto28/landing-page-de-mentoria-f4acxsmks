import { ALERTA_COMERCIAL } from '@/lib/site-content'

export default function AlertaComercial() {
  return (
    <section className="bg-[#0B0B0B] py-24">
      <div className="mx-auto max-w-[860px] px-5 text-center">
        <h2 className="mb-6 text-3xl font-bold leading-snug text-[#F5AC42] sm:text-4xl">
          {ALERTA_COMERCIAL.title}
        </h2>
        <p className="mb-6 text-xl font-bold text-white">
          {ALERTA_COMERCIAL.texto.before}
          <em className="text-[#ED7620]">{ALERTA_COMERCIAL.texto.em}</em>
        </p>
        <p className="text-lg text-[#BDBDBD]">{ALERTA_COMERCIAL.complemento}</p>
      </div>
    </section>
  )
}
