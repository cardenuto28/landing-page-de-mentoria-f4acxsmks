import { DECISOES } from '@/lib/site-content'

export default function Decisoes() {
  return (
    <section className="bg-[#121212] py-24">
      <div className="mx-auto max-w-[1160px] px-5">
        <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-[#BDBDBD]">
          {DECISOES.eyebrow}
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {DECISOES.cards.map((card) => (
            <div
              key={card.numero}
              className="rounded-[14px] border border-[#262626] bg-[#141414] p-8"
            >
              <span
                className="mb-5 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
                style={{ background: '#202020', color: '#F5AC42' }}
                aria-hidden="true"
              >
                {card.numero}
              </span>
              <h3 className="mb-3 text-xl font-bold text-white">{card.titulo}</h3>
              <p className="text-[17px] text-[#BDBDBD]">{card.descricao}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a href="#diagnostico" className="btn-primary">
            {DECISOES.cta} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
