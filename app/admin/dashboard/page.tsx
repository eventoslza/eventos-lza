import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

async function criarEvento(formData: FormData) {
  "use server"
  const nome = formData.get("nome") as string
  const data = formData.get("data") as string
  const cidade = formData.get("cidade") as string
  const imagemUrl = formData.get("imagemUrl") as string
  const link = formData.get("link") as string

  await prisma.evento.create({
    data: { nome, data: new Date(data), cidade, imagemUrl, link, ativo: true }
  })
  revalidatePath('/')
}

async function deletarEvento(id: string) {
  "use server"
  await prisma.evento.delete({ where: { id } })
  revalidatePath('/')
}

export default async function AdminPage() {
  const eventos = await prisma.evento.findMany({ orderBy: { data: 'desc' } })

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ borderBottom: '2px solid #FDB813', paddingBottom: '20px', marginBottom: '30px' }}>
        <h1 style={{ color: '#FDB813', textTransform: 'uppercase', fontStyle: 'italic' }}>PAINEL ADMINISTRATIVO LZA</h1>
      </div>

      {/* FORMULÁRIO */}
      <div style={{ background: '#111', padding: '25px', borderRadius: '20px', border: '1px solid #333', marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '18px' }}>POSTAR NOVO EVENTO</h2>
        <form action={criarEvento} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input name="nome" placeholder="Nome do Evento (Ex: Expoagro)" style={{ padding: '15px', borderRadius: '10px', background: '#000', border: '1px solid #444', color: '#fff' }} required />
          <input name="data" type="date" style={{ padding: '15px', borderRadius: '10px', background: '#000', border: '1px solid #444', color: '#fff' }} required />
          <input name="cidade" placeholder="Cidade" style={{ padding: '15px', borderRadius: '10px', background: '#000', border: '1px solid #444', color: '#fff' }} required />
          <input name="imagemUrl" placeholder="Link da Imagem (URL do Facebook ou Google)" style={{ padding: '15px', borderRadius: '10px', background: '#000', border: '1px solid #444', color: '#fff' }} required />
          <input name="link" placeholder="Link para Ingressos" style={{ padding: '15px', borderRadius: '10px', background: '#000', border: '1px solid #444', color: '#fff' }} />
          <button type="submit" style={{ background: '#FDB813', color: '#000', fontWeight: 'bold', padding: '18px', borderRadius: '10px', border: 'none', fontSize: '16px' }}>PUBLICAR AGORA</button>
        </form>
      </div>

      {/* LISTA PARA GERENCIAR */}
      <h2 style={{ marginBottom: '20px', color: '#FDB813' }}>EVENTOS ATIVOS</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {eventos.map((ev) => (
          <div key={ev.id} style={{ background: '#111', padding: '20px', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #222' }}>
            <div>
              <strong style={{ display: 'block' }}>{ev.nome}</strong>
              <small style={{ color: '#666' }}>{ev.cidade} - {new Date(ev.data).toLocaleDateString()}</small>
            </div>
            <form action={async () => { "use server"; await deletarEvento(ev.id); }}>
              <button style={{ background: '#ff4444', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '8px', fontWeight: 'bold' }}>EXCLUIR</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  )
}
