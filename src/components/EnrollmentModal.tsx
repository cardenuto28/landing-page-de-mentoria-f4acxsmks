import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, ShieldCheck, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { formatPhoneBR } from '@/lib/masks'

const enrollmentSchema = z.object({
  name: z.string().min(3, 'Informe seu nome completo'),
  email: z.string().email('Informe um e-mail válido (ex: seu.nome@email.com)'),
  phone: z
    .string()
    .min(14, 'Informe o DDD e telefone completo no formato (00) 00000-0000')
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Telefone incompleto ou inválido'),
  plan: z.string().min(1, 'Selecione um plano'),
})

type EnrollmentFormValues = z.infer<typeof enrollmentSchema>

interface EnrollmentModalProps {
  isOpen: boolean
  onClose: () => void
  selectedPlan: string
}

export function EnrollmentModal({ isOpen, onClose, selectedPlan }: EnrollmentModalProps) {
  const navigate = useNavigate()
  const [hasSubmitError, setHasSubmitError] = useState(false)

  const form = useForm<EnrollmentFormValues>({
    resolver: zodResolver(enrollmentSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      plan: selectedPlan || 'Mentoria Completa',
    },
  })

  useEffect(() => {
    if (selectedPlan) {
      form.setValue('plan', selectedPlan)
    }
  }, [selectedPlan, form])

  const { isSubmitting } = form.formState

  const planDetails: Record<string, { price: string; badge: string; highlight: string }> = {
    'Turma Online': {
      price: '12x de R$ 197 ou R$ 1.980 à vista',
      badge: 'Autonomia & Conteúdo',
      highlight: 'Acesso imediato a todas as aulas gravadas e grupo de alunos.',
    },
    'Mentoria Completa': {
      price: '12x de R$ 497 ou R$ 4.970 à vista',
      badge: 'Mais Escolhido',
      highlight: 'Acompanhamento semanal ao vivo, plano de ação e grupo VIP.',
    },
    'Mentoria VIP 1:1': {
      price: '12x de R$ 997 ou R$ 9.970 à vista',
      badge: 'Exclusividade Total',
      highlight: '4 sessões individuais por mês diretamente com o mentor.',
    },
  }

  const currentPlanMeta = planDetails[form.watch('plan')] || planDetails['Mentoria Completa']

  async function onSubmit(values: EnrollmentFormValues) {
    setHasSubmitError(false)
    try {
      // Emulate API / backend lead capture call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Save recent registration in sessionStorage for the thank you page
      sessionStorage.setItem(
        'mentoria_enrollment',
        JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          plan: values.plan,
          timestamp: new Date().toISOString(),
        }),
      )
      onClose()
      navigate('/obrigado', { state: { plan: values.plan, name: values.name } })
    } catch {
      setHasSubmitError(true)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[520px] bg-[#0E1424] border border-[#E8A33D]/30 text-white shadow-2xl p-6 sm:p-8 rounded-2xl">
        <DialogHeader className="text-left space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E8A33D]/15 text-[#F6C56A] border border-[#E8A33D]/30 w-max">
            <Sparkles className="h-3.5 w-3.5 text-[#E8A33D]" />
            Inscrição com Condição Especial
          </div>
          <DialogTitle className="text-2xl font-bold text-white tracking-tight">
            Você está a um passo da sua transformação
          </DialogTitle>
          <DialogDescription className="text-slate-300 text-sm">
            Preencha seus dados para receber o link de pagamento seguro e o contato direto de
            integração.
          </DialogDescription>
        </DialogHeader>

        {/* Selected Plan Summary Card */}
        <div className="my-2 p-4 rounded-xl bg-[#131B2E] border border-white/[0.08] flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
              Plano Selecionado
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#E8A33D]/20 text-[#E8A33D] font-semibold">
              {currentPlanMeta.badge}
            </span>
          </div>
          <div className="text-lg font-bold text-white">{form.watch('plan')}</div>
          <div className="text-sm font-semibold text-[#F6C56A]">{currentPlanMeta.price}</div>
          <p className="text-xs text-slate-400 mt-1">{currentPlanMeta.highlight}</p>
        </div>

        {hasSubmitError && (
          <div
            role="alert"
            className="p-3 rounded-lg bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-center gap-2"
          >
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
            Ocorreu um erro ao processar sua inscrição. Por favor, tente novamente ou nos chame no
            WhatsApp.
          </div>
        )}

        <Form {...form}>
          <form
            noValidate
            onSubmit={(e) => {
              if (isSubmitting) {
                e.preventDefault()
                return
              }
              form.handleSubmit(onSubmit)(e)
            }}
            className="space-y-4 pt-1"
          >
            {/* Hidden / select plan field */}
            <FormField
              control={form.control}
              name="plan"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-medium text-slate-300">
                    Alterar Plano se desejar
                  </FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-3 gap-2">
                      {['Turma Online', 'Mentoria Completa', 'Mentoria VIP 1:1'].map((planName) => {
                        const isSelected = field.value === planName
                        return (
                          <button
                            type="button"
                            key={planName}
                            onClick={() => field.onChange(planName)}
                            className={`p-2 rounded-lg text-xs font-semibold text-center border transition-all ${
                              isSelected
                                ? 'bg-[#E8A33D]/20 border-[#E8A33D] text-white shadow-sm'
                                : 'bg-[#111827] border-white/[0.08] text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {planName}
                          </button>
                        )
                      })}
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-medium text-slate-200">
                    Nome completo{' '}
                    <span aria-hidden="true" className="text-[#FF6B4A]">
                      *
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Carlos Eduardo de Almeida"
                      autoComplete="name"
                      required
                      className="bg-[#111827] border-white/[0.1] text-white placeholder:text-slate-500 focus-visible:ring-[#E8A33D] text-sm h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-medium text-slate-200">
                    Seu melhor e-mail{' '}
                    <span aria-hidden="true" className="text-[#FF6B4A]">
                      *
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="seu.email@empresa.com.br"
                      autoComplete="email"
                      spellCheck={false}
                      required
                      className="bg-[#111827] border-white/[0.1] text-white placeholder:text-slate-500 focus-visible:ring-[#E8A33D] text-sm h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-medium text-slate-200">
                    WhatsApp com DDD{' '}
                    <span aria-hidden="true" className="text-[#FF6B4A]">
                      *
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="(11) 98765-4321"
                      autoComplete="tel-national"
                      required
                      className="bg-[#111827] border-white/[0.1] text-white placeholder:text-slate-500 focus-visible:ring-[#E8A33D] text-sm h-11"
                      value={field.value}
                      onChange={(e) => field.onChange(formatPhoneBR(e.target.value))}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

            {/* Submit button */}
            <div className="pt-2">
              <Button
                type="submit"
                aria-disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#E8A33D] via-[#F6C56A] to-[#FF6B4A] text-[#0A0E1A] font-bold text-base h-12 rounded-xl shadow-lg shadow-[#E8A33D]/25 hover:opacity-95 transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" aria-hidden="true" />
                    Processando sua vaga...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    Finalizar inscrição segura
                  </>
                )}
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
              <ShieldCheck className="h-4 w-4 text-[#34D399]" />
              <span>Seus dados estão protegidos com criptografia de 256 bits</span>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
