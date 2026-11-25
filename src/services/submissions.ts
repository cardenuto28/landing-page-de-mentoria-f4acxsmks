import pb from '@/lib/pocketbase/client'

export type FormSubmissionRecord = {
  id: string
  nome: string
  email: string
  telefone: string
  empresa: string
  mensagem: string
  respostas: Record<string, string>
  lido: boolean
  created: string
}

export type NovoEnvio = {
  nome?: string
  email?: string
  telefone?: string
  empresa?: string
  mensagem?: string
  respostas: Record<string, string>
}

/** Grava uma submissão do formulário da landing page (aberto a visitantes). */
export function criarEnvio(envio: NovoEnvio) {
  return pb.collection('form_submissions').create<FormSubmissionRecord>({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    mensagem: '',
    lido: false,
    ...envio,
  })
}

/** Lista paginada, mais recentes primeiro, com busca simples (apenas administradores). */
export function listarEnvios(page: number, perPage: number, busca: string) {
  const termo = busca.trim()
  const filter = termo
    ? pb.filter('nome ~ {:q} || email ~ {:q} || telefone ~ {:q} || empresa ~ {:q}', { q: termo })
    : ''
  return pb.collection('form_submissions').getList<FormSubmissionRecord>(page, perPage, {
    sort: '-created',
    filter,
  })
}

export function marcarLido(id: string, lido: boolean) {
  return pb.collection('form_submissions').update<FormSubmissionRecord>(id, { lido })
}

export function excluirEnvio(id: string) {
  return pb.collection('form_submissions').delete(id)
}
