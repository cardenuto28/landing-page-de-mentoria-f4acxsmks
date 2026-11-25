import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FORM } from '@/lib/site-content'
import { formatPhoneBR } from '@/lib/masks'
import { useContatos } from '@/hooks/use-contatos'
import { criarEnvio } from '@/services/submissions'

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

// ETAPA 2: dados de contato do visitante (gravados em form_submissions: nome, email, telefone).
// ETAPAS 3–4: perguntas PENDENTES de definição do proprietário — estrutura pronta, sem conteúdo inventado.
const STEPS: Field[][] = [
  FORM.camposEtapa1.map((f) => ({
    id: f.id,
    pergunta: f.pergunta,
    type: 'select' as const,
    options: f.opcoes.map((o) => ({ value: o, label: o })),
  })),
  [
    { id: 'nome', pergunta: FORM.contatoEtapa2.perguntaNome, type: 'text' as const },
    { id: 'email', pergunta: FORM.contatoEtapa2.perguntaEmail, type: 'email' as const },
    { id: 'telefone', pergunta: FORM.contatoEtapa2.perguntaTelefone, type: 'tel' as const },
  ],
  [],
  [],
]

const ALL_FIELDS = STEPS.flat()
const CONTATO = FORM.contatoEtapa2
const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function FormMultiStep() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<Answers>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [enviando, setEnviando] = useState(false)
  const [erroEnvio, setErroEnvio] = useState('')
  const topRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const contatos = useContatos()

  const fields = STEPS[step - 1]
  const allAnswered = ALL_FIELDS.every((f) => (answers[f.id] ?? '').trim() !== '')
  const contatoValido =
    answers.nome?.trim() !== '' &&
    RE_EMAIL.test((answers.email ?? '').trim()) &&
    formatPhoneBR(answers.telefone ?? '').replace(/\D/g, '').length === 11
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
      if (f.type === 'text') {
        if ((answers[f.id] ?? '').trim() === '') nextErrors[f.id] = CONTATO.erroNome
      } else if (f.type === 'email') {
        if (!RE_EMAIL.test((answers[f.id] ?? '').trim())) nextErrors[f.id] = CONTATO.erroEmail
      } else if (f.type === 'tel') {
        const digitos = (answers[f.id] ?? '').replace(/\D/g, '')
        const dddValido =
          /^(1[1-9]|2[12478]|3[1234578]|4[1-9]|5[1345]|6[1-9]|7[13457]|8[1-9]|9[1-9])/
        if (digitos.length !== 11 || !dddValido.test(digitos))
          nextErrors[f.id] = CONTATO.erroTelefone
      } else if ((answers[f.id] ?? '').trim() === '') {
        nextErrors[f.id] = 'Selecione uma opção.'
      }
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleContinuar() {
    if (!validateCurrent()) return
    setStep((s) => Math.min(TOTAL, s + 1))
  }

  async function handleEnviar() {
    if (enviando || !allAnswered) return
    setEnviando(true)
    setErroEnvio('')
    try {
      const respostas: Answers = {}
      for (const f of ALL_FIELDS) respostas[f.id] = (answers[f.id] ?? '').trim()
      await criarEnvio({
        nome: (answers.nome ?? '').trim(),
        email: (answers.email ?? '').trim(),
        telefone: formatPhoneBR(answers.telefone ?? ''),
        respostas,
      })
      navigate('/obrigado')
    } catch {
      setErroEnvio('Não foi possível enviar sua solicitação agora. Tente novamente em instantes.')
      setEnviando(false)
    }
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
              {f.type === 'select' ? (
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
              ) : (
                <input
                  id={`field-${f.id}`}
                  type={f.type}
                  value={
                    f.type === 'tel' ? formatPhoneBR(answers[f.id] ?? '') : (answers[f.id] ?? '')
                  }
                  onChange={(e) =>
                    setValue(
                      f.id,
                      f.type === 'tel' ? formatPhoneBR(e.target.value) : e.target.value,
                    )
                  }
                  placeholder={
                    f.type === 'tel'
                      ? CONTATO.placeholderTelefone
                      : f.type === 'email'
                        ? CONTATO.placeholderEmail
                        : CONTATO.placeholderNome
                  }
                  autoComplete={
                    f.type === 'tel' ? 'tel-national' : f.type === 'email' ? 'email' : 'name'
                  }
                  inputMode={f.type === 'tel' ? 'tel' : undefined}
                  aria-invalid={!!errors[f.id]}
                  aria-describedby={errors[f.id] ? `error-${f.id}` : undefined}
                  className="w-full rounded-[10px] border px-4 py-3.5 text-base outline-none transition-colors focus-visible:ring-2"
                  style={{
                    background: 'var(--grafite)',
                    borderColor: errors[f.id] ? 'var(--laranja)' : 'var(--cinza-3)',
                    color: (answers[f.id] ?? '') === '' ? 'var(--cinza-1)' : 'var(--branco)',
                  }}
                />
              )}
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
          onClick={handleEnviar}
          className="cta-base"
          disabled={!allAnswered || enviando}
        >
          {enviando ? 'Enviando…' : FORM.enviar} <span aria-hidden="true">→</span>
        </button>
      </div>
      {erroEnvio && (
        <p role="alert" className="mt-4 text-sm" style={{ color: 'var(--laranja)' }}>
          {erroEnvio}
        </p>
      )}
      {!allAnswered && (
        <p className="mt-3 text-sm" style={{ color: 'var(--cinza-1)' }}>
          Responda todos os campos para habilitar o envio.
        </p>
      )}
      <p className="mt-6 text-sm" style={{ color: 'var(--cinza-1)' }}>
        Suporte a telefone: {formatPhoneBR(contatos.telefone)}
      </p>
    </div>
  )
}
