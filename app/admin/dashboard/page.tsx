import { criarEvento, deletarEvento } from '../actions'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function AdminPage() {
  const eventos = await prisma.evento.findMany({ orderBy: { data: 'desc' } })

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#FDB813', fontStyle: 'italic', textTransform: 'uppercase' }}>PAINEL EVENTOS LZA</h1>
      
      {/* CADASTRO */}
      <div style={{ background: '#111', padding: '20px', borderRadius: '15px', marginBottom: '30px', border: '1px solid #333' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '15px' }}>CADASTRAR EVENTO</h2>
        <form action={criarEvento} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input name="nome" placeholder="Nome" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#000', color: '#fff' }} required />
          <input name="data" type="date" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#000', color: '#fff' }} required />
          <input name="cidade" placeholder="Cidade" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#000', color: '#fff' }} required />
          <input name="imagemUrl" placeholder="Link da Imagem" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#000', color: '#fff' }} required />
          <input name="link" placeholder="Link do Ingresso" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#000', color: '#fff' }} />
          <button type="submit" style={{ background: '#FDB813', color: '#000', fontWeight: 'bold', padding: '15px', borderRadius: '8px', border: 'none' }}>PUBLICAR AGORA</button>
        </form>
      </div>

      {/* LISTA PARA REMOVER */}
      <h2 style={{ color: '#FDB813' }}>GERENCIAR EVENTOS</h2>
      {eventos.map((ev) => (
        <div key={ev.id} style={{ background: '#111', padding: '15px', borderRadius: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{ev.nome}</span>
          <form action={async () => { "use server"; await deletarEvento(ev.id); }}>
            <button style={{ background: '#ff4444', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '5px' }}>EXCLUIR</button>
          </form>
        </div>
      ))}
    </div>
  )
}
