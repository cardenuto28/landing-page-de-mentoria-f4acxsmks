/// <reference path="../pb_data/types.d.ts" />

// Rota de teste do webhook usada pelo painel /admin. Envia um POST de exemplo
// para a URL SALVA em configuracoes.webhook_url e devolve o resultado.
// Restrita a administradores (collection `admins`).

routerAdd('POST', '/backend/v1/webhook/teste', (e) => {
  if (!e.auth || e.auth.collectionName !== 'admins') {
    throw new ForbiddenError('Acesso restrito ao painel administrativo.')
  }

  let url = ''
  const registros = $app.findRecordsByFilter('configuracoes', '', '', 1, 0)
  if (registros.length > 0) url = registros[0].getString('webhook_url').trim()
  if (url === '') {
    return e.json(200, {
      ok: false,
      status: 0,
      mensagem: 'Cadastre a URL do webhook e salve antes de testar.',
    })
  }

  try {
    const res = $http.send({
      url: url,
      method: 'POST',
      body: JSON.stringify({
        teste: true,
        mensagem: 'Teste de webhook enviado pelo painel Dealer Evolution.',
        data: new Date().toISOString(),
      }),
      headers: { 'Content-Type': 'application/json' },
      timeout: 10,
    })
    const ok = res.statusCode >= 200 && res.statusCode <= 299
    return e.json(200, {
      ok: ok,
      status: res.statusCode,
      mensagem: ok
        ? 'Webhook respondeu com sucesso (status ' + res.statusCode + ').'
        : 'Webhook respondeu com falha (status ' + res.statusCode + ').',
    })
  } catch (err) {
    console.error('webhook_teste: falha de conexão: ' + err)
    return e.json(200, {
      ok: false,
      status: 0,
      mensagem: 'Não foi possível conectar à URL do webhook.',
    })
  }
})
