migrate(
  (app) => {
    const submissions = new Collection({
      name: 'form_submissions',
      type: 'base',
      // Visitantes podem enviar; somente administradores leem, alteram e excluem.
      listRule: "@request.auth.id != '' && @request.auth.collectionName = 'admins'",
      viewRule: "@request.auth.id != '' && @request.auth.collectionName = 'admins'",
      createRule: '',
      updateRule: "@request.auth.id != '' && @request.auth.collectionName = 'admins'",
      deleteRule: "@request.auth.id != '' && @request.auth.collectionName = 'admins'",
      fields: [
        { name: 'nome', type: 'text', max: 200 },
        { name: 'email', type: 'email' },
        { name: 'telefone', type: 'text', max: 40 },
        { name: 'empresa', type: 'text', max: 200 },
        { name: 'mensagem', type: 'text', max: 5000 },
        { name: 'respostas', type: 'json', maxSize: 20000 },
        { name: 'lido', type: 'bool' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE INDEX idx_form_submissions_created ON form_submissions (created)'],
    })
    app.save(submissions)
  },
  (app) => {
    const submissions = app.findCollectionByNameOrId('form_submissions')
    app.delete(submissions)
  },
)
