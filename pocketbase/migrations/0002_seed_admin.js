migrate(
  (app) => {
    // Conta provisória do painel. E-mail e senha vêm de variáveis de ambiente
    // (ADMIN_EMAIL / ADMIN_PASSWORD), nunca fixos no código. Sem elas, nada é criado.
    const email = $os.getenv('ADMIN_EMAIL')
    const password = $os.getenv('ADMIN_PASSWORD')
    if (!email || !password) return

    try {
      app.findAuthRecordByEmail('admins', email)
      return // já existe
    } catch (_) {}

    const admins = app.findCollectionByNameOrId('admins')
    const record = new Record(admins)
    record.setEmail(email)
    record.setPassword(password)
    record.setVerified(true)
    record.set('name', 'Administrador')
    app.save(record)
  },
  (app) => {
    const email = $os.getenv('ADMIN_EMAIL')
    if (!email) return
    try {
      const record = app.findAuthRecordByEmail('admins', email)
      app.delete(record)
    } catch (_) {}
  },
)
