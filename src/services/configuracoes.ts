import pb from '@/lib/pocketbase/client'

export type ConfiguracoesRecord = {
  id: string
  whatsapp: string
  telefone: string
  email_destino: string
}

export type ConfiguracoesInput = {
  whatsapp: string
  telefone: string
  email_destino: string
}

/** Lê o registro único de configurações (leitura pública). */
export async function getConfiguracoes(): Promise<ConfiguracoesRecord | null> {
  const res = await pb.collection('configuracoes').getList<ConfiguracoesRecord>(1, 1)
  return res.items[0] ?? null
}

/** Atualiza o registro existente ou cria o primeiro (apenas administradores). */
export function salvarConfiguracoes(input: ConfiguracoesInput, id?: string) {
  if (id) return pb.collection('configuracoes').update<ConfiguracoesRecord>(id, input)
  return pb.collection('configuracoes').create<ConfiguracoesRecord>(input)
}
