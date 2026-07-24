import { PrismaClient } from '@prisma/client'
import { Rocket, Instagram, MessageCircle, Calendar, MapPin, Ticket, ShieldCheck, Star, ArrowDown, Share2 } from 'lucide-react'

const prisma = new PrismaClient()

export default async function Home() {
  const eventos = await prisma.evento.findMany({ where: { ativo: true }, orderBy: { data: 'asc' } })
  const destaque = await prisma.evento.findFirst({ where: { destaque: true } })
  const apoiados = eventos.filter(ev => ev.apoiado)

  let dias = 0, horas = 0
  if (destaque) {
    const diff = new Date(destaque.data).getTime() - new Date().getTime()
    dias = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
    horas = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24))
  }

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* APRESENTAÇÃO IMPACTO */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '20px', background: 'radial-gradient(circle, #1a1a1a 0%, #000 100%)', borderBottom: '3px solid #FDB813' }}>
        <img src="/logo-lza.png" alt="LZA" style={{ height: '240px', marginBottom: '20px', filter: 'drop-shadow(0 0 20px #FDB813)' }} />
        <h1 style={{ fontSize: '42px', fontWeight: '900', color: '#FDB813', fontStyle: 'italic', textTransform: 'uppercase' }}>EVENTOS LZA</h1>
        <p style={{ letterSpacing: '4px', textTransform: 'uppercase', color: '#fff' }}>O Foguete da Região 🚀</p>
        
        {destaque && (
          <div style={{ marginTop: '30px', border: '2px solid #FDB813', padding: '25px', borderRadius: '30px', background: 'rgba(0,0,0,0.6)', width: '100%', maxWidth: '380px' }}>
            <p style={{ color: '#FDB813', fontSize: '12px', fontWeight: 'bold', marginBottom: '10px' }}>CONTAGEM REGRESSIVA: {destaque.nome.toUpperCase()}</p>
            <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '32px', fontWeight: '900' }}>
              <div>{dias} <small style={{ display: 'block', fontSize: '10px', color: '#666' }}>DIAS</small></div>
              <div style={{ color: '#FDB813' }}>:</div>
              <div>{horas} <small style={{ display: 'block', fontSize: '10px', color: '#666' }}>HRS</small></div>
            </div>
          </div>
        )}
        <div style={{ display: 'flex', gap: '15px', marginTop: '40px' }}>
          <a href="#eventos" style={{ background: '#FDB813', color: '#000', padding: '15px 35px', borderRadius: '50px', fontWeight: 'bold', textDecoration: 'none' }}>CALENDÁRIO</a>
          <a href="https://wa.me/5562994319156" style={{ border: '1px solid #fff', color: '#fff', padding: '15px 35px', borderRadius: '50px', fontWeight: 'bold', textDecoration: 'none' }}>ANUNCIE</a>
        </div>
      </section>

      {/* EVENTOS APOIADOS (ÁREA EXCLUSIVA) */}
      {apoiados.length > 0 && (
        <section style={{ padding: '60px 20px', background: '#0a0a0a' }}>
          <h2 style={{ color: '#FDB813', textAlign: 'center', marginBottom: '40px', fontSize: '24px', fontStyle: 'italic' }}>⭐ EVENTOS APOIADOS</h2>
          <div style={{ display: 'flex', overflowX: 'auto', gap: '20px', paddingBottom: '20px' }}>
            {apoiados.map(ev => (
              <div key={ev.id} style={{ minWidth: '300px', background: '#111', borderRadius: '25px', border: '1px solid #FDB813', padding: '15px' }}>
                <img src={ev.banner} style={{ width: '100%', height: '180px', borderRadius: '15px', objectFit: 'cover' }} />
                <h4 style={{ color: '#FDB813', marginTop: '10px' }}>{ev.nome}</h4>
                <div style={{ background: '#FDB813', color: '#000', fontSize: '9px', fontWeight: '900', padding: '4px 8px', borderRadius: '5px', marginTop: '10px', display: 'inline-block' }}>APOIADO PELA EVENTOS LZA</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* LISTA GERAL DE EVENTOS */}
      <section id="eventos" style={{ padding: '60px 20px' }}>
        <h2 style={{ borderLeft: '6px solid #FDB813', paddingLeft: '15px', marginBottom: '40px', fontSize: '24px' }}>PRÓXIMOS EVENTOS</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {eventos.map((ev) => (
            <div key={ev.id} style={{ background: '#111', borderRadius: '35px', overflow: 'hidden', border: '1px solid #333', position: 'relative' }}>
              <img src={ev.banner} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
              {ev.apoiado && (
                <div style={{ position: 'absolute', top: '20px', right: '20px', background: '#FDB813', color: '#000', padding: '6px 12px', borderRadius: '50px', fontSize: '10px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <ShieldCheck size={12} /> APOIADO
                </div>
              )}
              <div style={{ padding: '25px' }}>
                <h3 style={{ color: '#FDB813', fontSize: '26px', margin: '0 0 10px 0', fontWeight: '900' }}>{ev.nome}</h3>
                <p style={{ color: '#aaa', fontSize: '14px' }}>📍 {ev.cidade} | 📅 {new Date(ev.data).toLocaleDateString('pt-BR')}</p>
                <a href={ev.linkIngresso || '#'} target="_blank" style={{ display: 'block', textAlign: 'center', background: '#FDB813', color: '#000', padding: '15px', borderRadius: '15px', fontWeight: 'bold', textDecoration: 'none', marginTop: '20px' }}>INGRESSOS</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RODAPÉ */}
      <footer style={{ padding: '80px 20px', textAlign: 'center', borderTop: '1px solid #222' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '30px' }}>
          <a href="https://www.instagram.com/eventoslza.oficial/" target="_blank" style={{ color: '#FDB813' }}><Instagram size={40} /></a>
          <a href="https://wa.me/5562994319156" style={{ color: '#FDB813' }}><MessageCircle size={40} /></a>
        </div>
        <p style={{ fontSize: '10px', color: '#444' }}>© 2024 EVENTOS LZA</p>
      </footer>
    </div>
  )
}
