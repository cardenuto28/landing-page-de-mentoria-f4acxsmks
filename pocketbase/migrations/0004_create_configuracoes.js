migrate(
  (app) => {
    const configuracoes = new Collection({
      name: 'configuracoes',
      type: 'base',
      // Leitura pública (a landing page mostra os contatos); escrita somente por administradores.
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != '' && @request.auth.collectionName = 'admins'",
      updateRule: "@request.auth.id != '' && @request.auth.collectionName = 'admins'",
      deleteRule: "@request.auth.id != '' && @request.auth.collectionName = 'admins'",
      fields: [
        { name: 'whatsapp', type: 'text', max: 40 },
        { name: 'telefone', type: 'text', max: 40 },
        { name: 'email_destino', type: 'email' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(configuracoes)

    // Registro único de configuração, criado somente se ainda não existir.
    const existentes = app.findRecordsByFilter('configuracoes', '', '', 1, 0)
    if (existentes.length === 0) {
      const record = new Record(configuracoes)
      record.set('whatsapp', '')
      record.set('telefone', '')
      record.set('email_destino', 'contato@dealerevolution.com.br')
      app.save(record)
    }
  },
  (app) => {
    const configuracoes = app.findCollectionByNameOrId('configuracoes')
    app.delete(configuracoes)
  },
)
