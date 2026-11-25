import { useEffect, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CONTATOS_PADRAO } from '@/lib/contatos'
import { getConfiguracoes, salvarConfiguracoes } from '@/services/configuracoes'

export default function AdminConfiguracoes() {
  const [id, setId] = useState<string | undefined>(undefined)
  const [whatsapp, setWhatsapp] = useState('')
  const [telefone, setTelefone] = useState('')
  const [emailDestino, setEmailDestino] = useState(CONTATOS_PADRAO.emailDestino)
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)
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
