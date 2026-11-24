import { FORM } from '@/lib/site-content'
import FormMultiStep from '@/components/FormMultiStep'

export default function FormSection() {
  return (
    <section id="diagnostico" className="bg-[#0B0B0B] py-24">
      <div className="mx-auto max-w-[700px] px-5">
        <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-[#BDBDBD]">
          {FORM.eyebrow}
        </p>
        <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
          {FORM.title.before}
          <em className="text-[#ED7620]">{FORM.title.em}</em>
          {FORM.title.after}
        </h2>
        <p className="mb-12 text-lg text-[#BDBDBD]">{FORM.subtitle}</p>
        <FormMultiStep />
      </div>
    </section>
  )
}
