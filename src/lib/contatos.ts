/**
 * Contatos exibidos na landing page. Os valores vêm da collection `configuracoes`;
 * estes são o FALLBACK usado quando o banco não responde ou o campo está vazio.
 */
export type Contatos = {
  whatsapp: string
  telefone: string
  emailDestino: string
}

/** E-mail que recebe cópia de cada envio; também é a sugestão inicial no painel. */
export const EMAIL_COPIA_PADRAO = 'ricardo@dealerevolution.com.br'

export const CONTATOS_PADRAO: Contatos = {
  whatsapp: '',
  telefone: '11999998888',
  emailDestino: 'contato@dealerevolution.com.br',
}

export function contatosDeRegistro(
  registro: { whatsapp?: string; telefone?: string; email_destino?: string } | null,
): Contatos {
  return {
    whatsapp: registro?.whatsapp || CONTATOS_PADRAO.whatsapp,
    telefone: registro?.telefone || CONTATOS_PADRAO.telefone,
    emailDestino: registro?.email_destino || CONTATOS_PADRAO.emailDestino,
  }
}
