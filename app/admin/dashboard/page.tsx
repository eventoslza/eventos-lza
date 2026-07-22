import { criarEvento, deletarEvento } from '../actions'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function AdminPage() {
  const eventos = await prisma.evento.findMany({ orderBy: { data: 'asc' } })

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#FDB813', fontStyle: 'italic', textTransform: 'uppercase' }}>Painel Eventos LZA</h1>
      
      {/* FORMULÁRIO DE CADASTRO */}
      <section style={{ background: '#111', padding: '20px', borderRadius: '15px', marginBottom: '30px', border: '1px solid #333' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '15px' }}>Cadastrar Novo Evento</h2>
        <form action={criarEvento} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input name="nome" placeholder="Nome do Evento" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#000', color: '#fff' }} required />
          <input name="data" type="date" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#000', color: '#fff' }} required />
          <input name="cidade" placeholder="Cidade" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#000', color: '#fff' }} required />
          <input name="imagemUrl" placeholder="Link da Imagem (URL)" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#000', color: '#fff' }} required />
          <input name="link" placeholder="Link do Ingresso (Opcional)" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#000', color: '#fff' }} />
          <button type="submit" style={{ background: '#FDB813', color: '#000', fontWeight: 'bold', padding: '15px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>PUBLICAR EVENTO</button>
        </form>
      </section>

      {/* LISTA PARA REMOVER */}
      <h2 style={{ fontSize: '18px', marginBottom: '15px' }}>Gerenciar Eventos Ativos</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {eventos.map((ev) => (
          <div key={ev.id} style={{ background: '#111', padding: '15px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontWeight: 'bold', margin: 0 }}>{ev.nome}</p>
              <small style={{ color: '#888' }}>{ev.cidade}</small>
            </div>
            <form action={async () => { "use server"; await deletarEvento(ev.id); }}>
              <button style={{ background: '#E31E24', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '5px', fontWeight: 'bold' }}>EXCLUIR</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  )
}
