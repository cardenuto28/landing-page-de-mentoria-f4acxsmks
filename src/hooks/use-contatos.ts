import { useEffect, useState } from 'react'

import { CONTATOS_PADRAO, contatosDeRegistro, type Contatos } from '@/lib/contatos'
import { getConfiguracoes } from '@/services/configuracoes'

/**
 * Contatos da landing page, lidos da collection `configuracoes`.
 * Começa com o fallback de código e troca pelos valores do banco quando chegam;
 * se o banco não responder, o fallback permanece.
 */
export function useContatos(): Contatos {
  const [contatos, setContatos] = useState<Contatos>(CONTATOS_PADRAO)

  useEffect(() => {
    let ativo = true
    getConfiguracoes()
      .then((registro) => {
        if (ativo) setContatos(contatosDeRegistro(registro))
      })
      .catch(() => {})
    return () => {
      ativo = false
    }
  }, [])

  return contatos
}
