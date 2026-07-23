import { criarEvento, deletarEvento, fazerLogin, fazerLogout } from '../actions'
import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

export default async function AdminPage() {
  const session = cookies().get("lza_admin_session")

  if (!session || session.value !== "logado") {
    return (
      <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
        <div style={{ background: '#111', padding: '40px', borderRadius: '30px', border: '1px solid #FDB813', width: '100%', maxWidth: '350px', textAlign: 'center' }}>
          <img src="/logo-lza.png" style={{ height: '80px', marginBottom: '20px' }} alt="LZA" />
          <h2 style={{ color: '#FDB813', marginBottom: '20px' }}>ACESSO RESTRITO</h2>
          <form action={fazerLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input name="senha" type="password" placeholder="Senha Mestre" style={{ padding: '15px', borderRadius: '10px', background: '#000', border: '1px solid #333', color: '#fff', textAlign: 'center' }} required />
            <button type="submit" style={{ background: '#FDB813', color: '#000', fontWeight: 'bold', padding: '15px', borderRadius: '10px', border: 'none', cursor: 'pointer' }}>ENTRAR</button>
          </form>
        </div>
      </div>
    )
  }

  const eventos = await prisma.evento.findMany({ orderBy: { data: 'desc' } })

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #FDB813', paddingBottom: '10px', marginBottom: '30px' }}>
        <h1 style={{ color: '#FDB813', textTransform: 'uppercase', fontStyle: 'italic', margin: 0, fontSize: '18px' }}>ADMINISTRAÇÃO LZA</h1>
        <form action={fazerLogout}><button type="submit" style={{ background: 'none', border: 'none', color: '#ff4444', fontWeight: 'bold' }}>SAIR</button></form>
      </header>
      <div style={{ background: '#111', padding: '20px', borderRadius: '15px', border: '1px solid #333', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '16px', marginBottom: '15px', color: '#FDB813' }}>NOVO EVENTO</h2>
        <form action={criarEvento} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input name="nome" placeholder="Nome do Evento" style={{ padding: '12px', background: '#000', border: '1px solid #444', color: '#fff', borderRadius: '8px' }} required />
          <input name="data" type="date" style={{ padding: '12px', background: '#000', border: '1px solid #444', color: '#fff', borderRadius: '8px' }} required />
          <input name="cidade" placeholder="Cidade" style={{ padding: '12px', background: '#000', border: '1px solid #444', color: '#fff', borderRadius: '8px' }} required />
          <input name="imagemUrl" placeholder="Link da Imagem (URL)" style={{ padding: '12px', background: '#000', border: '1px solid #444', color: '#fff', borderRadius: '8px' }} required />
          <input name="link" placeholder="Link do Ingresso" style={{ padding: '12px', background: '#000', border: '1px solid #444', color: '#fff', borderRadius: '8px' }} />
          <label style={{ color: '#FDB813', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input type="checkbox" name="destaque" /> MARCAR COMO DESTAQUE (CONTADOR)
          </label>
          <button type="submit" style={{ background: '#FDB813', color: '#000', fontWeight: 'bold', padding: '15px', borderRadius: '8px', border: 'none' }}>PUBLICAR AGORA</button>
        </form>
      </div>
      <h2 style={{ color: '#FDB813', fontSize: '16px' }}>EVENTOS ATIVOS</h2>
      {eventos.map((ev) => (
        <div key={ev.id} style={{ background: '#111', padding: '15px', borderRadius: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: ev.destaque ? '1px solid #FDB813' : '1px solid #222' }}>
          <div><strong>{ev.nome}</strong> {ev.destaque && '⭐'}<br/><small style={{color:'#666'}}>{ev.cidade}</small></div>
          <form action={async () => { "use server"; await deletarEvento(ev.id); }}>
            <button style={{ background: '#ff4444', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '5px' }}>EXCLUIR</button>
          </form>
        </div>
      ))}
    </div>
  )
}
