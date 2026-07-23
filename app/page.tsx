import { PrismaClient } from '@prisma/client'
import { Instagram, MessageCircle, ArrowDown, ShieldCheck } from 'lucide-react'

const prisma = new PrismaClient()

export default async function Home() {
  const eventos = await prisma.evento.findMany({ where: { ativo: true }, orderBy: { data: 'asc' } })
  const destaque = await prisma.evento.findFirst({ where: { destaque: true } })

  let dias = 0, horas = 0
  if (destaque) {
    const diff = new Date(destaque.data).getTime() - new Date().getTime()
    if (diff > 0) {
      dias = Math.floor(diff / (1000 * 60 * 60 * 24))
      horas = Math.floor((diff / (1000 * 60 * 60)) % 24)
    }
  }

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* 1. APRESENTAÇÃO DE IMPACTO */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '20px', background: 'radial-gradient(circle, #1a1a1a 0%, #000 100%)' }}>
        <img src="/logo-lza.png" alt="LZA" style={{ height: '220px', marginBottom: '20px', filter: 'drop-shadow(0 0 15px #FDB813)' }} />
        <h1 style={{ fontSize: '42px', fontWeight: '900', color: '#FDB813', fontStyle: 'italic', textTransform: 'uppercase', margin: 0 }}>EVENTOS LZA</h1>
        <p style={{ letterSpacing: '6px', textTransform: 'uppercase', color: '#fff', margin: '10px 0' }}>O Foguete da Região 🚀</p>

        {destaque && (
          <div style={{ marginTop: '30px', border: '2px solid #FDB813', padding: '20px', borderRadius: '25px', background: 'rgba(0,0,0,0.6)', width: '100%', maxWidth: '380px' }}>
            <p style={{ color: '#FDB813', fontSize: '12px', fontWeight: 'bold', marginBottom: '10px' }}>CONTAGEM REGRESSIVA: {destaque.nome.toUpperCase()}</p>
            <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '30px', fontWeight: '900' }}>
              <div>{dias} <small style={{ display: 'block', fontSize: '10px', color: '#666' }}>DIAS</small></div>
              <div style={{ color: '#FDB813' }}>:</div>
              <div>{horas} <small style={{ display: 'block', fontSize: '10px', color: '#666' }}>HRS</small></div>
            </div>
          </div>
        )}

        <div style={{ marginTop: '40px', display: 'flex', gap: '15px' }}>
          <a href="#eventos" style={{ background: '#FDB813', color: '#000', padding: '15px 40px', borderRadius: '50px', fontWeight: 'bold', textDecoration: 'none' }}>CALENDÁRIO</a>
          <a href="https://wa.me/5562994319156" style={{ border: '1px solid #fff', color: '#fff', padding: '15px 40px', borderRadius: '50px', fontWeight: 'bold', textDecoration: 'none' }}>ANUNCIE</a>
        </div>
      </section>

      {/* 2. LISTA DE EVENTOS COM SELO DE APOIO */}
      <section id="eventos" style={{ padding: '60px 20px' }}>
        <h2 style={{ borderLeft: '6px solid #FDB813', paddingLeft: '15px', marginBottom: '40px', fontSize: '24px', fontStyle: 'italic' }}>PRÓXIMOS EVENTOS</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
          {eventos.map((ev) => (
            <div key={ev.id} style={{ background: '#111', borderRadius: '35px', overflow: 'hidden', border: '1px solid #333', position: 'relative' }}>
              <img src={ev.imagemUrl} style={{ width: '100%', height: '350px', objectFit: 'cover' }} alt={ev.nome} />
              
              {ev.apoiado && (
                <div style={{ position: 'absolute', top: '20px', right: '20px', background: '#FDB813', color: '#000', padding: '5px 15px', borderRadius: '50px', fontSize: '10px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', boxShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>
                  <ShieldCheck size={12} /> APOIADO PELA EVENTOS LZA
                </div>
              )}

              <div style={{ padding: '25px' }}>
                <h3 style={{ color: '#FDB813', fontSize: '26px', margin: '0 0 10px 0' }}>{ev.nome}</h3>
                <p style={{ color: '#aaa', fontSize: '14px' }}>📍 {ev.cidade} | 📅 {new Date(ev.data).toLocaleDateString('pt-BR')}</p>
                <a href={ev.link || '#'} target="_blank" style={{ display: 'block', textAlign: 'center', background: '#FDB813', color: '#000', padding: '15px', borderRadius: '15px', fontWeight: 'bold', textDecoration: 'none', marginTop: '20px' }}>GARANTIR INGRESSO</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '60px 20px', textAlign: 'center', borderTop: '1px solid #222' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '30px' }}>
          <a href="https://www.instagram.com/eventoslza.oficial/" target="_blank" style={{ color: '#FDB813' }}><Instagram size={40} /></a>
          <a href="https://wa.me/5562994319156" target="_blank" style={{ color: '#FDB813' }}><MessageCircle size={40} /></a>
        </div>
        <p style={{ fontSize: '10px', color: '#444' }}>© 2024 EVENTOS LZA - TODOS OS DIREITOS RESERVADOS</p>
      </footer>
    </div>
  )
}
