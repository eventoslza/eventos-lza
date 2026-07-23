import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import { criarEvento, deletarEvento, fazerLogin, fazerLogout } from '../actions'
import { LayoutDashboard, Calendar, Star, Users, ShieldCheck, BarChart3, PlusCircle } from 'lucide-react'

const prisma = new PrismaClient()

export default async function AdminPage() {
  const session = cookies().get("lza_admin_session")

  if (!session) {
    return (
      <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <div style={{ background: '#111', padding: '40px', borderRadius: '30px', border: '1px solid #FDB813', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <img src="/logo-lza.png" style={{ height: '80px', marginBottom: '20px' }} alt="LZA" />
          <h2 style={{ color: '#FDB813', marginBottom: '20px' }}>ACESSO RESTRITO</h2>
          <form action={fazerLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input name="senha" type="password" placeholder="Senha Mestre" style={{ padding: '15px', borderRadius: '10px', background: '#000', border: '1px solid #333', color: '#fff', textAlign: 'center' }} required />
            <button type="submit" style={{ background: '#FDB813', color: '#000', fontWeight: 'bold', padding: '15px', borderRadius: '10px', border: 'none' }}>ENTRAR</button>
          </form>
        </div>
      </div>
    )
  }

  // DADOS DO DASHBOARD
  const eventos = await prisma.evento.findMany({ orderBy: { data: 'desc' } })
  const totalEventos = eventos.length
  const totalApoiados = eventos.filter(e => e.apoiado).length
  const proximo = eventos.length > 0 ? eventos[0].nome : "Nenhum"

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #FDB813', paddingBottom: '15px', marginBottom: '30px' }}>
        <div>
          <h1 style={{ color: '#FDB813', fontSize: '20px', fontWeight: '900', margin: 0 }}>LZA ADMIN 🚀</h1>
          <small style={{ color: '#666' }}>Painel de Controle Profissional</small>
        </div>
        <form action={fazerLogout}><button type="submit" style={{ background: '#222', color: '#ff4444', border: 'none', padding: '8px 15px', borderRadius: '8px', fontWeight: 'bold' }}>SAIR</button></form>
      </header>

      {/* DASHBOARD STATS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
        <div style={{ background: '#111', padding: '20px', borderRadius: '20px', border: '1px solid #222' }}>
          <BarChart3 color="#FDB813" size={20} />
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '10px' }}>{totalEventos}</div>
          <small style={{ color: '#666' }}>EVENTOS</small>
        </div>
        <div style={{ background: '#111', padding: '20px', borderRadius: '20px', border: '1px solid #222' }}>
          <ShieldCheck color="#FDB813" size={20} />
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '10px' }}>{totalApoiados}</div>
          <small style={{ color: '#666' }}>APOIADOS</small>
        </div>
      </div>

      {/* CADASTRO */}
      <section style={{ background: '#111', padding: '25px', borderRadius: '25px', border: '1px solid #333', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '18px', color: '#FDB813', marginBottom: '20px' }}>POSTAR EVENTO</h2>
        <form action={criarEvento} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input name="nome" placeholder="Nome do Evento" style={{ padding: '12px', background: '#000', color: '#fff', border: '1px solid #444', borderRadius: '10px' }} required />
          <div style={{ display: 'flex', gap: '10px' }}>
            <input name="data" type="date" style={{ flex: 1, padding: '12px', background: '#000', color: '#fff', border: '1px solid #444', borderRadius: '10px' }} required />
            <input name="cidade" placeholder="Cidade" style={{ flex: 1, padding: '12px', background: '#000', color: '#fff', border: '1px solid #444', borderRadius: '10px' }} required />
          </div>
          <input name="imagemUrl" placeholder="Link da Imagem (Arte)" style={{ padding: '12px', background: '#000', color: '#fff', border: '1px solid #444', borderRadius: '10px' }} required />
          <input name="link" placeholder="Link do Ingresso" style={{ padding: '12px', background: '#000', color: '#fff', border: '1px solid #444', borderRadius: '10px' }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#000', padding: '15px', borderRadius: '10px' }}>
            <label style={{ fontSize: '13px', color: '#FDB813', display: 'flex', gap: '10px' }}>
              <input type="checkbox" name="destaque" /> ATIVAR CRONÔMETRO (DESTAQUE)
            </label>
            <label style={{ fontSize: '13px', color: '#FDB813', display: 'flex', gap: '10px' }}>
              <input type="checkbox" name="apoiado" /> EVENTO APOIADO POR LZA
            </label>
          </div>

          <button type="submit" style={{ background: '#FDB813', color: '#000', fontWeight: 'bold', padding: '18px', borderRadius: '10px', border: 'none', fontSize: '16px' }}>PUBLICAR AGORA</button>
        </form>
      </section>

      {/* GERENCIAMENTO */}
      <h2 style={{ color: '#FDB813', marginBottom: '15px' }}>GERENCIAR LISTA</h2>
      {eventos.map((ev) => (
        <div key={ev.id} style={{ background: '#111', padding: '15px', borderRadius: '15px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: ev.destaque ? '1px solid #FDB813' : '1px solid #222' }}>
          <div>
            <strong>{ev.nome}</strong> {ev.apoiado && '🛡️'} {ev.destaque && '⭐'}<br/>
            <small style={{color:'#666'}}>{ev.cidade} - {new Date(ev.data).toLocaleDateString()}</small>
          </div>
          <form action={async () => { "use server"; await deletarEvento(ev.id); }}>
            <button style={{ background: '#ff4444', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '8px' }}>EXCLUIR</button>
          </form>
        </div>
      ))}
    </div>
  )
}
