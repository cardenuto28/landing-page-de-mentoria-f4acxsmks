import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import AdminLogin from '@/components/admin/AdminLogin'
import AdminEnvios from '@/components/admin/AdminEnvios'
import AdminConfiguracoes from '@/components/admin/AdminConfiguracoes'
import { adminAutenticado, sairAdmin } from '@/services/admin-auth'

type Aba = 'recebidos' | 'configuracoes'

export default function Admin() {
  const [logado, setLogado] = useState(adminAutenticado())
  const [aba, setAba] = useState<Aba>('recebidos')

  useEffect(() => {
    document.title = 'Painel | Dealer Evolution'
  }, [])

  function handleSair() {
    sairAdmin()
    setLogado(false)
  }

  if (!logado) {
    return (
      <main className="min-h-dvh flex items-center justify-center bg-[#0B0B0B] px-4 py-16">
        <AdminLogin onEntrar={() => setLogado(true)} />
      </main>
    )
  }

  return (
    <main className="min-h-dvh bg-[#0B0B0B] px-4 py-8 text-[#E5E5E5]">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-extrabold text-white">Painel Dealer Evolution</h1>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={aba === 'recebidos' ? 'default' : 'outline'}
              aria-pressed={aba === 'recebidos'}
              onClick={() => setAba('recebidos')}
            >
              Recebidos
            </Button>
            <Button
              variant={aba === 'configuracoes' ? 'default' : 'outline'}
              aria-pressed={aba === 'configuracoes'}
              onClick={() => setAba('configuracoes')}
            >
              Configurações
            </Button>
            <Button variant="ghost" onClick={handleSair}>
              Sair
            </Button>
          </div>
        </header>
        {aba === 'recebidos' ? <AdminEnvios /> : <AdminConfiguracoes />}
      </div>
    </main>
  )
}
