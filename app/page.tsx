import { PrismaClient } from '@prisma/client'
import { Rocket, Instagram, MessageCircle, Calendar, MapPin, Ticket, ShieldCheck, Users, Star, ArrowDown, Share2 } from 'lucide-react'

const prisma = new PrismaClient()

export default async function Home() {
  const eventos = await prisma.evento.findMany({ 
    where: { ativo: true },
    orderBy: { data: 'asc' } 
  })

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', overflowX: 'hidden' }}>
      
      {/* 1. APRESENTAÇÃO DE IMPACTO */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '20px', background: 'radial-gradient(circle, #1a1a1a 0%, #000 100%)', borderBottom: '3px solid #FDB813' }}>
        <div style={{ marginBottom: '20px' }}>
          <img 
            src="/logo-lza.png" 
            alt="EVENTOS LZA" 
            style={{ height: '180px', width: 'auto', filter: 'drop-shadow(0 0 20px rgba(253,184,19,0.4))' }} 
          />
        </div>
        <h1 style={{ fontSize: '42px', fontWeight: '900', color: '#FDB813', fontStyle: 'italic', textTransform: 'uppercase', lineHeight: '1', margin: '10px 0' }}>EVENTOS LZA</h1>
        <h2 style={{ fontSize: '18px', color: '#fff', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '30px' }}>O Foguete da Região 🚀</h2>
        <div style={{ display: 'flex', gap: '15px' }}>
          <a href="#eventos" style={{ background: '#FDB813', color: '#000', padding: '15px 35px', borderRadius: '50px', fontWeight: 'bold', textDecoration: 'none' }}>VER CALENDÁRIO</a>
          <a href="https://wa.me/5562994319156" style={{ background: 'transparent', border: '2px solid #fff', color: '#fff', padding: '15px 35px', borderRadius: '50px', fontWeight: 'bold', textDecoration: 'none' }}>ANUNCIE AGORA</a>
        </div>
        <ArrowDown color="#FDB813" size={30} style={{ marginTop: '50px', animation: 'bounce 2s infinite' }} />
      </section>

      {/* 2. CONTADOR MASTER (EXPOAGRO) */}
      <section style={{ padding: '40px 20px', textAlign: 'center', background: '#000' }}>
        <div style={{ border: '2px solid #FDB813', padding: '30px', borderRadius: '30px', background: '#111', display: 'inline-block', width: '100%', maxWidth: '400px' }}>
          <p style={{ color: '#FDB813', fontWeight: 'bold', fontSize: '12px', marginBottom: '15px' }}>PRÓXIMO GRANDE EVENTO: EXPOAGRO</p>
          <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '30px', fontWeight: '900' }}>
            <div>15 <small style={{ display: 'block', fontSize: '10px', color: '#666' }}>DIAS</small></div>
            <div style={{ color: '#FDB813' }}>:</div>
            <div>08 <small style={{ display: 'block', fontSize: '10px', color: '#666' }}>HRS</small></div>
            <div style={{ color: '#FDB813' }}>:</div>
            <div>42 <small style={{ display: 'block', fontSize: '10px', color: '#666' }}>MIN</small></div>
          </div>
        </div>
      </section>

      {/* 3. NÚMEROS */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '40px 20px', backgroundColor: '#0a0a0a' }}>
        <div style={{ textAlign: 'center', padding: '30px', border: '1px solid #222', borderRadius: '25px', background: '#111' }}>
          <h3 style={{ color: '#FDB813', fontSize: '32px', margin: 0 }}>500+</h3>
          <p style={{ fontSize: '10px', color: '#666', textTransform: 'uppercase' }}>Eventos Divulgados</p>
        </div>
        <div style={{ textAlign: 'center', padding: '30px', border: '1px solid #222', borderRadius: '25px', background: '#111' }}>
          <h3 style={{ color: '#FDB813', fontSize: '32px', margin: 0 }}>100%</h3>
          <p style={{ fontSize: '10px', color: '#666', textTransform: 'uppercase' }}>Credibilidade</p>
        </div>
      </section>

      {/* 4. LISTA DE EVENTOS */}
      <section id="eventos" style={{ padding: '60px 20px' }}>
        <h2 style={{ borderLeft: '6px solid #FDB813', paddingLeft: '15px', fontStyle: 'italic', marginBottom: '40px' }}>PRÓXIMOS EVENTOS</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {eventos.map((ev) => (
            <div key={ev.id} style={{ background: '#111', borderRadius: '30px', overflow: 'hidden', border: '1px solid #333' }}>
              <img src={ev.imagemUrl} style={{ width: '100%', height: '300px', objectFit: 'cover' }} alt={ev.nome} />
              <div style={{ padding: '25px' }}>
                <h3 style={{ color: '#FDB813', fontSize: '26px', margin: '0' }}>{ev.nome}</h3>
                <p style={{ color: '#aaa', margin: '10px 0' }}>📍 {ev.cidade} | 📅 {new Date(ev.data).toLocaleDateString('pt-BR')}</p>
                <a href={ev.link || '#'} target="_blank" style={{ display: 'block', textAlign: 'center', background: '#FDB813', color: '#000', padding: '15px', borderRadius: '15px', fontWeight: 'bold', textDecoration: 'none' }}>GARANTIR INGRESSO</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. RODAPÉ E INSTAGRAM (@eventoslza.oficial) */}
      <footer style={{ padding: '80px 20px', textAlign: 'center', borderTop: '1px solid #222', background: '#000' }}>
        <img src="/logo-lza.png" style={{ height: '60px', opacity: 0.7, marginBottom: '30px' }} />
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '40px' }}>
          <a href="https://www.instagram.com/eventoslza.oficial/" target="_blank" style={{ color: '#FDB813', textDecoration: 'none', textAlign: 'center' }}>
            <Instagram size={40} /><br/><span style={{ fontSize: '10px' }}>Instagram</span>
          </a>
          <a href="https://wa.me/5562994319156" target="_blank" style={{ color: '#FDB813', textDecoration: 'none', textAlign: 'center' }}>
            <MessageCircle size={40} /><br/><span style={{ fontSize: '10px' }}>WhatsApp</span>
          </a>
        </div>
        <p style={{ fontSize: '11px', color: '#444' }}>© 2024 EVENTOS LZA - TODOS OS DIREITOS RESERVADOS</p>
      </footer>

      {/* WHATSAPP FLUTUANTE */}
      <a href="https://wa.me/5562994319156" style={{ position: 'fixed', bottom: '25px', right: '25px', background: '#25D366', width: '65px', height: '65px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 20px rgba(0,0,0,0.6)', zIndex: 1000 }}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" style={{ width: '35px' }} />
      </a>
    </div>
  )
}
