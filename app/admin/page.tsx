import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import { salvarEvento, deletarEvento, fazerLogin, fazerLogout } from '../actions'
import { User, ShieldCheck, Briefcase, LogOut, Edit, Trash2, BarChart3, QrCode, PlusCircle } from 'lucide-react'

const prisma = new PrismaClient()

export default async function AdminPage() {
  const session = cookies().get("lza_admin_session")
  
  if (!session) {
    return (
      <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <div style={{ background: '#111', padding: '40px', borderRadius: '30px', border: '1px solid #FDB813', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <h2 style={{ color: '#FDB813', marginBottom: '20px' }}>ACESSO RESTRITO</h2>
          <form action={fazerLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input name="cadastro" placeholder="Nº de Cadastro" style={{ padding: '15px', borderRadius: '10px', background: '#000', border: '1px solid #333', color: '#fff' }} required />
            <input name="password" type="password" placeholder="Senha" style={{ padding: '15px', borderRadius: '10px', background: '#000', border: '1px solid #333', color: '#fff' }} required />
            <button type="submit" style={{ background: '#FDB813', color: '#000', fontWeight: 'bold', padding: '15px', borderRadius: '10px', border: 'none' }}>ENTRAR</button>
          </form>
        </div>
      </div>
    )
  }

  const admin = await prisma.user.findUnique({ where: { id: session.value } })
  const eventos = await prisma.evento.findMany({ orderBy: { data: 'desc' } })
  const totalApoiados = eventos.filter(e => e.apoiado).length

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* SEU CRACHÁ (IDENTIDADE VISUAL) */}
      <div style={{ border: '2px solid #FDB813', borderRadius: '25px', padding: '20px', background: '#000', marginBottom: '30px' }}>
         <div style={{ textAlign: 'center', color: '#FDB813', fontSize: '14px', fontWeight: 'bold', letterSpacing: '4px', marginBottom: '20px' }}>🌐 INFORMAÇÕES</div>
         <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ border: '1px solid #333', borderRadius: '15px', padding: '15px', display: 'flex', alignItems: 'center', gap: '20px' }}>
               <User color="#FDB813" size={32} />
               <div><small style={{color: '#FDB813', fontSize: '10px'}}>NOME</small><br/><strong>{admin?.nome}</strong></div>
            </div>
            <div style={{ border: '1px solid #333', borderRadius: '15px', padding: '15px', display: 'flex', alignItems: 'center', gap: '20px' }}>
               <ShieldCheck color="#FDB813" size={32} />
               <div><small style={{color: '#FDB813', fontSize: '10px'}}>Nº DE CADASTRO</small><br/><strong>{admin?.cadastroNum}</strong></div>
            </div>
            <div style={{ border: '1px solid #333', borderRadius: '15px', padding: '15px', display: 'flex', alignItems: 'center', gap: '20px' }}>
               <Briefcase color="#FDB813" size={32} />
               <div><small style={{color: '#FDB813', fontSize: '10px'}}>CARGO</small><br/><strong>{admin?.cargo}</strong></div>
            </div>
         </div>
         <div style={{ marginTop: '20px', textAlign: 'center', padding: '15px', background: '#fff', borderRadius: '15px', width: 'fit-content', margin: '20px auto' }}>
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=LZA-AUTH-${admin?.cadastroNum}`} alt="QR Code" />
         </div>
         <form action={fazerLogout}><button style={{width: '100%', background: '#222', color: '#ff4444', border: 'none', padding: '10px', borderRadius: '10px'}}>SAIR</button></form>
      </div>

      {/* DASHBOARD / RELATÓRIOS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
        <div style={{ background: '#111', padding: '20px', borderRadius: '20px', border: '1px solid #222' }}>
          <BarChart3 color="#FDB813" size={20} />
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{eventos.length}</div>
          <small style={{ color: '#666' }}>EVENTOS</small>
        </div>
        <div style={{ background: '#111', padding: '20px', borderRadius: '20px', border: '1px solid #222' }}>
          <ShieldCheck color="#FDB813" size={20} />
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalApoiados}</div>
          <small style={{ color: '#666' }}>APOIADOS</small>
        </div>
      </div>

      {/* CADASTRAR/EDITAR */}
      <div style={{ background: '#111', padding: '25px', borderRadius: '25px', border: '1px solid #333', marginBottom: '40px' }}>
        <h2 style={{ color: '#FDB813', fontSize: '18px', marginBottom: '20px' }}>POSTAR / EDITAR EVENTO</h2>
        <form action={salvarEvento} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input name="id" type="hidden" /> 
          <input name="nome" placeholder="Nome" style={{ padding: '15px', borderRadius: '10px', background: '#000', border: '1px solid #333', color: '#fff' }} required />
          <input name="data" type="date" style={{ padding: '15px', borderRadius: '10px', background: '#000', border: '1px solid #333', color: '#fff' }} required />
          <input name="cidade" placeholder="Cidade" style={{ padding: '15px', borderRadius: '10px', background: '#000', border: '1px solid #333', color: '#fff' }} required />
          <input name="banner" placeholder="URL da Imagem" style={{ padding: '15px', borderRadius: '10px', background: '#000', border: '1px solid #333', color: '#fff' }} required />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#000', padding: '15px', borderRadius: '12px' }}>
            <label style={{ color: '#FDB813', fontSize: '13px', display: 'flex', gap: '10px' }}><input type="checkbox" name="destaque" /> CRONÔMETRO INICIAL</label>
            <label style={{ color: '#FDB813', fontSize: '13px', display: 'flex', gap: '10px' }}><input type="checkbox" name="apoiado" /> SELO DE EVENTO APOIADO</label>
          </div>
          <button type="submit" style={{ background: '#FDB813', color: '#000', fontWeight: 'bold', padding: '18px', borderRadius: '12px', border: 'none', fontSize: '16px' }}>PUBLICAR AGORA</button>
        </form>
      </div>
    </div>
  )
}
