import { useEffect, useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { FAQ } from '@/lib/site-content'

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === '#faq') {
        document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })
      }
    }
    window.addEventListener('hashchange', onHash)
    onHash()
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <section id="faq" className="bg-[#121212] py-24">
      <div className="mx-auto max-w-[760px] px-5">
        <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-[#BDBDBD]">FAQ</p>
        <h2 className="mb-10 text-3xl font-bold text-white sm:text-4xl">
          {FAQ.title.before}
          <em className="text-[#ED7620]">{FAQ.title.em}</em>
        </h2>

        <div className="divide-y divide-[#262626] border-y border-[#262626]">
          {FAQ.perguntas.map((pergunta, i) => {
            const open = openIndex === i
            return (
              <div key={pergunta}>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-semibold text-white">{pergunta}</span>
                  <span aria-hidden="true" className="text-2xl font-semibold text-[#F5AC42]">
                    {open ? <Minus /> : <Plus />}
                  </span>
                </button>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  hidden={!open}
                  className="pb-5 text-[17px] text-[#BDBDBD]"
                >
                  {FAQ.respostas[i]}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
