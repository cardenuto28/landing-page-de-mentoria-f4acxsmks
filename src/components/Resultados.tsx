import { RESULTADOS } from '@/lib/site-content'

export default function Resultados() {
  return (
    <section className="bg-[#0B0B0B] py-24">
      <div className="mx-auto max-w-[1160px] px-5">
        <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-[#BDBDBD]">
          {RESULTADOS.eyebrow}
        </p>
        <div className="mb-12 max-w-[760px]">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            {RESULTADOS.title.before}
            <em className="text-[#ED7620]">{RESULTADOS.title.em}</em>
          </h2>
          <p className="text-lg text-[#BDBDBD]">{RESULTADOS.complemento}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {RESULTADOS.cards.map((card) => (
            <div
              key={card.titulo}
              className="flex items-center justify-between gap-4 rounded-[14px] border border-[#262626] bg-[#141414] p-7"
            >
              <div>
                <h3 className="mb-1 font-bold text-white">{card.titulo}</h3>
                <p className="text-[17px] text-[#BDBDBD]">{card.descricao}</p>
              </div>
              <span aria-hidden="true" className="text-2xl font-bold text-[#F5AC42]">
                →
              </span>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <a href="#diagnostico" className="btn-primary">
            {RESULTADOS.cta} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
