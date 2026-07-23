import { PrismaClient } from '@prisma/client'
import { Rocket, Instagram, MessageCircle, Calendar, MapPin, Ticket, ShieldCheck, Users } from 'lucide-react'

const prisma = new PrismaClient()

export default async function Home() {
  const eventos = await prisma.evento.findMany({ orderBy: { data: 'asc' } })

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* APRESENTAÇÃO DE IMPACTO */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '20px', background: 'radial-gradient(circle, #1a1a1a 0%, #000 100%)' }}>
        <img src="/logo-lza.png" alt="EVENTOS LZA" style={{ height: '140px', marginBottom: '20px' }} />
        <h1 style={{ fontSize: '42px', fontWeight: '900', color: '#FDB813', fontStyle: 'italic', textTransform: 'uppercase', lineHeight: '1' }}>
          EVENTOS LZA
        </h1>
        <p style={{ color: '#fff', fontSize: '18px', letterSpacing: '4px', textTransform: 'uppercase', margin: '15px 0' }}>O Foguete da Região 🚀</p>
        <p style={{ color: '#888', maxWidth: '400px', marginBottom: '30px', fontSize: '14px' }}>A maior vitrine de divulgação e impulsionamento de eventos de Luziânia e região.</p>
        <div style={{ display: 'flex', gap: '15px' }}>
          <a href="#eventos" style={{ background: '#FDB813', color: '#000', padding: '15px 30px', borderRadius: '50px', fontWeight: 'bold', textDecoration: 'none' }}>VER EVENTOS</a>
          <a href="https://wa.me/5562994319156" style={{ background: 'transparent', border: '2px solid #fff', color: '#fff', padding: '15px 30px', borderRadius: '50px', fontWeight: 'bold', textDecoration: 'none' }}>ANUNCIE</a>
        </div>
      </section>

      {/* NÚMEROS */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', padding: '40px 20px', backgroundColor: '#111' }}>
        <div style={{ textAlign: 'center', padding: '20px', border: '1px solid #222', borderRadius: '20px' }}>
          <h3 style={{ color: '#FDB813', fontSize: '30px', margin: 0 }}>500+</h3>
          <p style={{ fontSize: '10px', color: '#666' }}>EVENTOS DIVULGADOS</p>
        </div>
        <div style={{ textAlign: 'center', padding: '20px', border: '1px solid #222', borderRadius: '20px' }}>
          <h3 style={{ color: '#FDB813', fontSize: '30px', margin: 0 }}>100%</h3>
          <p style={{ fontSize: '10px', color: '#666' }}>CREDIBILIDADE</p>
        </div>
      </section>

      {/* EVENTOS DINÂMICOS */}
      <section id="eventos" style={{ padding: '40px 20px' }}>
        <h2 style={{ borderLeft: '5px solid #FDB813', paddingLeft: '15px', fontStyle: 'italic', marginBottom: '30px', textTransform: 'uppercase' }}>Próximos Eventos</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {eventos.map((ev) => (
            <div key={ev.id} style={{ background: '#111', borderRadius: '30px', overflow: 'hidden', border: '1px solid #333' }}>
              <img src={ev.imagemUrl} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <h3 style={{ color: '#FDB813', fontSize: '24px', margin: '0 0 10px 0' }}>{ev.nome}</h3>
                <p style={{ fontSize: '14px', color: '#aaa' }}>📍 {ev.cidade} | 📅 {new Date(ev.data).toLocaleDateString('pt-BR')}</p>
                <a href={ev.link || '#'} target="_blank" style={{ display: 'block', textAlign: 'center', background: '#FDB813', color: '#000', padding: '15px', borderRadius: '12px', fontWeight: 'bold', textDecoration: 'none', marginTop: '20px' }}>GARANTIR INGRESSO</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RODAPÉ E INSTAGRAM */}
      <footer style={{ padding: '60px 20px', textAlign: 'center', background: '#000', borderTop: '1px solid #222' }}>
        <img src="/logo-lza.png" style={{ height: '50px', opacity: 0.6, marginBottom: '20px' }} />
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '30px' }}>
          <a href="https://www.instagram.com/eventos_lza_regiao.ofc" target="_blank" style={{ color: '#FDB813' }}><Instagram size={35} /></a>
          <a href="https://wa.me/5562994319156" target="_blank" style={{ color: '#FDB813' }}><MessageCircle size={35} /></a>
        </div>
        <p style={{ fontSize: '10px', color: '#444' }}>© 2024 EVENTOS LZA - TODOS OS DIREITOS RESERVADOS</p>
      </footer>
    </div>
  )
}
