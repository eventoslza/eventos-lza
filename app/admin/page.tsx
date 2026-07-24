import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import { salvarEvento, deletarEvento, fazerLogin, fazerLogout } from '../actions'
import { User, ShieldCheck, Briefcase, LogOut, Edit, Trash2, QrCode, BarChart3, Users, PlusCircle } from 'lucide-react'

const prisma = new PrismaClient()

export default async function AdminPage() {
  const session = cookies().get("lza_admin_session")
  
  // 1. TELA DE LOGIN (USUÁRIO + SENHA + ESQUECI A SENHA)
  if (!session) {
    return (
      <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
        <div style={{ background: '#111', padding: '40px', borderRadius: '30px', border: '1px solid #FDB813', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <img src="/logo-lza.png" style={{ height: '80px', marginBottom: '30px' }} alt="LZA" />
          <h2 style={{ color: '#FDB813', marginBottom: '20px', fontSize: '18px', fontWeight: 'bold' }}>SISTEMA DE GESTÃO LZA</h2>
          <form action={fazerLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input name="cadastro" placeholder="Nº de Cadastro (Usuário)" style={{ padding: '15px', borderRadius: '10px', background: '#000', border: '1px solid #333', color: '#fff' }} required />
            <input name="password" type="password" placeholder="Senha" style={{ padding: '15px', borderRadius: '10px', background: '#000', border: '1px solid #333', color: '#fff' }} required />
            <button type="submit" style={{ background: '#FDB813', color: '#000', fontWeight: 'bold', padding: '15px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '16px' }}>ENTRAR NO PORTAL</button>
            <a href="https://wa.me/5562994319156" style={{ color: '#888', fontSize: '12px', marginTop: '10px', textDecoration: 'none' }}>Esqueceu a senha? Toque aqui</a>
          </form>
        </div>
      </div>
    )
  }

  // DADOS DO USUÁRIO E RELATÓRIOS
  const admin = await prisma.user.findUnique({ where: { id: session.value } })
  const eventos = await prisma.evento.findMany({ orderBy: { data: 'desc' } })
  const totalApoiados = eventos.filter(e => e.apoiado).length

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* HEADER */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#FDB813', fontSize: '20px', fontWeight: '900', fontStyle: 'italic' }}>LZA ADMIN 🚀</h1>
        <form action={fazerLogout}><button type="submit" style={{ background: '#222', color: '#ff4444', border: 'none', padding: '8px 15px', borderRadius: '8px', fontWeight: 'bold' }}>SAIR</button></form>
      </header>

      {/* DASHBOARD / RELATÓRIOS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
        <div style={{ background: '#111', padding: '20px', borderRadius: '20px', border: '1px solid #222' }}>
          <BarChart3 color="#FDB813" size={20} />
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '10px' }}>{eventos.length}</div>
          <small style={{ color: '#666' }}>EVENTOS</small>
        </div>
        <div style={{ background: '#111', padding: '20px', borderRadius: '20px', border: '1px solid #222' }}>
          <ShieldCheck color="#FDB813" size={20} />
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '10px' }}>{totalApoiados}</div>
          <small style={{ color: '#666' }}>APOIADOS</small>
        </div>
      </div>

      {/* PERFIL DO ADMIN (IDÊNTICO À SUA IMAGEM) */}
      <div style={{ border: '2px solid #FDB813', borderRadius: '25px', padding: '20px', background: '#000', marginBottom: '40px' }}>
         <div style={{ textAlign: 'center', color: '#FDB813', fontSize: '14px', fontWeight: 'bold', letterSpacing: '4px', marginBottom: '20px' }}>🌐 INFORMAÇÕES</div>
         
         <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ border: '1px solid #333', borderRadius: '15px', padding: '15px', display: 'flex', alignItems: 'center', gap: '20px' }}>
               <User color="#FDB813" size={32} />
               <div><small style={{color: '#FDB813', fontSize: '10px'}}>NOME</small><br/><strong style={{fontSize:'16px'}}>{admin?.nome || 'EDUARDO DE SOUSA SILVA'}</strong></div>
            </div>
            <div style={{ border: '1px solid #333', borderRadius: '15px', padding: '15px', display: 'flex', alignItems: 'center', gap: '20px' }}>
               <ShieldCheck color="#FDB813" size={32} />
               <div><small style={{color: '#FDB813', fontSize: '10px'}}>Nº DE CADASTRO</small><br/><strong style={{fontSize:'16px'}}>{admin?.cadastroNum}</strong></div>
            </div>
            <div style={{ border: '1px solid #333', borderRadius: '15px', padding: '15px', display: 'flex', alignItems: 'center', gap: '20px' }}>
               <Briefcase color="#FDB813" size={32} />
               <div><small style={{color: '#FDB813', fontSize: '10px'}}>CARGO</small><br/><strong style={{fontSize:'16px'}}>{admin?.cargo}</strong></div>
            </div>
         </div>
         {/* QR CODE DIGITAL */}
         <div style={{ marginTop: '20px', textAlign: 'center', padding: '15px', background: '#fff', borderRadius: '15px', width: 'fit-content', margin: '20px auto' }}>
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=LZA-AUTH-${admin?.cadastroNum}`} alt="QR Code" />
            <p style={{ color: '#000', fontSize: '10px', fontWeight: 'bold', marginTop: '5px' }}>VALIDAÇÃO DIGITAL</p>
         </div>
      </div>

      {/* GERENCIAR EVENTO (CADASTRO/EDIÇÃO) */}
      <div style={{ background: '#111', padding: '25px', borderRadius: '25px', border: '1px solid #333', marginBottom: '40px' }}>
        <h2 style={{ color: '#FDB813', fontSize: '18px', marginBottom: '20px' }}>POSTAR / EDITAR EVENTO</h2>
        <form action={salvarEvento} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input name="id" type="hidden" /> {/* Para edição */}
          <input name="nome" placeholder="Nome do Evento" style={{ padding: '15px', borderRadius: '10px', background: '#000', border: '1px solid #333', color: '#fff' }} required />
          <input name="data" type="date" style={{ padding: '15px', borderRadius: '10px', background: '#000', border: '1px solid #333', color: '#fff' }} required />
          <input name="cidade" placeholder="Cidade" style={{ padding: '15px', borderRadius: '10px', background: '#000', border: '1px solid #333', color: '#fff' }} required />
          <input name="banner" placeholder="URL da Arte (Banner)" style={{ padding: '15px', borderRadius: '10px', background: '#000', border: '1px solid #333', color: '#fff' }} required />
          <input name="link" placeholder="Link de Ingressos (Opcional)" style={{ padding: '15px', borderRadius: '10px', background: '#000', border: '1px solid #333', color: '#fff' }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#000', padding: '15px', borderRadius: '12px' }}>
            <label style={{ color: '#FDB813', fontSize: '13px', display: 'flex', gap: '10px' }}><input type="checkbox" name="destaque" /> ATIVAR CRONÔMETRO INICIAL</label>
            <label style={{ color: '#FDB813', fontSize: '13px', display: 'flex', gap: '10px' }}><input type="checkbox" name="apoiado" /> SELO DE EVENTO APOIADO</label>
          </div>
          <button type="submit" style={{ background: '#FDB813', color: '#000', fontWeight: 'bold', padding: '18px', borderRadius: '12px', border: 'none', fontSize: '16px' }}>PUBLICAR AGORA</button>
        </form>
      </div>

      {/* LISTA DE EVENTOS COM EDITAR */}
      <h2 style={{ color: '#FDB813', marginBottom: '15px' }}>EVENTOS NO AR</h2>
      {eventos.map((ev) => (
        <div key={ev.id} style={{ background: '#111', padding: '15px', borderRadius: '15px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: ev.apoiado ? '1px solid #FDB813' : '1px solid #222' }}>
          <div>
            <strong>{ev.nome}</strong><br/>
            <small style={{color:'#666'}}>{ev.cidade}</small>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ background: '#FDB813', border: 'none', padding: '8px', borderRadius: '8px' }}><Edit size={18}/></button>
            <form action={async () => { "use server"; await deletarEvento(ev.id); }}>
              <button style={{ background: '#ff4444', color: '#fff', border: 'none', padding: '8px', borderRadius: '8px' }}><Trash2 size={18}/></button>
            </form>
          </div>
        </div>
      ))}
    </div>
  )
}
