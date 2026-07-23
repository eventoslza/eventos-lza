import { criarEvento, deletarEvento } from '../actions'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function AdminPage() {
  const eventos = await prisma.evento.findMany({ orderBy: { data: 'desc' } })

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ borderBottom: '2px solid #FDB813', paddingBottom: '10px', marginBottom: '30px' }}>
        <h1 style={{ color: '#FDB813', textTransform: 'uppercase', fontStyle: 'italic', margin: 0 }}>ADMINISTRAÇÃO LZA</h1>
      </header>

      {/* FORMULÁRIO DE CADASTRO */}
      <section style={{ background: '#111', padding: '20px', borderRadius: '15px', border: '1px solid #333', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '15px', color: '#FDB813' }}>CADASTRAR NOVO EVENTO</h2>
        <form action={criarEvento} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input name="nome" placeholder="Nome do Evento" style={{ padding: '12px', borderRadius: '8px', background: '#000', border: '1px solid #444', color: '#fff' }} required />
          <input name="data" type="date" style={{ padding: '12px', borderRadius: '8px', background: '#000', border: '1px solid #444', color: '#fff' }} required />
          <input name="cidade" placeholder="Cidade do Evento" style={{ padding: '12px', borderRadius: '8px', background: '#000', border: '1px solid #444', color: '#fff' }} required />
          <input name="imagemUrl" placeholder="Link da Imagem (URL)" style={{ padding: '12px', borderRadius: '8px', background: '#000', border: '1px solid #444', color: '#fff' }} required />
          <input name="link" placeholder="Link para Ingressos (Opcional)" style={{ padding: '12px', borderRadius: '8px', background: '#000', border: '1px solid #444', color: '#fff' }} />
          <button type="submit" style={{ background: '#FDB813', color: '#000', fontWeight: 'bold', padding: '15px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>PUBLICAR AGORA</button>
        </form> section>

      {/* LISTA DE EXCLUSÃO */}
      <h2 style={{ color: '#FDB813', fontSize: '18px', marginBottom: '15px' }}>EVENTOS NO AR</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {eventos.map((ev) => (
          <div key={ev.id} style={{ background: '#111', padding: '15px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #222' }}>
            <div>
              <strong style={{ display: 'block' }}>{ev.nome}</strong>
              <small style={{ color: '#888' }}>{ev.cidade} - {new Date(ev.data).toLocaleDateString('pt-BR')}</small>
            </div>
            <form action={async () => { "use server"; await deletarEvento(ev.id); }}>
              <button style={{ background: '#ff4444', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '6px', fontWeight: 'bold' }}>EXCLUIR</button>
            </form>
          </div>
        ))}
      </div>
      
      <footer style={{ marginTop: '40px', textAlign: 'center' }}>
        <a href="/" style={{ color: '#FDB813', textDecoration: 'none' }}>← Voltar para o Site</a>
      </footer>
    </div>
  )
}
