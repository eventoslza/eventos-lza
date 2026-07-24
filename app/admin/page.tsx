import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import { salvarEvento, deletarEvento, fazerLogin, fazerLogout } from '../actions'
import { User, BadgeId, Briefcase, Lock, LogOut, Edit, Trash2, ShieldCheck, Plus } from 'lucide-react'

const prisma = new PrismaClient()

export default async function AdminPage() {
  const session = cookies().get("lza_admin_session")
  
  // TELA DE LOGIN
  if (!session) {
    return (
      <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
        <div style={{ background: '#111', padding: '40px', borderRadius: '30px', border: '1px solid #FDB813', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <img src="/logo-lza.png" style={{ height: '80px', marginBottom: '30px' }} />
          <h2 style={{ color: '#FDB813', marginBottom: '20px', fontSize: '18px' }}>LOGIN ADMINISTRATIVO</h2>
          <form action={fazerLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input name="cadastro" placeholder="Nº de Cadastro (Usuário)" style={{ padding: '15px', borderRadius: '12px', background: '#000', border: '1px solid #333', color: '#fff' }} required />
            <input name="senha" type="password" placeholder="Sua Senha" style={{ padding: '15px', borderRadius: '12px', background: '#000', border: '1px solid #333', color: '#fff' }} required />
            <button type="submit" style={{ background: '#FDB813', color: '#000', fontWeight: 'bold', padding: '15px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>ENTRAR NO PORTAL</button>
            <a href="https://wa.me/5562994319156" style={{ color: '#888', fontSize: '12px', marginTop: '10px', textDecoration: 'none' }}>Esqueceu a senha? Toque aqui</a>
          </form>
        </div>
      </div>
    )
  }

  const admin = await prisma.user.findUnique({ where: { id: session.value } })
  const eventos = await prisma.evento.findMany({ orderBy: { data: 'desc' } })

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* 1. SEU PERFIL (ESTILO DA IMAGEM) */}
      <div style={{ border: '2px solid #FDB813', borderRadius: '25px', padding: '20px', background: '#000', marginBottom: '30px' }}>
         <div style={{ textAlign: 'center', color: '#FDB813', fontSize: '14px', fontWeight: 'bold', letterSpacing: '4px', marginBottom: '20px' }}>🌐 INFORMAÇÕES</div>
         
         <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {/* Nome */}
            <div style={{ border: '1px solid #333', borderRadius: '15px', padding: '15px', display: 'flex', alignItems: 'center', gap: '20px' }}>
               <User color="#FDB813" size={30} />
               <div><small style={{color: '#FDB813', fontSize: '10px'}}>NOME</small><br/><strong>{admin?.nome || 'EDUARDO DE SOUSA SILVA'}</strong></div>
            </div>
            {/* Cadastro */}
            <div style={{ border: '1px solid #333', borderRadius: '15px', padding: '15px', display: 'flex', alignItems: 'center', gap: '20px' }}>
               <ShieldCheck color="#FDB813" size={30} />
               <div><small style={{color: '#FDB813', fontSize: '10px'}}>Nº DE CADASTRO</small><br/><strong>{admin?.cadastroNum || '29012008-26'}</strong></div>
            </div>
            {/* Cargo */}
            <div style={{ border: '1px solid #333', borderRadius: '15px', padding: '15px', display: 'flex', alignItems: 'center', gap: '20px' }}>
               <Briefcase color="#FDB813" size={30} />
               <div><small style={{color: '#FDB813', fontSize: '10px'}}>CARGO</small><br/><strong>{admin?.cargo || 'CEO • DIRETOR EXECUTIVO'}</strong></div>
            </div>
         </div>
         <form action={fazerLogout} style={{marginTop: '20px'}}><button style={{width: '100%', background: '#222', color: '#ff4444', border: 'none', padding: '10px', borderRadius: '10px'}}>SAIR DO SISTEMA</button></form>
      </div>

      {/* 2. CADASTRAR/EDITAR EVENTO */}
      <div style={{ background: '#111', padding: '25px', borderRadius: '25px', border: '1px solid #333', marginBottom: '40px' }}>
        <h2 style={{ color: '#FDB813', fontSize: '18px', marginBottom: '20px' }}>GERENCIAR EVENTO</h2>
        <form action={salvarEvento} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input name="nome" placeholder="Nome do Evento" style={{ padding: '12px', background: '#000', color: '#fff', border: '1px solid #444', borderRadius: '10px' }} required />
          <input name="data" type="date" style={{ padding: '12px', background: '#000', color: '#fff', border: '1px solid #444', borderRadius: '10px' }} required />
          <input name="cidade" placeholder="Cidade" style={{ padding: '12px', background: '#000', color: '#fff', border: '1px solid #444', borderRadius: '10px' }} required />
          <input name="imagemUrl" placeholder="URL da Imagem (Arte)" style={{ padding: '12px', background: '#000', color: '#fff', border: '1px solid #444', borderRadius: '10px' }} required />
          <div style={{ display: 'flex', gap: '10px' }}>
             <label style={{ color: '#FDB813', fontSize: '11px' }}><input type="checkbox" name="destaque" /> CRONÔMETRO</label>
             <label style={{ color: '#FDB813', fontSize: '11px' }}><input type="checkbox" name="apoiado" /> SELO APOIO</label>
          </div>
          <button type="submit" style={{ background: '#FDB813', color: '#000', fontWeight: 'bold', padding: '15px', borderRadius: '10px', border: 'none' }}>SALVAR EVENTO</button>
        </form>
      </div>

      {/* 3. LISTA DE EVENTOS COM EDITAR/EXCLUIR */}
      <h2 style={{ color: '#FDB813', marginBottom: '15px' }}>LISTA DE EVENTOS NO SITE</h2>
      {eventos.map((ev) => (
        <div key={ev.id} style={{ background: '#111', padding: '15px', borderRadius: '15px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #333' }}>
          <div><strong>{ev.nome}</strong><br/><small style={{color: '#666'}}>{ev.cidade}</small></div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ background: '#FDB813', color: '#000', border: 'none', padding: '8px', borderRadius: '8px' }}><Edit size={16}/></button>
            <form action={async () => { "use server"; await deletarEvento(ev.id); }}>
              <button style={{ background: '#ff4444', color: '#fff', border: 'none', padding: '8px', borderRadius: '8px' }}><Trash2 size={16}/></button>
            </form>
          </div>
        </div>
      ))}
    </div>
  )
}
