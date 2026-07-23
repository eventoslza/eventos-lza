import { PrismaClient } from '@prisma/client'
import { Rocket, Instagram, MessageCircle, Calendar, MapPin, Ticket, ShieldCheck, Users, Star, ArrowDown } from 'lucide-react'

const prisma = new PrismaClient()

export default async function Home() {
  // Busca os eventos reais do seu banco de dados
  const eventos = await prisma.evento.findMany({ 
    orderBy: { data: 'asc' } 
  })

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* 1. APRESENTAÇÃO DE IMPACTO (O FOGUETE) */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '20px', background: 'radial-gradient(circle, #1a1a1a 0%, #000 100%)' }}>
        <img src="/logo-lza.png" alt="EVENTOS LZA" style={{ height: '150px', marginBottom: '20px' }} />
        <h1 style={{ fontSize: '48px', fontWeight: '900', color: '#FDB813', fontStyle: 'italic', textTransform: 'uppercase', lineHeight: '1' }}>
          EVENTOS LZA
        </h1>
        <h2 style={{ fontSize: '20px', color: '#fff', letterSpacing: '4px', textTransform: 'uppercase', margin: '15px 0' }}>
          O Foguete da Região 🚀
        </h2>
        <p style={{ color: '#888', maxWidth: '500px', marginBottom: '40px' }}>
          A maior plataforma de divulgação e impulsionamento de eventos em Luziânia e todo o entorno.
        </p>
        <div style={{ display: 'flex', gap: '15px' }}>
          <a href="#eventos" style={{ background: '#FDB813', color: '#000', padding: '15px 35px', borderRadius: '50px', fontWeight: 'bold', textDecoration: 'none' }}>VER CALENDÁRIO</a>
          <a href="https://wa.me/5562994319156" style={{ background: 'transparent', border: '2px solid #fff', color: '#fff', padding: '15px 35px', borderRadius: '50px', fontWeight: 'bold', textDecoration: 'none' }}>ANUNCIE AQUI</a>
        </div>
        <ArrowDown style={{ marginTop: '50px', color: '#FDB813' }} />
      </section>

      {/* 2. NÚMEROS DE CONFIANÇA */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '60px 20px', backgroundColor: '#0a0a0a' }}>
        <div style={{ textAlign: 'center', padding: '30px', border: '1px solid #222', borderRadius: '25px', background: '#111' }}>
          <h3 style={{ color: '#FDB813', fontSize: '32px', margin: 0 }}>500+</h3>
          <p style={{ fontSize: '10px', color: '#666', textTransform: 'uppercase' }}>Eventos Divulgados</p>
        </div>
        <div style={{ textAlign: 'center', padding: '30px', border: '1px solid #222', borderRadius: '25px', background: '#111' }}>
          <h3 style={{ color: '#FDB813', fontSize: '32px', margin: 0 }}>100%</h3>
          <p style={{ fontSize: '10px', color: '#666', textTransform: 'uppercase' }}>Credibilidade</p>
        </div>
      </section>

      {/* 3. LISTA DINÂMICA DE EVENTOS (Vem do Admin) */}
      <section id="eventos" style={{ padding: '60px 20px' }}>
        <h2 style={{ borderLeft: '6px solid #FDB813', paddingLeft: '15px', fontStyle: 'italic', marginBottom: '40px', fontSize: '24px' }}>PRÓXIMOS EVENTOS</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {eventos.map((ev) => (
            <div key={ev.id} style={{ background: '#111', borderRadius: '30px', overflow: 'hidden', border: '1px solid #333' }}>
              <img src={ev.imagemUrl} style={{ width: '100%', height: '300px', objectFit: 'cover' }} alt={ev.nome} />
              <div style={{ padding: '25px' }}>
                <h3 style={{ color: '#FDB813', fontSize: '26px', margin: '0 0 15px 0' }}>{ev.nome}</h3>
                <div style={{ color: '#aaa', fontSize: '14px', marginBottom: '20px' }}>
                  <span>📍 {ev.cidade}</span><br/>
                  <span>📅 {new Date(ev.data).toLocaleDateString('pt-BR')}</span>
                </div>
                <a href={ev.link || '#'} target="_blank" style={{ display: 'block', textAlign: 'center', background: '#FDB813', color: '#000', padding: '15px', borderRadius: '15px', fontWeight: 'bold', textDecoration: 'none' }}>GARANTIR INGRESSO</a>
              </div>
            </div>
          ))}
          {eventos.length === 0 && (
            <p style={{ textAlign: 'center', color: '#444' }}>Nenhum evento cadastrado no momento. Acesse /admin para adicionar.</p>
          )}
        </div>
      </section>

      {/* 4. RODAPÉ COM INSTAGRAM OFICIAL */}
      <footer style={{ padding: '80px 20px', textAlign: 'center', borderTop: '1px solid #222', background: '#000' }}>
        <img src="/logo-lza.png" style={{ height: '60px', opacity: 0.7, marginBottom: '30px' }} />
        <p style={{ color: '#888', marginBottom: '30px' }}>Siga o portal oficial nas redes sociais:</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '40px' }}>
          <a href="https://www.instagram.com/eventos_lza_regiao.ofc" target="_blank" style={{ color: '#FDB813' }}><Instagram size={40} /></a>
          <a href="https://wa.me/5562994319156" target="_blank" style={{ color: '#FDB813' }}><MessageCircle size={40} /></a>
        </div>
        <p style={{ fontSize: '11px', color: '#444' }}>© 2024 EVENTOS LZA - TODOS OS DIREITOS RESERVADOS</p>
      </footer>

      {/* BOTÃO FLUTUANTE WHATSAPP */}
      <a href="https://wa.me/5562994319156" style={{ position: 'fixed', bottom: '25px', right: '25px', background: '#25D366', width: '65px', height: '65px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 20px rgba(0,0,0,0.6)', zIndex: 1000 }}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" style={{ width: '35px' }} />
      </a>
    </div>
  )
}
