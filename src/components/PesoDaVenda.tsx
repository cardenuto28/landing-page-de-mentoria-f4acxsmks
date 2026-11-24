import { PESO_DA_VENDA } from '@/lib/site-content'

export default function PesoDaVenda() {
  return (
    <section className="bg-[#0B0B0B] py-24">
      <div className="mx-auto grid max-w-[1160px] gap-14 px-5 md:grid-cols-2">
        {/* Coluna esquerda */}
        <div>
          <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-[#BDBDBD]">
            {PESO_DA_VENDA.eyebrow}
          </p>
          <h2 className="mb-6 text-3xl font-bold leading-snug text-white sm:text-4xl">
            {PESO_DA_VENDA.title.before}
            <em className="text-[#ED7620]">{PESO_DA_VENDA.title.em}</em>
          </h2>
          <p className="text-lg text-[#BDBDBD]">{PESO_DA_VENDA.texto}</p>
        </div>

        {/* Coluna direita — três linhas numeradas */}
        <div className="divide-y divide-[#262626]">
          {PESO_DA_VENDA.linhas.map((linha) => (
            <div key={linha.numero} className="flex items-start gap-4 py-6">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                style={{ background: '#202020', color: '#F5AC42' }}
                aria-hidden="true"
              >
                {linha.numero}
              </span>
              <p className="text-lg text-white">{linha.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
