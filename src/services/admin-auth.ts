import pb from '@/lib/pocketbase/client'

/** Login do painel: autentica na collection de administradores com e-mail e senha. */
export async function entrarAdmin(email: string, senha: string) {
  await pb.collection('admins').authWithPassword(email, senha)
}

export function sairAdmin() {
  pb.authStore.clear()
}

/** Sessão válida de administrador (não basta ter sessão de outra collection). */
export function adminAutenticado(): boolean {
  return pb.authStore.isValid && pb.authStore.record?.collectionName === 'admins'
}
