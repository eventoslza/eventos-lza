import { criarEvento, deletarEvento, fazerLogin, fazerLogout } from '../actions'
import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

export default async function AdminPage() {
  const session = cookies().get("lza_admin_session")

  if (!session) {
    return (
      <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <div style={{ background: '#111', padding: '30px', borderRadius: '20px', border: '1px solid #FDB813', textAlign: 'center', width: '100%', maxWidth: '350px' }}>
          <h2 style={{ color: '#FDB813' }}>ACESSO RESTRITO</h2>
          <form action={fazerLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
            <input name="senha" type="password" placeholder="Senha Mestre" style={{ padding: '12px', borderRadius: '8px', background: '#000', color: '#fff', border: '1px solid #333' }} required />
            <button type="submit" style={{ background: '#FDB813', color: '#000', fontWeight: 'bold', padding: '12px', borderRadius: '8px', border: 'none' }}>ENTRAR</button>
          </form>
        </div>
      </div>
    )
  }

  const eventos = await prisma.evento.findMany({ orderBy: { data: 'desc' } })

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #FDB813', paddingBottom: '10px' }}>
        <h1 style={{ color: '#FDB813', fontSize: '18px' }}>PAINEL LZA</h1>
        <form action={fazerLogout}><button type="submit" style={{ color: '#ff4444', background: 'none', border: 'none' }}>SAIR</button></form>
      </header>

      <form action={criarEvento} style={{ background: '#111', padding: '20px', borderRadius: '15px', margin: '30px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input name="nome" placeholder="Nome do Evento" style={{ padding: '10px', background: '#000', color: '#fff', border: '1px solid #333' }} required />
        <input name="data" type="date" style={{ padding: '10px', background: '#000', color: '#fff', border: '1px solid #333' }} required />
        <input name="cidade" placeholder="Cidade" style={{ padding: '10px', background: '#000', color: '#fff', border: '1px solid #333' }} required />
        <input name="imagemUrl" placeholder="Link da Imagem" style={{ padding: '10px', background: '#000', color: '#fff', border: '1px solid #333' }} required />
        <label style={{ color: '#FDB813', fontSize: '12px', display: 'flex', gap: '10px' }}>
          <input type="checkbox" name="destaque" /> MARCAR COMO DESTAQUE (CRONÔMETRO)
        </label>
        <button type="submit" style={{ background: '#FDB813', color: '#000', fontWeight: 'bold', padding: '12px' }}>PUBLICAR</button>
      </form>

      {eventos.map((ev) => (
        <div key={ev.id} style={{ background: '#111', padding: '15px', borderRadius: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', border: ev.destaque ? '1px solid #FDB813' : 'none' }}>
          <div>{ev.nome} {ev.destaque && '⭐'}</div>
          <form action={async () => { "use server"; await deletarEvento(ev.id); }}>
            <button style={{ background: '#ff4444', color: '#fff', border: 'none', padding: '5px' }}>EXCLUIR</button>
          </form>
        </div>
      ))}
    </div>
  )
}
