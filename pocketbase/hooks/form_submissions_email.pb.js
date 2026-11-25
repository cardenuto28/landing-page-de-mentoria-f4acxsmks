/// <reference path="../pb_data/types.d.ts" />

// Envia por e-mail cada envio gravado em `form_submissions`.
// Destinatário: configuracoes.email_destino, com fallback fixo.
// Cópia: configuracoes.email_copia, com fallback fixo (mesmo mail client, uma mensagem só).
// Falha de e-mail NÃO afeta o visitante: o registro já está gravado; o erro vai para o log do hook.

onRecordAfterCreateSuccess((e) => {
  try {
    const EMAIL_FALLBACK = 'contato@dealerevolution.com.br'
    const COPIA_FALLBACK = 'ricardo@dealerevolution.com.br'
    let destino = EMAIL_FALLBACK
    let copia = COPIA_FALLBACK
    try {
      const registros = $app.findRecordsByFilter('configuracoes', '', '', 1, 0)
      if (registros.length > 0) {
        const email = registros[0].getString('email_destino')
        if (email) destino = email
        const emailCopia = registros[0].getString('email_copia')
        if (emailCopia) copia = emailCopia
      }
    } catch (err) {
      console.error('form_submissions_email: falha ao ler configuracoes: ' + err)
    }

    const r = e.record
    const linha = (valor) =>
      valor && String(valor).trim() !== '' ? String(valor) : '(não informado)'

    // Campo json: get() devolve bytes crus; é preciso ler como string e converter.
    const respostas = JSON.parse(r.getString('respostas') || 'null')
    let respostasTexto = ''
    if (respostas && typeof respostas === 'object') {
      for (const chave of Object.keys(respostas)) {
        respostasTexto += '- ' + chave + ': ' + String(respostas[chave]) + '\n'
      }
    }
    if (respostasTexto === '') respostasTexto = '(nenhuma resposta)\n'

    const corpo =
      'Novo envio pelo formulário da landing page Dealer Evolution.\n\n' +
      'Nome: ' +
      linha(r.getString('nome')) +
      '\n' +
      'E-mail: ' +
      linha(r.getString('email')) +
      '\n' +
      'Telefone: ' +
      linha(r.getString('telefone')) +
      '\n' +
      'Empresa: ' +
      linha(r.getString('empresa')) +
      '\n' +
      'Mensagem: ' +
      linha(r.getString('mensagem')) +
      '\n\n' +
      'Respostas:\n' +
      respostasTexto

    const mensagem = {
      to: [{ address: destino }],
      subject: 'Novo envio do formulário — Dealer Evolution',
      text: corpo,
    }
    // Sem cópia duplicada quando a cópia é o próprio destinatário.
    if (
      copia &&
      copia.trim() !== '' &&
      copia.trim().toLowerCase() !== destino.trim().toLowerCase()
    ) {
      mensagem.cc = [{ address: copia.trim() }]
    }

    $app.newMailClient().send(mensagem)
  } catch (err) {
    console.error(
      'form_submissions_email: falha ao enviar e-mail do envio ' + e.record.id + ': ' + err,
    )
  }
  e.next()
}, 'form_submissions')
