import { CONDUCAO } from '@/lib/site-content'

export default function Conducao() {
  return (
    <section className="bg-[#121212] py-24">
      <div className="mx-auto max-w-[1160px] px-5">
        <p className="mb-4 text-center text-xs font-semibold tracking-[0.18em] text-[#BDBDBD]">
          {CONDUCAO.eyebrow}
        </p>
        <h2 className="mx-auto mb-6 max-w-[860px] text-center text-3xl font-bold text-white sm:text-4xl">
          {CONDUCAO.title.before}
          <em className="text-[#ED7620]">{CONDUCAO.title.em}</em>
        </h2>
        <p className="mx-auto mb-12 max-w-[860px] text-center text-lg text-[#BDBDBD]">
          {CONDUCAO.texto}
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {CONDUCAO.cards.map((card) => (
            <div
              key={card.numero}
              className="rounded-[14px] border border-[#262626] bg-[#141414] p-7"
            >
              <span className="mb-4 block text-sm font-bold text-[#F5AC42]" aria-hidden="true">
                {card.numero}
              </span>
              <h3 className="mb-3 font-bold text-white">{card.titulo}</h3>
              <p className="text-[17px] text-[#BDBDBD]">{card.descricao}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a href="#diagnostico" className="btn-primary">
            {CONDUCAO.cta} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
