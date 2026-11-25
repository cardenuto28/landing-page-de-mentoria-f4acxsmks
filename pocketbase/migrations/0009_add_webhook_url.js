migrate(
  (app) => {
    // URL do webhook externo (CRM, n8n, Make). Vazia = webhook desligado.
    const configuracoes = app.findCollectionByNameOrId('configuracoes')
    if (!configuracoes.fields.getByName('webhook_url')) {
      configuracoes.fields.add(new URLField({ name: 'webhook_url' }))
    }
    app.save(configuracoes)
  },
  (app) => {
    const configuracoes = app.findCollectionByNameOrId('configuracoes')
    if (configuracoes.fields.getByName('webhook_url')) {
      configuracoes.fields.removeByName('webhook_url')
    }
    app.save(configuracoes)
  },
)
