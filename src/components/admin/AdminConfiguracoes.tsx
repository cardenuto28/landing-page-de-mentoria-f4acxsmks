import { useEffect, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CONTATOS_PADRAO, EMAIL_COPIA_PADRAO } from '@/lib/contatos'
import {
  getConfiguracoes,
  salvarConfiguracoes,
  testarWebhook,
  type WebhookTesteResult,
} from '@/services/configuracoes'

export default function AdminConfiguracoes() {
  const [id, setId] = useState<string | undefined>(undefined)
  const [whatsapp, setWhatsapp] = useState('')
  const [telefone, setTelefone] = useState('')
  const [emailDestino, setEmailDestino] = useState(CONTATOS_PADRAO.emailDestino)
  const [emailCopia, setEmailCopia] = useState(EMAIL_COPIA_PADRAO)
  const [webhookUrl, setWebhookUrl] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [testando, setTestando] = useState(false)
  const [resultadoTeste, setResultadoTeste] = useState<WebhookTesteResult | null>(null)
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  useEffect(() => {
    getConfiguracoes()
      .then((r) => {
        if (!r) return
        setId(r.id)
        setWhatsapp(r.whatsapp ?? '')
        setTelefone(r.telefone ?? '')
        setEmailDestino(r.email_destino ?? CONTATOS_PADRAO.emailDestino)
        setEmailCopia(r.email_copia || EMAIL_COPIA_PADRAO)
        setWebhookUrl(r.webhook_url ?? '')
      })
      .catch(() => setErro('Não foi possível carregar as configurações.'))
      .finally(() => setCarregando(false))
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMensagem('')
    setErro('')
    setSalvando(true)
    try {
      const r = await salvarConfiguracoes(
        {
          whatsapp: whatsapp.trim(),
          telefone: telefone.trim(),
          email_destino: emailDestino.trim(),
          email_copia: emailCopia.trim(),
          webhook_url: webhookUrl.trim(),
        },
        id,
      )
      setId(r.id)
      setMensagem('Configurações salvas. O site já usa os novos contatos.')
    } catch {
      setErro('Não foi possível salvar. Verifique os campos e tente novamente.')
    } finally {
      setSalvando(false)
    }
  }

  async function handleTestarWebhook() {
    setResultadoTeste(null)
    setTestando(true)
    try {
      setResultadoTeste(await testarWebhook())
    } catch {
      setResultadoTeste({
        ok: false,
        status: 0,
        mensagem: 'Não foi possível executar o teste. Verifique a conexão e tente novamente.',
      })
    } finally {
      setTestando(false)
    }
  }

  return (
    <section aria-labelledby="admin-config" className="max-w-xl space-y-4">
      <h2 id="admin-config" className="text-xl font-bold text-white">
        Configurações de contato
      </h2>
      {carregando ? (
        <p role="status" className="text-[#BDBDBD]">
          Carregando configurações…
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="cfg-whatsapp">Número de WhatsApp</Label>
            <Input
              id="cfg-whatsapp"
              type="tel"
              inputMode="tel"
              autoComplete="off"
              placeholder="5511999998888"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
            <p className="text-xs text-[#8A8A8A]">
              Somente dígitos, com DDI e DDD. Ex.: 5511999998888.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cfg-telefone">Telefone de contato</Label>
            <Input
              id="cfg-telefone"
              type="tel"
              inputMode="tel"
              autoComplete="off"
              placeholder="(11) 99999-8888"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cfg-email">E-mail de destino dos formulários</Label>
            <Input
              id="cfg-email"
              type="email"
              autoComplete="off"
              value={emailDestino}
              onChange={(e) => setEmailDestino(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cfg-email-copia">E-mail em cópia</Label>
            <Input
              id="cfg-email-copia"
              type="email"
              autoComplete="off"
              value={emailCopia}
              onChange={(e) => setEmailCopia(e.target.value)}
            />
            <p className="text-xs text-[#8A8A8A]">Recebe uma cópia de cada envio do formulário.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cfg-webhook">URL do Webhook</Label>
            <Input
              id="cfg-webhook"
              type="url"
              inputMode="url"
              autoComplete="off"
              placeholder="https://seu-crm.com/webhook"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
            />
            <p className="text-xs text-[#8A8A8A]">
              Os envios do formulário serão enviados para essa URL via POST. Deixe vazio para
              desligar.
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={handleTestarWebhook}
              disabled={testando}
            >
              {testando ? 'Testando…' : 'Testar webhook'}
            </Button>
            <p className="text-xs text-[#8A8A8A]">
              O teste usa a URL salva. Salve as configurações antes de testar uma URL nova.
            </p>
            {resultadoTeste && (
              <p
                role={resultadoTeste.ok ? 'status' : 'alert'}
                className={resultadoTeste.ok ? 'text-sm text-[#BDBDBD]' : 'text-sm text-[#ED7620]'}
              >
                {resultadoTeste.mensagem}
              </p>
            )}
          </div>
          {mensagem && (
            <p role="status" className="text-sm text-[#BDBDBD]">
              {mensagem}
            </p>
          )}
          {erro && (
            <p role="alert" className="text-sm text-[#ED7620]">
              {erro}
            </p>
          )}
          <Button type="submit" disabled={salvando}>
            {salvando ? 'Salvando…' : 'Salvar configurações'}
          </Button>
        </form>
      )}
    </section>
  )
}
