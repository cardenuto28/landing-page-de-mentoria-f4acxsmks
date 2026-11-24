import { Outlet } from 'react-router-dom'

// Layout mínimo: o cabeçalho, o rodapé e todos os CTAs vivem DENTRO da página
// (src/pages/Index.tsx e src/components/Header/Footer), fiel à prancha, que não
// tem menus, redes sociais nem elementos fora das 17 seções.
export default function Layout() {
  return (
    <div className="min-h-dvh bg-[#0B0B0B] text-[#F5F5F5]">
      <Outlet />
    </div>
  )
}
