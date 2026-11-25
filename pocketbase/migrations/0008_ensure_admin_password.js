migrate(
  (app) => {
    // Garante a conta de administrador do painel /admin com a senha definida pelo
    // proprietário. Idempotente: cria o registro se não existir; se já existir,
    // apenas reseta a senha (e marca o e-mail como verificado).
    const email = 'contato@dealerevolution.com.br'
    const senha = 'meta100k'

    const admins = app.findCollectionByNameOrId('admins')

    let registro = null
    const existentes = app.findRecordsByFilter('admins', 'email = {:e}', '', 1, 0, { e: email })
    if (existentes.length > 0) {
      registro = existentes[0]
      registro.setPassword(senha)
      registro.setVerified(true)
      app.save(registro)
      return
    }

    registro = new Record(admins)
    registro.setEmail(email)
    registro.setPassword(senha)
    registro.setVerified(true)
    registro.set('name', 'Administrador')
    app.save(registro)
  },
  (app) => {
    // Reverter: não remove a conta (o dono usa), apenas deixa o estado anterior —
    // um down que apagasse o admin deixaria o painel sem acesso.
    // Como não é possível restaurar a senha anterior (era hash desconhecido),
    // o down é um no-op seguro.
    void app
  },
)
