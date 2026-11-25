import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  excluirEnvio,
  listarEnvios,
  marcarLido,
  type FormSubmissionRecord,
} from '@/services/submissions'

const POR_PAGINA = 20

function formatarData(iso: string) {
  const d = new Date(iso.replace(' ', 'T'))
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleString('pt-BR')
}

function resumoRespostas(r: Record<string, string> | null | undefined) {
  if (!r) return ''
  return Object.entries(r)
    .map(([k, v]) => `${k}: ${v}`)
    .join(' · ')
}

export default function AdminEnvios() {
  const [itens, setItens] = useState<FormSubmissionRecord[]>([])
  const [pagina, setPagina] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)
  const [total, setTotal] = useState(0)
  const [busca, setBusca] = useState('')
  const [buscaAplicada, setBuscaAplicada] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [confirmandoId, setConfirmandoId] = useState<string | null>(null)

  const carregar = useCallback(async (p: number, q: string) => {
    setCarregando(true)
    setErro('')
    try {
      const res = await listarEnvios(p, POR_PAGINA, q)
      setItens(res.items)
      setTotalPaginas(Math.max(1, res.totalPages))
      setTotal(res.totalItems)
      setPagina(res.page)
    } catch {
      setErro('Não foi possível carregar os envios. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }, [])

  useEffect(() => {
    carregar(pagina, buscaAplicada)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagina, buscaAplicada, carregar])

  function handleBuscar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPagina(1)
    setBuscaAplicada(busca)
  }

  async function handleToggleLido(item: FormSubmissionRecord) {
    try {
      await marcarLido(item.id, !item.lido)
      await carregar(pagina, buscaAplicada)
    } catch {
      setErro('Não foi possível atualizar o envio.')
    }
  }

  async function handleExcluir(id: string) {
    try {
      await excluirEnvio(id)
      setConfirmandoId(null)
      const deveVoltar = itens.length === 1 && pagina > 1
      await carregar(deveVoltar ? pagina - 1 : pagina, buscaAplicada)
    } catch {
      setErro('Não foi possível excluir o envio.')
    }
  }

  return (
    <section aria-labelledby="admin-recebidos" className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 id="admin-recebidos" className="text-xl font-bold text-white">
          Recebidos ({total})
        </h2>
        <form onSubmit={handleBuscar} className="flex gap-2" role="search">
          <div className="space-y-1">
            <Label htmlFor="admin-busca" className="sr-only">
              Buscar envios
            </Label>
            <Input
              id="admin-busca"
              type="search"
              autoComplete="off"
              placeholder="Buscar por nome, e-mail, telefone ou empresa"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="min-w-[260px]"
            />
          </div>
          <Button type="submit" variant="secondary">
            Buscar
          </Button>
        </form>
      </div>

      {erro && (
        <p role="alert" className="text-sm text-[#ED7620]">
          {erro}
        </p>
      )}

      {carregando ? (
        <p role="status" className="text-[#BDBDBD]">
          Carregando envios…
        </p>
      ) : itens.length === 0 ? (
        <p role="status" className="text-[#BDBDBD]">
          Nenhum envio encontrado.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[#262626]">
          <table className="w-full text-left text-sm text-[#E5E5E5]">
            <caption className="sr-only">
              Envios recebidos pelo formulário, mais recentes primeiro
            </caption>
            <thead className="bg-[#121212] text-[#BDBDBD]">
              <tr>
                <th scope="col" className="px-3 py-2 font-semibold">
                  Data
                </th>
                <th scope="col" className="px-3 py-2 font-semibold">
                  Nome
                </th>
                <th scope="col" className="px-3 py-2 font-semibold">
                  E-mail
                </th>
                <th scope="col" className="px-3 py-2 font-semibold">
                  Telefone
                </th>
                <th scope="col" className="px-3 py-2 font-semibold">
                  Empresa
                </th>
                <th scope="col" className="px-3 py-2 font-semibold">
                  Mensagem
                </th>
                <th scope="col" className="px-3 py-2 font-semibold">
                  Status
                </th>
                <th scope="col" className="px-3 py-2 font-semibold">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {itens.map((item) => (
                <tr key={item.id} className="border-t border-[#262626] align-top">
                  <td className="px-3 py-2 whitespace-nowrap">{formatarData(item.created)}</td>
                  <td className="px-3 py-2">{item.nome || '—'}</td>
                  <td className="px-3 py-2">{item.email || '—'}</td>
                  <td className="px-3 py-2">{item.telefone || '—'}</td>
                  <td className="px-3 py-2">{item.empresa || '—'}</td>
                  <td className="px-3 py-2 max-w-[360px] break-words">
                    {item.mensagem || resumoRespostas(item.respostas) || '—'}
                  </td>
                  <td className="px-3 py-2">
                    <Badge variant={item.lido ? 'secondary' : 'default'}>
                      {item.lido ? 'Lido' : 'Novo'}
                    </Badge>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleToggleLido(item)}>
                        {item.lido ? 'Marcar como novo' : 'Marcar como lido'}
                      </Button>
                      {confirmandoId === item.id ? (
                        <>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleExcluir(item.id)}
                          >
                            Confirmar exclusão
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setConfirmandoId(null)}>
                            Cancelar
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" variant="ghost" onClick={() => setConfirmandoId(item.id)}>
                          Excluir
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <nav aria-label="Paginação" className="flex items-center justify-between gap-3">
        <Button
          variant="outline"
          disabled={pagina <= 1 || carregando}
          onClick={() => setPagina((p) => Math.max(1, p - 1))}
        >
          Anterior
        </Button>
        <span className="text-sm text-[#BDBDBD]">
          Página {pagina} de {totalPaginas}
        </span>
        <Button
          variant="outline"
          disabled={pagina >= totalPaginas || carregando}
          onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
        >
          Próxima
        </Button>
      </nav>
    </section>
  )
}
