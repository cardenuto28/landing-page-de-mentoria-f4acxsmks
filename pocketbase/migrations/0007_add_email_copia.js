migrate(
  (app) => {
    // Campo de texto com o e-mail que recebe cópia de cada envio do formulário.
    const configuracoes = app.findCollectionByNameOrId('configuracoes')
    if (!configuracoes.fields.getByName('email_copia')) {
      configuracoes.fields.add(new TextField({ name: 'email_copia', max: 200 }))
    }
    app.save(configuracoes)
  },
  (app) => {
    const configuracoes = app.findCollectionByNameOrId('configuracoes')
    if (configuracoes.fields.getByName('email_copia')) {
      configuracoes.fields.removeByName('email_copia')
    }
    app.save(configuracoes)
  },
)
