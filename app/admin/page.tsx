import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import { salvarEvento, deletarEvento, fazerLogin, fazerLogout } from '../actions'
import { User, ShieldCheck, Briefcase, LogOut, Edit, Trash2, BarChart3, QrCode, Star } from 'lucide-react'

const prisma = new PrismaClient()

export default async function AdminPage() {
  const session = cookies().get("lza_admin_session")
  
  if (!session) {
    return (
      <div style={{ backgroundColor: '#050505', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
        <div style={{ background: '#111', padding: '40px', borderRadius: '30px', border: '1px solid #FDB813', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <img src="/logo-lza.png" style={{ height: '80px', marginBottom: '30px' }} alt="LZA" />
          <h2 style={{ color: '#FDB813', marginBottom: '20px' }}>LOGIN ADMINISTRATIVO</h2>
          <form action={fazerLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input name="cadastro" placeholder="Nº de Cadastro (Usuário)" style={{ padding: '15px', borderRadius: '10px', background: '#000', border: '1px solid #333', color: '#fff' }} required />
            <input name="password" type="password" placeholder="Sua Senha" style={{ padding: '15px', borderRadius: '10px', background: '#000', border: '1px solid #333', color: '#fff' }} required />
            <button type="submit" style={{ background: '#FDB813', color: '#000', fontWeight: 'bold', padding: '15px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>ENTRAR NO PORTAL</button>
          </form>
        </div>
      </div>
    )
  }

  const admin = await prisma.user.findUnique({ where: { id: session.value } })
  const eventos = await prisma.evento.findMany({ orderBy: { data: 'desc' } })

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* 1. PERFIL ESTILO CRACHÁ (IGUAL À SUA IMAGEM) */}
      <div style={{ border: '2px solid #FDB813', borderRadius: '25px', padding: '20px', background: '#000', marginBottom: '30px' }}>
         <div style={{ textAlign: 'center', color: '#FDB813', fontSize: '14px', fontWeight: 'bold', letterSpacing: '4px', marginBottom: '20px' }}>🌐 INFORMAÇÕES</div>
         <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ border: '1px solid #333', borderRadius: '15px', padding: '15px', display: 'flex', alignItems: 'center', gap: '20px' }}>
               <User color="#FDB813" size={28} />
               <div><small style={{color: '#FDB813', fontSize: '10px'}}>NOME</small><br/><strong style={{fontSize:'14px'}}>{admin?.nome}</strong></div>
            </div>
            <div style={{ border: '1px solid #333', borderRadius: '15px', padding: '15px', display: 'flex', alignItems: 'center', gap: '20px' }}>
               <ShieldCheck color="#FDB813" size={28} />
               <div><small style={{color: '#FDB813', fontSize: '10px'}}>Nº DE CADASTRO</small><br/><strong style={{fontSize:'14px'}}>{admin?.cadastroNum}</strong></div>
            </div>
            <div style={{ border: '1px solid #333', borderRadius: '15px', padding: '15px', display: 'flex', alignItems: 'center', gap: '20px' }}>
               <Briefcase color="#FDB813" size={28} />
               <div><small style={{color: '#FDB813', fontSize: '10px'}}>CARGO</small><br/><strong style={{fontSize:'14px'}}>{admin?.cargo}</strong></div>
            </div>
         </div>
         <div style={{ marginTop: '20px', textAlign: 'center', padding: '15px', background: '#fff', borderRadius: '15px', width: 'fit-content', margin: '20px auto' }}>
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=LZA-${admin?.cadastroNum}`} alt="QR Code" />
         </div>
         <form action={fazerLogout}><button style={{width: '100%', background: '#222', color: '#ff4444', border: 'none', padding: '10px', borderRadius: '10px'}}>SAIR DO SISTEMA</button></form>
      </div>

      {/* 2. GERENCIAR EVENTO */}
      <div style={{ background: '#111', padding: '25px', borderRadius: '25px', border: '1px solid #FDB813', marginBottom: '40px' }}>
        <h2 style={{ color: '#FDB813', fontSize: '18px', marginBottom: '20px' }}>POSTAR / EDITAR EVENTO</h2>
        <form action={salvarEvento} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input name="id" type="hidden" /> 
          <input name="nome" placeholder="Nome do Evento" style={{ padding: '15px', borderRadius: '10px', background: '#000', border: '1px solid #333', color: '#fff' }} required />
          <input name="data" type="date" style={{ padding: '15px', borderRadius: '10px', background: '#000', border: '1px solid #333', color: '#fff' }} required />
          <input name="cidade" placeholder="Cidade" style={{ padding: '15px', borderRadius: '10px', background: '#000', border: '1px solid #333', color: '#fff' }} required />
          <input name="banner" placeholder="URL da Imagem (Arte)" style={{ padding: '15px', borderRadius: '10px', background: '#000', border: '1px solid #333', color: '#fff' }} required />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#000', padding: '15px', borderRadius: '12px' }}>
            <label style={{ color: '#FDB813', fontSize: '13px', display: 'flex', gap: '10px' }}><input type="checkbox" name="destaque" /> ATIVAR CRONÔMETRO INICIAL</label>
            <label style={{ color: '#FDB813', fontSize: '13px', display: 'flex', gap: '10px' }}><input type="checkbox" name="apoiado" /> SELO APOIADO PELA LZA</label>
          </div>
          <button type="submit" style={{ background: '#FDB813', color: '#000', fontWeight: 'bold', padding: '18px', borderRadius: '12px', border: 'none', fontSize: '16px' }}>PUBLICAR NO SITE</button>
        </form>
      </div>
    </div>
  )
}
