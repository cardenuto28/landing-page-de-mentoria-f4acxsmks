import { INDICADORES } from '@/lib/site-content'

export default function Indicadores() {
  return (
    <section className="border-y border-[#262626] bg-[#0B0B0B] py-14">
      <div className="mx-auto grid max-w-[1160px] gap-10 px-5 sm:grid-cols-2 lg:grid-cols-4">
        {INDICADORES.map((item) => (
          <div key={item.descricao} className="text-center">
            <p className="text-3xl font-bold text-[#ED7620]">{item.numero}</p>
            <p className="mt-2 text-[15px] text-[#BDBDBD]">{item.descricao}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
