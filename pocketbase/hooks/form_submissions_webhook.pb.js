/// <reference path="../pb_data/types.d.ts" />

// Envia cada novo envio de `form_submissions` como POST JSON para configuracoes.webhook_url.
// URL vazia = webhook desligado. Falha NÃO afeta o visitante nem o e-mail:
// o registro já está gravado; o erro vai para o log do hook.

onRecordAfterCreateSuccess((e) => {
  try {
    let url = ''
    try {
      const registros = $app.findRecordsByFilter('configuracoes', '', '', 1, 0)
      if (registros.length > 0) url = registros[0].getString('webhook_url').trim()
    } catch (err) {
      console.error('form_submissions_webhook: falha ao ler configuracoes: ' + err)
    }

    if (url !== '') {
      const r = e.record
      const respostas = JSON.parse(r.getString('respostas') || 'null')
      const corpo = {
        id: r.id,
        nome: r.getString('nome'),
        email: r.getString('email'),
        telefone: r.getString('telefone'),
        empresa: r.getString('empresa'),
        mensagem: r.getString('mensagem'),
        respostas: respostas && typeof respostas === 'object' ? respostas : {},
        data: r.getString('created'),
      }
      const res = $http.send({
        url: url,
        method: 'POST',
        body: JSON.stringify(corpo),
        headers: { 'Content-Type': 'application/json' },
        timeout: 10,
      })
      if (res.statusCode < 200 || res.statusCode > 299) {
        console.error(
          'form_submissions_webhook: webhook respondeu status ' +
            res.statusCode +
            ' para o envio ' +
            r.id,
        )
      }
    }
  } catch (err) {
    console.error(
      'form_submissions_webhook: falha ao enviar webhook do envio ' + e.record.id + ': ' + err,
    )
  }
  e.next()
}, 'form_submissions')
