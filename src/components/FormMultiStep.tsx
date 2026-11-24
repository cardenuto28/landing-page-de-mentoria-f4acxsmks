import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FORM } from '@/lib/site-content'
import { formatPhoneBR } from '@/lib/masks'

type Option = { value: string; label: string }
type Field = {
  id: string
  pergunta: string
  type: 'select' | 'tel' | 'email' | 'text'
  options?: Option[]
  required?: boolean
}
type Answers = Record<string, string>

const TOTAL = 4

// ETAPAS 2–4: perguntas PENDENTES de definição do proprietário — estrutura pronta, sem conteúdo inventado.
const STEPS: Field[][] = [
  FORM.camposEtapa1.map((f) => ({
    id: f.id,
    pergunta: f.pergunta,
    type: 'select' as const,
    options: f.opcoes.map((o) => ({ value: o, label: o })),
  })),
  [],
  [],
  [],
]

const ALL_FIELDS = STEPS.flat()

export default function FormMultiStep() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<Answers>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const topRef = useRef<HTMLDivElement>(null)

  const fields = STEPS[step - 1]
  const allAnswered = ALL_FIELDS.every((f) => (answers[f.id] ?? '').trim() !== '')
  const progress = Math.round((step / TOTAL) * 100)

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [step])

  function setValue(id: string, v: string) {
    setAnswers((prev) => ({ ...prev, [id]: v }))
    setErrors((prev) => ({ ...prev, [id]: '' }))
  }

  function validateCurrent(): boolean {
    const nextErrors: Record<string, string> = {}
    for (const f of fields) {
      if ((answers[f.id] ?? '').trim() === '') nextErrors[f.id] = 'Selecione uma opção.'
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleContinuar() {
    if (!validateCurrent()) return
    setStep((s) => Math.min(TOTAL, s + 1))
  }

  return (
    <div ref={topRef} className="scroll-mt-24">
      {/* Barra de progresso */}
      <div className="mb-10">
        <p
          className="mb-3 font-semibold tracking-[0.18em] text-xs"
          style={{ color: 'var(--bege)' }}
        >
          {FORM.etapa.replace('{n}', String(step)).replace('{total}', String(TOTAL))}
        </p>
        <div
          className="h-1.5 w-full overflow-hidden rounded-full"
          style={{ background: 'var(--cinza-3)' }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Etapa ${step} de ${TOTAL}`}
        >
          <div
            className="h-full rounded-full transition-all duration-500 motion-reduce:transition-none"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, var(--dourado) 0%, var(--laranja) 100%)',
            }}
          />
        </div>
      </div>

      {/* Campos da etapa atual */}
      {fields.length === 0 ? (
        <p className="mb-8 text-lg" style={{ color: 'var(--cinza-2)' }}>
          Etapa {step} em preparação.
        </p>
      ) : (
        <div className="space-y-6">
          {fields.map((f) => (
            <div key={f.id}>
              <label
                htmlFor={`field-${f.id}`}
                className="mb-2 block font-semibold text-lg"
                style={{ color: 'var(--branco)' }}
              >
                {f.pergunta}
              </label>
              <div className="relative">
                <select
                  id={`field-${f.id}`}
                  value={answers[f.id] ?? ''}
                  onChange={(e) => setValue(f.id, e.target.value)}
                  autoComplete="off"
                  aria-invalid={!!errors[f.id]}
                  aria-describedby={errors[f.id] ? `error-${f.id}` : undefined}
                  className="w-full appearance-none rounded-[10px] border px-4 py-3.5 pr-10 text-base outline-none transition-colors focus-visible:ring-2"
                  style={{
                    background: 'var(--grafite)',
                    borderColor: errors[f.id] ? 'var(--laranja)' : 'var(--cinza-3)',
                    color: (answers[f.id] ?? '') === '' ? 'var(--cinza-1)' : 'var(--branco)',
                  }}
                >
                  <option value="">{FORM.placeholderSelect}</option>
                  {f.options?.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3.5 top-1/2 h-5 w-5 -translate-y-1/2"
                  style={{ color: 'var(--cinza-1)' }}
                />
              </div>
              {errors[f.id] && (
                <p
                  id={`error-${f.id}`}
                  className="mt-1.5 text-sm"
                  style={{ color: 'var(--laranja)' }}
                >
                  {errors[f.id]}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Botões */}
      <div
        className={cn('mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between')}
      >
        <button
          type="button"
          onClick={handleContinuar}
          className={cn('cta-base', step === TOTAL && 'invisible')}
          disabled={step === TOTAL}
        >
          {FORM.continuar} <span aria-hidden="true">→</span>
        </button>
        <button
          type="button"
          onClick={handleContinuar}
          className="cta-base"
          disabled={!allAnswered}
        >
          {FORM.enviar} <span aria-hidden="true">→</span>
        </button>
      </div>
      {!allAnswered && (
        <p className="mt-3 text-sm" style={{ color: 'var(--cinza-1)' }}>
          Responda todos os campos para habilitar o envio.
        </p>
      )}
      <p className="mt-6 text-sm" style={{ color: 'var(--cinza-1)' }}>
        Suporte a telefone: {formatPhoneBR('11999998888')} · Nenhum dado é enviado neste ambiente.
      </p>
    </div>
  )
}
