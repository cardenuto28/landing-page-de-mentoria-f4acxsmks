migrate(
  (app) => {
    // Reexecução idempotente da semente da conta do painel (ver 0002): cria o
    // administrador a partir de ADMIN_EMAIL / ADMIN_PASSWORD se ainda não existir.
    const email = $os.getenv('ADMIN_EMAIL')
    const password = $os.getenv('ADMIN_PASSWORD')
    if (!email || !password) return

    const existentes = app.findRecordsByFilter('admins', 'email = {:e}', '', 1, 0, { e: email })
    if (existentes.length > 0) return

    const admins = app.findCollectionByNameOrId('admins')
    const record = new Record(admins)
    record.setEmail(email)
    record.setPassword(password)
    record.setVerified(true)
    record.set('name', 'Administrador')
    app.save(record)
  },
  (app) => {
    // Mantido sem remoção: a conta pode já ter sido alterada pelo administrador.
  },
)
