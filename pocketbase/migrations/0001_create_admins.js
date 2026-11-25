migrate(
  (app) => {
    const admins = new Collection({
      name: 'admins',
      type: 'auth',
      authRule: '',
      listRule: 'id = @request.auth.id',
      viewRule: 'id = @request.auth.id',
      createRule: null,
      updateRule: 'id = @request.auth.id',
      deleteRule: null,
      fields: [{ name: 'name', type: 'text', max: 120 }],
    })
    app.save(admins)
  },
  (app) => {
    const admins = app.findCollectionByNameOrId('admins')
    app.delete(admins)
  },
)
