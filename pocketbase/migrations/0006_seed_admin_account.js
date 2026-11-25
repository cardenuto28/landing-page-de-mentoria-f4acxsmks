migrate(
  (app) => {
    // Conta de administrador do painel /admin. O e-mail não é segredo e fica fixo aqui.
    // A senha NUNCA fica no código: usa ADMIN_PASSWORD se o ambiente da migração a expuser;
    // caso contrário gera uma senha aleatória e descartada. Defina a senha pelo painel do
    // Skip Cloud (aba Collections > admins) antes do primeiro acesso.
    const email = 'contato@dealerevolution.com.br'

    const existentes = app.findRecordsByFilter('admins', 'email = {:e}', '', 1, 0, { e: email })
    if (existentes.length > 0) return

    let password = ''
    try {
      password = $os.getenv('ADMIN_PASSWORD') || ''
    } catch (_) {}
    if (!password) password = $security.randomString(40)

    const admins = app.findCollectionByNameOrId('admins')
    const record = new Record(admins)
    record.setEmail(email)
    record.setPassword(password)
    record.setVerified(true)
    record.set('name', 'Administrador')
    app.save(record)
  },
  (app) => {
    const email = 'contato@dealerevolution.com.br'
    try {
      const record = app.findAuthRecordByEmail('admins', email)
      app.delete(record)
    } catch (_) {}
  },
)
