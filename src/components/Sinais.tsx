import { SINAIS } from '@/lib/site-content'

export default function Sinais() {
  return (
    <section className="bg-[#0B0B0B] py-24">
      <div className="mx-auto max-w-[1160px] px-5">
        <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-[#BDBDBD]">
          {SINAIS.eyebrow}
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SINAIS.cards.map((card) => (
            <div
              key={card.numero}
              className="rounded-[14px] border border-[#262626] bg-[#141414] p-7"
            >
              <div className="flex items-start gap-4">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                  style={{ background: '#202020', color: '#F5AC42' }}
                  aria-hidden="true"
                >
                  {card.numero}
                </span>
                <div>
                  <h3 className="mb-2 font-bold text-white">{card.titulo}</h3>
                  <p className="text-[17px] text-[#BDBDBD]">{card.descricao}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a href="#diagnostico" className="btn-primary">
            {SINAIS.cta} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
